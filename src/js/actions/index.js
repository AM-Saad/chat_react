import store from '../store';
import socket from '../util/socket'


let url = store.getState().url

// Fetch qustions API and despatch Question_loaded action

export function checkAuth() {
    return { type: "CHECK_AUTH" };
}
export function SetAuthLoading(payload) {
    return { type: "SET_AUTH_LOADING", payload: payload };
}



export function postLogin(email, password) {
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
export function updateInfo(email, name, image) {
    return function (dispatch) {
        dispatch({ type: "Loading_UPDATING_INFO", payload: true });
        let res
        let jwt = store.getState().jwt

        let newForm = new FormData()
        newForm.append('email', email)
        newForm.append('name', name)
        newForm.append('image', image)
        console.log(image);
        return fetch(`${url}/user/me`, {
            method: 'PUT',
            body: newForm,
            headers: {
                Authorization: "Bearer " + jwt,
            }
        })
            .then(response => {
                res = response
                dispatch({ type: "Loading_UPDATING_INFO", payload: false });
                return response.json()
            }).then(json => {
                console.log(res);
                dispatch({ type: "UPDATE_INFO_MESSAGE", payload: { msg: json.message, type: json.messageType } });
                if (res.status !== 200) {
                    return dispatch({ type: "AUTH", payload: json });
                } else {
                    dispatch({ type: "ME_LOADED", payload: json.user });
                }
            }).catch(err => {
                dispatch({ type: "UPDATE_INFO_MESSAGE", payload: { msg: 'Something went wrong', type: 'danger' } });

                dispatch({ type: "Loading_UPDATING_INFO", payload: false });

            })
    }
}

export function FetchMe() {
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
            dispatch({ type: "SET_ME_ERROR", payload: json.message });
        } catch (error) {
            dispatch({ type: "SET_ME_ERROR", payload: 'Something went wrong.' });

        }

    }
}


export function FetchFriends() {

    return async function (dispatch) {
        dispatch({ type: "FRIENDS_FETCHED_LOADING", payload: true });
        dispatch({ type: "FRIENDS_FETCHED_ERROR", payload: null });
        let jwt = store.getState().jwt
        try {
            const response = await fetch(`${url}/user/friends`, {
                headers: {
                    Authorization: "Bearer " + jwt,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }

            })
            dispatch({ type: "FRIENDS_FETCHED_LOADING", payload: false });

            const json = await response.json()

            if (response.status !== 200) {
                dispatch({ type: "FRIENDS_FETCHED_LOADING", payload: json.message });

            } else {
                dispatch({ type: "FRIENDS_LOADED", payload: json });
            }
        } catch (error) {
            dispatch({ type: "FRIENDS_FETCHED_ERROR", payload: 'Something went wrong.' });

        }



    }
}

export function RemoveFriend(id) {

    return async function (dispatch) {
        dispatch({ type: "FRIENDS_FETCHED_LOADING", payload: true });
        dispatch({ type: "FRIENDS_FETCHED_ERROR", payload: null });
        let jwt = store.getState().jwt
        try {
            const response = await fetch(`${url}/user/friends/${id}`, {
                method: 'delete',
                headers: {
                    Authorization: "Bearer " + jwt,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }

            })
            dispatch({ type: "FRIENDS_FETCHED_LOADING", payload: false });

            const json = await response.json()

            if (response.status !== 200) {
                return dispatch({ type: "FRIENDS_FETCHED_ERROR", payload: 'Something went wrong.' });

            }
            dispatch({ type: "REMOVE_FRIEND", payload: id });
        } catch (error) {
            dispatch({ type: "FRIENDS_FETCHED_ERROR", payload: 'Something went wrong.' });

        }



    }
}


export function pandingrequests() {
    return function (dispatch) {
        let res
        let jwt = store.getState().jwt
        return fetch(`${url}/user/pandingrequests`, {
            headers: {
                Authorization: "Bearer " + jwt,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            res = response
            return response.json()
        }).then(json => {
            if (res.status == 401) {
                return dispatch({ type: "Logout" });
            }
            dispatch({ type: "PANDING_REQUESTS_LOADED", payload: json });

        });
    }
}


export function requests() {
    return function (dispatch) {
        let res
        let jwt = store.getState().jwt
        return fetch(`${url}/user/requests`, {
            headers: {
                Authorization: "Bearer " + jwt,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            res = response
            return response.json()
        }).then(json => {
            if (res.status == 401) {
                return dispatch({ type: "Logout" });

            }
            dispatch({ type: "REQUESTS_LOADED", payload: json });

        });
    }
}


export function sendRequest(id) {

    return function (dispatch) {
        dispatch({ type: "PROCCESS_SEND_REQUEST", payload: true });
        let res
        let jwt = store.getState().jwt
        return fetch(`${url}/user/requests/${id}`, {
            method: 'Post',
            headers: {
                Authorization: "Bearer " + jwt,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            res = response
            return response.json()
        }).then(json => {
            dispatch({ type: "PROCCESS_SEND_REQUEST", payload: false });

            if (res.status == 401) return dispatch({ type: "Logout" });
            if (res.status === 200) {
                return dispatch({ type: "Request_Sended", payload: json });
            }

        });
    }
}
export function acceptRequest(id) {
    return function (dispatch) {
        let res
        let jwt = store.getState().jwt
        let me = store.getState().me
        return fetch(`${url}/user/requests/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: "Bearer " + jwt,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            res = response
            return response.json()
        }).then(json => {
            if (res.status == 401) {
                return dispatch({ type: "Logout" });
            }
            if (res.status === 200) {
                let friend = json.friendArray[0]
                console.log(friend);
                dispatch({ type: "FRIEND_REQUEST_ACCEPT/DENY", payload: { friend: json.friendArray, action: true } });
                socket.emit('friend_request_accept/deny', { user: { name: me.name, image: me.image, chat: friend.chat, chatNumber: friend.chat.chatNumber, _id: me._id, typing: false, new: 0, online: true }, action: true, receiver: friend._id })

            }

        });
    }
}
export function denyRequest(id) {
    return function (dispatch) {
        let res
        let jwt = store.getState().jwt
        let me = store.getState().me
        return fetch(`${url}/user/requests/${id}`, {
            method: 'Delete',
            headers: {
                Authorization: "Bearer " + jwt,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            res = response
            return response.json()
        }).then(json => {
            if (res.status == 401) {
                return dispatch({ type: "Logout" });
            }
            if (res.status === 200) {
                dispatch({ type: "FRIEND_REQUEST_ACCEPT/DENY", payload: { id: id, action: false } });
                socket.emit('friend_request_accept/deny', { user: { _id: me._id, name: me.name }, action: false, receiver: id })

            }

        });
    }
}

export function deleteChat(id) {
    return function (dispatch) {
        let res
        let jwt = store.getState().jwt
        return fetch(`${url}/user/chat/${id}`, {
            method: 'Delete',
            headers: {
                Authorization: "Bearer " + jwt,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            res = response
            return response.json()
        }).then(json => {
            if (res.status == 401) {
                return dispatch({ type: "Logout" });
            }
            if (res.status === 200) {
                dispatch({ type: "DELETE_CONV", payload: id });
                dispatch({ type: "DELETE_FRIEND_CONV", payload: id });
                // socket.emit('friend_request_accept/deny', { user: { _id: me._id, name: me.name }, action: false, receiver: id })

            }

        });
    }
}



export function blockUnblock(data) {
    return function (dispatch) {
        let res
        let jwt = store.getState().jwt
        let me = store.getState().me

        return fetch(`${url}/user/chat/${data.chatNumber}/block-unblock?status=${data.status}`, {
            method: 'put',
            headers: {
                Authorization: "Bearer " + jwt,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            res = response
            return response.json()
        }).then(json => {
            if (res.status === 401) {
                return dispatch({ type: "Logout" });
            }
            if (res.status === 200) {


                dispatch({ type: "FRIEND_BLOCK_UNBLOCK", payload: { blocker: me._id, chatNumber: data.chatNumber, active: data.status } })
                dispatch({ type: "CURRENT_CONV_BLOCK_UNBLOCK", payload: { blocker: me._id, chatNumber: data.chatNumber, active: data.status } })
                socket.emit('friend_block_unblock', { active:  data.status, chatNumber: data.chatNumber, receiver: data.receiver, blocker: me._id })

            }

        });
    }
}




export function findPeople(name) {
    return function (dispatch) {
        dispatch({ type: "Empty_List_Search" });

        return fetch(`${url}/user/search?q=${name}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(json => {
                dispatch({ type: "Searching_LOADED", payload: json });
            });
    }
}

export function toggleFriends(payload) {
    return { type: "TOGGLE_FRIENDS", payload: payload }
}


export function openChat(payload) {
    return { type: "OPEN_CHAT", payload };
}
export function loadMoreMsgs() {
    return { type: "LOAD_MORE_MSGS" };
}




export const NewMsg = (data) => ({
    type: "ADD_MSG",
    payload: data
})
export const AddMsgToCurrentConv = (data) => ({
    type: "ADD_MSG_TO_CURRENT_CONV",
    payload: data
})
export const UserTyping = (data) => ({
    type: "USER_TYPING",
    payload: data
})
export const UserStoppedTyping = (data) => ({
    type: "USER_STOPED_TYPING",
    payload: data
})



export const UpdateUserOnlineStatus = (data) => ({
    type: "UPDATE_USER_ONLINE_STATUS",
    payload: data
})

export const NEW_FRIEND_REQUEST = (data) => ({
    type: "NEW_FRIEND_REQUEST",
    payload: data
})

export const getChat = (chatNumber, socket) => {
    return (dispatch) => {
        socket.emit("disconnecting", {});
        socket.emit("register", { chatNumber: chatNumber });
    }
}



export const sendMsg = (socket, msg) => {
    return (dispatch) => {
        socket.emit("message", msg);
        dispatch(NewMsg(msg))
        dispatch(AddMsgToCurrentConv(msg))

    }
}
export const typing = (socket, chatNumber, receiver) => {
    return (dispatch) => {
        socket.emit("typing", chatNumber, receiver);
    }
}
export const stopedtyping = (socket, chatNumber, receiver) => {
    return (dispatch) => {
        socket.emit("stoptyping", chatNumber, receiver);
    }
}


export const socket_friend_requiest = (socket, receiver, user) => {
    return (dispatch) => {
        socket.emit("new_friend_request", receiver, user);
    }
}


