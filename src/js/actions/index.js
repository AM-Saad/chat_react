import store from '../store';
import socket from '../util/socket'


let url = store.getState().url


export function post_login(email, password) {
    return async function (dispatch) {

        dispatch({ type: "SET_AUTH_ERROR", payload: null });
        dispatch({ type: "SET_AUTH_LOADING", payload: true });

        try {
            const response = await fetch(`${url}/auth/login`, {
                method: 'POST', body: JSON.stringify({ email: email, password: password }), headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            const json = await response.json()
            console.log(response);
            if (response.status === 200) {
                dispatch({ type: "SET_AUTH_LOADING", payload: false });
                return dispatch({ type: "AUTH_ME", payload: json });
            }
            return dispatch({ type: "SET_AUTH_ERROR", payload: 'Your information is incorrect.' });

        } catch (error) {
            dispatch({ type: "SET_AUTH_ERROR", payload: 'Something went wrong.' });

        }


    }
}
export function change_image(image) {
    return async function (dispatch) {
        dispatch({ type: "LOADING_CHANGING_IMAGE", payload: true });
        let jwt = store.getState().jwt

        let newForm = new FormData()
        newForm.append('image', image)
        try {
            const response = await fetch(`${url}/user/me/image`, {
                method: 'PUT',
                body: newForm,
                headers: {
                    Authorization: "Bearer " + jwt,
                }
            })
            dispatch({ type: "LOADING_CHANGING_IMAGE", payload: false });
           const json  = await response.json()
            dispatch({ type: "UPDATE_INFO_MESSAGE", payload: { msg: json.message, type: json.messageType } });
            if (response.status !== 200) {
                return dispatch({ type: "AUTH", payload: json });
            }
            return dispatch({ type: "UPDATE_PARTIAL_ME", payload: {image:json.image} });

        } catch (error) {
            dispatch({ type: "UPDATE_INFO_MESSAGE", payload: { msg: 'Something went wrong', type: 'danger' } });

            dispatch({ type: "LOADING_CHANGING_IMAGE", payload: false });


        }
    }
}

export function update_partial_me(partial_me, json_patch) {

    return async function (dispatch) {
        let jwt = store.getState().jwt
        dispatch({ type: "SET_ME_ERROR", payload: null });
        dispatch({ type: "SET_ME_LOADING", payload: true });
        try {
            const response = await fetch(`${url}/user/me`, {
                method: 'PATCH',
                body: JSON.stringify({ values: json_patch }),
                headers: {
                    Authorization: "Bearer " + jwt,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            const json = await response.json()
            dispatch({ type: "SET_ME_LOADING", payload: false });
            if (response.status === 200) {
                return dispatch({ type: "UPDATE_PARTIAL_ME", payload: partial_me });
            }
            return dispatch({ type: "SET_ME_ERROR", payload: json.message });
        } catch (error) {
            dispatch({ type: "SET_ME_LOADING", payload: false });
            dispatch({ type: "SET_ME_ERROR", payload: 'Something went wrong.' });

        }

    }
}

export function fetch_me() {
    return async function (dispatch) {
        let jwt = store.getState().jwt
        dispatch({ type: "SET_ME_ERROR", payload: null });
        dispatch({ type: "SET_ME_LOADING", payload: true });
        try {
            const response = await fetch(`${url}/user/me`, {
                method: 'Get',
                headers: {
                    Authorization: "Bearer " + jwt,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            const json = await response.json()

            dispatch({ type: "SET_ME_LOADING", payload: false });
            if (response.status === 200) {
                return dispatch({ type: "ME_LOADED", payload: json });
            }
            if (response.status === 401) {
                return dispatch({ type: "LOGOUT" })
            }
            dispatch({ type: "SET_ME_ERROR", payload: json.message });
        } catch (error) {
            dispatch({ type: "SET_ME_ERROR", payload: 'Something went wrong.' });

        }

    }
}


export function fetch_friends() {

    return async function (dispatch) {
        dispatch({ type: "SET_FRIENDS_LOADING", payload: true });
        dispatch({ type: "SET_FRIENDS_ERROR", payload: null });
        let jwt = store.getState().jwt
        try {
            const response = await fetch(`${url}/user/friends`, {
                headers: {
                    Authorization: "Bearer " + jwt,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }

            })

            const json = await response.json()
            dispatch({ type: "SET_FRIENDS_LOADING", payload: false });
            if (response.status !== 200) {
                return dispatch({ type: "SET_FRIENDS_ERROR", payload: json.message });
            }
            return dispatch({ type: "FRIENDS_LOADED", payload: json });
        } catch (error) {
            dispatch({ type: "SET_FRIENDS_LOADING", payload: false });
            dispatch({ type: "SET_FRIENDS_ERROR", payload: 'Something went wrong.' });

        }



    }
}

export function remove_friend(id, chatNumber) {

    return async function (dispatch) {
        dispatch({ type: "SET_FRIENDS_LOADING", payload: true });
        dispatch({ type: "SET_FRIENDS_ERROR", payload: null });
        let jwt = store.getState().jwt
        let me = store.getState().me
        try {
            const response = await fetch(`${url}/user/friends/${id}`, {
                method: 'delete',
                headers: {
                    Authorization: "Bearer " + jwt,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }

            })
            dispatch({ type: "SET_FRIENDS_LOADING", payload: false });

            const json = await response.json()

            if (response.status !== 200) {
                return dispatch({ type: "SET_FRIENDS_ERROR", payload: json.message });

            }
            dispatch({ type: "REMOVE_FRIEND", payload: id });
            socket.emit('friend_block_unblock', { active: false, chatNumber: chatNumber, receiver: id, blocker: me._id })

        } catch (error) {
            dispatch({ type: "SET_FRIENDS_ERROR", payload: 'Something went wrong.' });

        }



    }
}


export function fetch_panding_requests() {
    return async function (dispatch) {
        let jwt = store.getState().jwt
        dispatch({ type: "SET_PANDING_REQUESTS_LOADING", payload: true });
        dispatch({ type: "SET_PANDING_REQUEST_ERROR", payload: null });
        try {
            const response = await fetch(`${url}/user/pandingrequests`, {
                headers: {
                    Authorization: "Bearer " + jwt,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            dispatch({ type: "SET_PANDING_REQUESTS_LOADING", payload: false });

            const json = await response.json()
            if (response.status === 200) {
                return dispatch({ type: "PANDING_REQUESTS_LOADED", payload: json });
            }
            return dispatch({ type: "SET_PANDING_REQUEST_ERROR", payload: json.message });

        } catch (error) {
            dispatch({ type: "SET_NOTIFICATION", payload: { title: 'Error', message: 'Something went wrong while processing...' } });


        }

    }
}


export function fetch_requests() {
    return async function (dispatch) {
        let jwt = store.getState().jwt
        dispatch({ type: "SET_REQUESTS_LOADING", payload: true });
        dispatch({ type: "SET_REQUESTS_ERROR", payload: null });
        try {
            const response = await fetch(`${url}/user/requests`, {
                headers: {
                    Authorization: "Bearer " + jwt,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })

            const json = await response.json()
            dispatch({ type: "SET_REQUESTS_LOADING", payload: false });
            if (response.status === 200) {
                return dispatch({ type: "REQUESTS_LOADED", payload: json });
            }
            return dispatch({ type: "SET_REQUESTS_ERROR", payload: json.message });

        } catch (error) {
            dispatch({ type: "SET_REQUESTS_LOADING", payload: false });
            dispatch({ type: "SET_REQUESTS_ERROR", payload: 'Something went wrong.' });

        }

    }
}


export function send_request(id) {

    return async function (dispatch) {
        dispatch({ type: "PROCCESS_SEND_REQUEST", payload: true });
        let jwt = store.getState().jwt
        try {
            const response = await fetch(`${url}/user/requests/${id}`, {
                method: 'Post',
                headers: {
                    Authorization: "Bearer " + jwt,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            const json = await response.json()
            dispatch({ type: "PROCCESS_SEND_REQUEST", payload: false });
            if (response.status === 401) return dispatch({ type: "Logout" });
            if (response.status === 200) {
                console.log('here is redirect')
                return dispatch({ type: "Request_Sended", payload: json });
            }
        } catch (error) {
            dispatch({ type: "SET_NOTIFICATION", payload: { title: 'Error', message: 'Something went wrong while processing...' } });

        }

    }
}
export function accept_request(id) {
    return async function (dispatch) {
        let jwt = store.getState().jwt
        let me = store.getState().me
        try {
            const response = await fetch(`${url}/user/requests/${id}`, {
                method: 'PUT',
                headers: {
                    Authorization: "Bearer " + jwt,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            const json = await response.json()
            if (response.status === 401) {
                return dispatch({ type: "Logout" });
            }
            if (response.status === 200) {
                let friend = json.friendArray[0]
                socket.emit('friend_request_accept/deny', { user: { name: me.name, image: me.image, chat: friend.chat, chatNumber: friend.chatNumber, _id: me._id, typing: false, new: 0, online: true }, action: true, receiver: friend._id })
                dispatch({ type: "FRIEND_REQUEST_ACCEPT/DENY", payload: { friend: friend, action: true } });

            }
        } catch (error) {
            dispatch({ type: "SET_NOTIFICATION", payload: { title: 'Error', message: 'Something went wrong while processing...' } });

        }

    }
}
export function deny_request(id) {
    return async function (dispatch) {
        let jwt = store.getState().jwt
        let me = store.getState().me
        try {
            const response = await fetch(`${url}/user/requests/${id}`, {
                method: 'Delete',
                headers: {
                    Authorization: "Bearer " + jwt,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            if (response.status === 401) {
                return dispatch({ type: "Logout" });
            }
            if (response.status === 200) {
                dispatch({ type: "FRIEND_REQUEST_ACCEPT/DENY", payload: { id: id, action: false } });
                socket.emit('friend_request_accept/deny', { user: { _id: me._id, name: me.name }, action: false, receiver: id })

            }
           return dispatch({ type: "SET_NOTIFICATION", payload: { title: 'Error', message: 'Something went wrong while processing...' } });

        } catch (error) {
            dispatch({ type: "SET_NOTIFICATION", payload: { title: 'Error', message: 'Something went wrong while processing...' } });

        }

    }
}

export function clear_chat(id, receiver) {
    return async function (dispatch) {
        let jwt = store.getState().jwt
        try {
            const response = await fetch(`${url}/user/chat/${id}`, {
                method: 'Delete',
                headers: {
                    Authorization: "Bearer " + jwt,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            if (response.status === 401) {
                return dispatch({ type: "Logout" });
            }
            if (response.status === 200) {
                dispatch({ type: "DELETE_ACTIVE_CONV", payload: id });
                dispatch({ type: "DELETE_FRIEND_CONV", payload: id });
               return socket.emit('clear_chat', { chatNumber: id, receiver: receiver, })

            }
          return  dispatch({ type: "SET_NOTIFICATION", payload: { title: 'Error', message: 'Something went wrong while processing...' } });

        } catch (error) {
            dispatch({ type: "SET_NOTIFICATION", payload: { title: 'Error', message: 'Something went wrong while processing...' } });

        }
    }
}



export function block_unblock(data) {
    return async function (dispatch) {
        let jwt = store.getState().jwt
        let me = store.getState().me
        try {
            const response = await fetch(`${url}/user/chat/${data.chatNumber}/block-unblock?status=${data.status}`, {
                method: 'put',
                headers: {
                    Authorization: "Bearer " + jwt,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            if (response.status === 401) {
                return dispatch({ type: "Logout" });
            }
            if (response.status === 200) {

                dispatch({ type: "FRIEND_BLOCK_UNBLOCK", payload: { blocker: me._id, chatNumber: data.chatNumber, active: data.status } })
                dispatch({ type: "ACTIVE_CONV_BLOCK_UNBLOCK", payload: { blocker: me._id, chatNumber: data.chatNumber, active: data.status } })
                return socket.emit('friend_block_unblock', { active: data.status, chatNumber: data.chatNumber, receiver: data.receiver, blocker: me._id })

            }
          return  dispatch({ type: "SET_NOTIFICATION", payload: { title: 'Error', message: 'Something went wrong while processing...' } });


        } catch (error) {
            dispatch({ type: "SET_NOTIFICATION", payload: { title: 'Error', message: 'Something went wrong while processing...' } });


        }

    }
}




export function search_people(name) {
    return async function (dispatch) {
        dispatch({ type: "SEARCH_LOADED", payload: [] });
        dispatch({ type: "SET_SEARCH_LOADING", payload: true });
        dispatch({ type: "SET_SEARCH_ERROR", payload: null });
        try {
            const response = await fetch(`${url}/user/search?q=${name}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            const json = await response.json()
            dispatch({ type: "SET_SEARCH_LOADING", payload: false });
            if (response.status === 200) {
                return dispatch({ type: "SEARCH_LOADED", payload: json.users });
            }
            dispatch({ type: "SET_NOTIFICATION", payload: { title: 'Error', message: 'Something went wrong while searching...' } });

        } catch (error) {
            dispatch({ type: "SET_NOTIFICcATION", payload: { title: 'Error', message: 'Something went wrong while processing...' } });

        }

    }
}




export function search_in_friends(payload) {
    return { type: "SEARCH_FRIENDS", payload: payload }
}
export function open_chat(payload) {
    return { type: "OPEN_CHAT", payload };
}
export function loadMoreMsgs() {
    return { type: "LOAD_MORE_MSGS" };
}




export const new_msg = (data) => ({ type: "ADD_MSG", payload: data })

export const add_msg_to_active_conv = (data) => ({
    type: "ADD_MSG_TO_ACTIVE_CONV",
    payload: data
})
export const friend_typing = (data) => ({
    type: "FRIEND_TYPING",
    payload: data
})
export const friend_stopped_typing = (data) => ({
    type: "FRIEND_STOPED_TYPING",
    payload: data
})



export const typing = (socket, chatNumber, receiver) => {
    return (dispatch) => {
        socket.emit("typing", chatNumber, receiver);
    }
}
export const stoped_typing = (socket, chatNumber, receiver) => {
    return (dispatch) => {
        socket.emit("stoptyping", chatNumber, receiver);
    }
}
export const send_msg = (socket, msg) => {
    return (dispatch) => {
        socket.emit("message", msg);
        dispatch(new_msg(msg))
        dispatch(add_msg_to_active_conv(msg))

    }
}


export const update_friend_online_status = (data) => ({
    type: "UPDATE_FRIEND_ONLINE_STATUS",
    payload: data
})

export const NEW_FRIEND_REQUEST = (data) => ({
    type: "NEW_FRIEND_REQUEST",
    payload: data
})


export const Logout = () => ({
    type: "LOGOUT",
})





export const socket_send_friend_requiest = (socket, receiver, user) => {
    return (dispatch) => {
        socket.emit("new_friend_request", receiver, user);
    }
}


