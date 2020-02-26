const Game = require('../models/Game');

let games = {};

/*
 * Handles every real time access to game data
*/
function connectPlayer(socket, data) {
    games[data.room].addPlayer(data.username, socket);
    socket.join(data.room);

    // Handle Disconnection
    socket.on('disconnect', (reason) => {
        console.log(data.username + ' disconnected because ' + reason);
        games[data.room].deletePlayer(data.username);
        if (Object.keys(games[data.room].players).length === 0) {
            delete games[data.room];
        }
    });

    // Handle pieces fetching
    socket.on('fetch pieces', (from, callback) => {
        if (games[data.room].players[data.username].ended)
            if (callback) callback({pieces: [], message: "player has lost"});
        console.log('fetching pieces from ' + from);
        if (callback) callback({pieces: games[data.room].fetchPieces(from)});
    });

    // Handle party launching
    socket.on('start party', (callback) => {
        if (socket.id === Object.values(games[data.room].players)[0].socket.id) {
            console.log('game of room ' + data.room + ' has now started');
            games[data.room].gameIsStarted = true;
            if (callback) callback({authorizedToLaunchParty: true});
            socket.broadcast.to(data.room).emit('launch party');
        } else {
            console.log('could not launch game of room ' + data.room);
            if (callback) callback({authorizedToLaunchParty: false});
        }
    });

	/*
	 * Set a game mode, 'normal', 'sudden death'
	*/
	socket.on('mode set', (mode, callback) => {
        if (socket.id === Object.values(games[data.room].players)[0].socket.id) {
			if (Object.keys(games[data.room].players).length < 2) {
				callback({authorized: true, error: 'The room needs at least 2 players'});
				return;
			}
			games[data.room].mode = mode;
			callback({authorized: true});
		} else {
			callback({authorized: false, error: 'You are not the party leader'});
		}
	});

	/*
	 * Broadcast to all room
	*/
	socket.on('broadcast send', (data, callback) => {
		socket.to(data.room).emit('broadcast received', data);
		callback(data);
	});

	/*
	 * Gets if a player has lost, if no player left set the game as over
	*/
    socket.on('player ended', (callback) => {
        games[data.room].players[data.username].ended = true;
        isgameover = true;
        console.log(username + " has ended");
        socket.to(data.room).emit('player ended', data.username);
        Object.values(game[data.room].players).forEach((player) => {
            if (player.ended === false) {
                isgameover = false;
            }
        });
        console.log("game " + data.room + " is over");
        if (isgameover) {
            socket.to(data.room).emit("game over");
        }
        callback({ gameover: isgameover });
    });

    /*
     * Sets the time between each move aka the interval
     * Emits interval to all players in the room
    */
    socket.on('set interval', (value, callback) => {
        if (socket.id === Object.values(games[data.room].players)[0].socket.id) {
            console.log("Updating interval to ", value);
            games[data.room].setInterval(value);

            // did not work
            // callback({interval: games[data.room].interval});
            callback({interval: value});
            socket.to(data.room).emit('update interval', value);
        } else {
            console.log("Interval update unauthorized");
            callback({error: 'unauthorized', interval: games[data.room].interval});
        }
    });

    /*
    * Fires when a piece has been placed, add pieces when there is not enough
    */
    socket.on('piece placed', (spectrum, callback) => {
        let score = 0;
		games[data.room].players[data.username].updateSpectrum(spectrum);
		games[data.room].players[data.username].pieces_placed++;
        if (games[data.room].mode == 'normal') {
			score = games[data.room].players[data.username].score++;
		}
		else if (games[data.room].mode == 'sudden death') {
			let spectrum = games[data.room].players[data.username].spectrum;
			score = spectrum.length;
			spectrum.forEach((line) => {
				if (line.reduce((accumulator, value) => {accumulator + value}) != 0) {
					score--;
				}
			});
			if (games[data.room].players[data.username].pieces_placed == 30) {
				callback({score: score, ended: false, message: 'Wave ended, waiting for other players...'});
				return;
			}
			let new_wave = true;
			Object.values(game[data.room].players).forEach((player) => {
				if (player.pieces_placed != 30) {
					new_wave = false;
				}
			})
			if (new_wave) {
				let worst_user = {score: 99999999, user: null};
				Object.values(games[data.room].players).forEach((player) => {
					if (worst_user.ended === false && worst_user.score > player.score) {
                        worst_user = { score: player.score, user: data.username };
					}
				});
				if (worst_user.user === data.username) {
					games[data.room].players[data.username].ended = true;
					console.log("Player " + player.username + " is eliminated");
                    callback({ score: score, ended: true, message: 'Wave ended, you got left begin and are now disqualified...' });
				}
                Object.keys(games[data.room].players).forEach((player_id) => {
                    games[data.room].players[player_id].pieces_placed = 0;
                });
			}
		}
        console.log("piece placed", games[data.room].Pieces.length, 10 + games[data.room].players[data.username].pieces_placed);
        if (games[data.room].Pieces.length < (10 + games[data.room].players[data.username].pieces_placed)) {
            let piece = games[data.room].Pieces.length;
            games[data.room].addPieces(10);
        }
		callback({score: score, ended: false});
    });

    /*
     * Fires when the player can't play anymore (piece is out of board)
     * Might emit to other players as well
    */
    socket.on('player ended', (callback) => {
        game[data.room].players[data.username].ended = true;
        callback({end: true, score: game[data.room].players[data.username].score});
    });

    // Broadcast when a opponent joins the room.
    socket.broadcast.to(data.room).emit('opponent connection', {
        players: games[data.room].getPlayersInfo(),
        leaderName: games[data.room].leaderName
    });
}

function checkAvailability(username, room) {
    console.log(username + ' wants to join room ' + room);
    let authData = {};
    // If the room doesn't exist yet, the player create it and becomes the leader of this room.
    if (games[room] === undefined) {
        authData['canConnect'] = true;
    }
    // If nobody has the same name in the room, that the env hasn't started yet and there are less than 4 people is the room player can join the room
    else if (games[room].players[username] === undefined && games[room].gameIsStarted !== true && Object.keys(games[room].players).length < 4) {
        authData['canConnect'] = true;
    }
    // The player can not enter the room.
    else {
        authData['canConnect'] = false;
        authData['reasons'] = [];
        //The username is already used in the room.
        if (games[room].players[username]) {
            authData['reasons'].push({message: 'The username is already used.', id: 0});
        }
        // The board has already been started.
        if (games[room].gameIsStarted === true) {
            authData['reasons'].push({message: 'The board has already been started.', id: 1});
        }
        // There are already 4 people is the room.
        if (Object.keys(games[room].players).length >= 4) {
            authData['reasons'].push({message: 'The room is full.', id: 2});
        }
        // if (authData['reasons'].length === 0) {
        //     authData['reasons'].push({message: 'Reason unknown.', id: 3});
        // }
    }
    return (authData);
}

function handleRoomConnection(socket) {
    // User check for username and room availability.
    socket.on('check availability', (data, callback) => {
        const authData = checkAvailability(data.username, data.room);
        if (callback) callback(authData);
        if (authData['canConnect'] === false) {
            if (callback) callback(authData);
        }
        if (callback) callback(authData);
    });

    // User try to join room.
    socket.on('join room', (data, callback) => {
        const authData = checkAvailability(data.username, data.room);
        if (authData['canConnect'] === true) {
            let authData = {connected: true};
            if (games[data.room] === undefined) {
                games[data.room] = new Game(data.room, data.username);
                authData = {...authData, ...{players: {}, isRoomLeader: true}};
            } else {
                authData = {...authData, ...{players: games[data.room].getPlayersInfo(), isRoomLeader: false}};
            }
            connectPlayer(socket, data);
            if (callback) callback(authData);
        } else {
            if (callback) callback({isConnected: false, reasons: authData['reasons']});
        }
    });
}

module.exports = {handleRoomConnection: handleRoomConnection};
