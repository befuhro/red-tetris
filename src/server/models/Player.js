class Player {
    constructor(username, socket, room) {
        this.username = username;
        this.score = 0;
		this.pieces_placed = 0;
		this.ended = false;
		this.socket = socket;
        this.room = room;
        this.spectrum = [];
        for (let i = 0; i < 20; i++) {
            this.spectrum[i] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        }
    }

    updateSpectrum(spectrum) {
        console.log('Username: ', this.username);
        console.log('New spectrum: ');
        console.log(spectrum);
        this.spectrum = spectrum;
        this.socket.to(this.room).emit('new spectrum', {username: this.username, spectrum: spectrum});
    }
}

module.exports = Player;
