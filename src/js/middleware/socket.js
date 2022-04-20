import io from "socket.io-client"

let socket
export function socektMiddleWare({ dispatch, getState }) {
    return function (next) {
        return function (action) {
            // do your stuff
            if (action.type === 'CONNECT_SOCKET') {
                let uid = getState().uid

                console.log('connecting');
                socket = io("/chat");
                socket.emit("join-chats", uid);

            }

            if (action.type === 'GET_CHAT') {
                let uid = getState().uid
                console.log(action.payload);
                socket.emit("register", { user: uid, friend: action.payload });
                socket.on("chat-ready", (data) => {

                    console.log(data);
                })
            }



            return next(action);
        };
    };

}