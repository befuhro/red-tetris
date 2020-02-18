import io from 'socket.io-client';

export const checkAvailability = (username, room) => {
    return ((dispatch) => {
        const socket = io(window.location.hostname + ':8080/room');
        socket.on('connect', () => {
            console.log(username + ' wants to join room ' + room);
            socket.emit('check availability', {username: username, room: room}, (data) => {
                if (data['canConnect'] === true) {
                    let url = window.location.href.split(':',2).join(':');
                    window.location.href = url + ":8080/#" + room + "[" + username + "]";
                }
                else {
                    dispatch(checkAvailabilityFailure(data['reasons']));
                }
            });
        });
    });
};

export const CHECK_AVAILABILITY_FAILURE = 'CHECK_AVAILABILITY_FAILURE';
export const checkAvailabilityFailure = (errors) => ({type: CHECK_AVAILABILITY_FAILURE, errors: errors});

export const DELETE_ERRORS = 'DELETE_ERRORS';
export const deleteErrors = () => ({ type: DELETE_ERRORS });
