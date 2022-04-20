

const initialState = {
    url: 'http://localhost:4000',
    email: null,
    password: null,
    username: '',
    msg: null,
    jwt: localStorage.getItem('ut'),
    uid: null,
    isAuth: false,
    authMeta: {
        loading: false,
        error: null,
    },

    me: null,
    meMeta: {
        loading: false,
        error: null,
    },
    friends: [],
    friendsMeta: {
        loading: false,
        error: null
    },
    fetchedFriendsError: false,
    fetchedRequested: true,
    searchList: [],
    requests: [],
    panding_requests: [],
    loading: false,
    loading_update_info: false,
    update_info_msg: { msg: null, type: null },
    activeChat: null,
    conversation: [],
    sendingRequest: false,
    isOpenedFriends: false,
    page: 0,
    itemPerPage: 0,
    lodedMsgs: 0
    ,
};

function rootReducer(state = initialState, action) {
    // Concat the quetions after been loaded from the server
    if (action.type === "SET_AUTH_ERROR") {
        let authMeta = { error: action.payload, loading: false }
        return Object.assign({}, state, {
            authMeta: authMeta,
        });
    }
    if (action.type === "SET_AUTH_LOADING") {
        let authMeta = { error: null, loading: action.payload }
        return Object.assign({}, state, {
            authMeta: authMeta,
        });
    }
    if (action.type === "Loading_UPDATING_INFO") {
        return Object.assign({}, state, {
            loading_update_info: action.payload,
        });
    }
    if (action.type === "UPDATE_INFO_MESSAGE") {
        return Object.assign({}, state, {
            update_info_msg: action.payload
        });
    }

    if (action.type === 'CHECK_AUTH') {
        let username = localStorage.getItem('un')
        let jwt = localStorage.getItem('ut')
        let uid = localStorage.getItem('ui')
        if (jwt) {
            return Object.assign({}, state, {
                isAuth: true,
                username: username,
                jwt: jwt,
                uid: uid
            });
        }
    }

    if (action.type === "AUTH_ME") {
        localStorage.setItem('ut', action.payload.token)
        localStorage.setItem('un', action.payload.user.name)
        localStorage.setItem('ui', action.payload.user._id)

        return Object.assign({}, state, {
            isAuth: true,
            username: action.payload.user.name,
            jwt: action.payload.token,
            uid: action.payload.user._id
        });
    }

    if (action.type === "Logout") {
        localStorage.removeItem('ut')
        localStorage.removeItem('un')
        localStorage.removeItem('ui')
        return Object.assign({}, state, {
            isAuth: false,
            username: null,
            jwt: null,
            uid: null
        });
    }

    if (action.type === "SET_ME_LOADING") {
        let meMeta = { loading: action.payload, error: null }
        return Object.assign({}, state, { meMeta: meMeta });
    }
    if (action.type === "SET_ME_ERROR") {
        let meMeta = { loading: false, error: action.payload }
        return Object.assign({}, state, { meMeta: meMeta });
    }

    if (action.type === "ME_LOADED") {
        return Object.assign({}, state, { me: action.payload });
    }

    // Concat the quetions after been loaded from the server

    if (action.type === "SET_FRIENDS_LOADING") {
        let friendsMeta = { loading: action.payload, error: null }
        return Object.assign({}, state, { friendsMeta: friendsMeta });
    }
    if (action.type === "SET_FRIENDS_ERROR") {
        let friendsMeta = { loading: false, error: action.payload }
        return Object.assign({}, state, { friendsMeta: friendsMeta });
    }

    if (action.type === "FRIENDS_LOADED") {
        return Object.assign({}, state, {
            friends: action.payload,
        });
    }
    if (action.type === "REMOVE_FRIEND") {
        console.log(state.friends);

        return Object.assign({}, state, {
            friends: state.friends.filter(friend => friend._id !== action.payload),
            activeChat: null,
            conversation: [],
        });
    }

    if (action.type === "FRIENDS_FETCHED_ERROR") {
        return Object.assign({}, state, {
            fetchedFriendsError: action.payload,
        });
    }

    if (action.type === "TOGGLE_FRIENDS") {
        console.log(action.payload)
        return Object.assign({}, state, {
            isOpenedFriends: action.payload,
        });
    }

    if (action.type === "REQUESTS_LOADED") {
        return Object.assign({}, state, {
            requests: state.requests = action.payload,
            loading: false,
        });
    }
    if (action.type === "NEW_FRIEND_REQUEST") {
        return Object.assign({}, state, {
            requests: state.requests = [...action.payload],
            loading: false,
        });
    }

    if (action.type === "PANDING_REQUESTS_LOADED") {
        return Object.assign({}, state, {
            panding_requests: state.panding_requests = action.payload,
        });
    }

    if (action.type === "Searching_LOADED") {
        const users = action.payload.users.filter(u => u._id.toString() != state.uid)
        return Object.assign({}, state, {
            searchList: state.searchList.concat(users),
        });
    }

    if (action.type === "Empty_List_Search") {
        return Object.assign({}, state, {
            searchList: [],
        });
    }

    if (action.type === "Request_Sended") {
        return Object.assign({}, state, {
            // sendingRequest: action.payload,
            panding_requests: action.payload.panding_requests
        });
    }
    if (action.type === "PROCCESS_SEND_REQUEST") {
        return Object.assign({}, state, {
            sendingRequest: action.payload,
        });
    }
    if (action.type === "FRIEND_REQUEST_ACCEPT/DENY") {
        if (action.payload.action) {
            return Object.assign({}, state, {
                friends: state.friends.concat(action.payload.friend),
                requests: state.requests.filter(r => r._id.toString() !== action.payload.friend[0]._id.toString())
            });
        } else {
            return Object.assign({}, state, {
                requests: state.requests.filter(r => r._id.toString() !== action.payload.id.toString())
            });
        }
    }
    if (action.type === "FRIEND_REQUEST_STATUS") {
        if (action.payload.action) {
            console.log(action.payload);
            console.log(state.friends);

            let arr = [action.payload.friend, ...state.friends]
            console.log(arr);

            return Object.assign({}, state, {
                friends: arr,
                panding_requests: state.panding_requests.filter(r => r.toString() !== action.payload.friend._id.toString())
            });
        } else {
            return Object.assign({}, state, {
                panding_requests: state.panding_requests.filter(r => r.toString() !== action.payload.friend._id.toString())
            });
        }
    }


    if (action.type === "OPEN_CHAT") {
        let friend = state.friends.find(f => f._id.toString() === action.payload)
        return {
            ...state,
            activeChat: friend,
            conversation: friend.chat.conversation,
            // mark new msgs as seen 
            friends: state.friends.map((friend, i) => friend._id === action.payload ? { ...friend, new: 0 } : friend),
        }

    }
    if (action.type === "LOAD_MORE_MSGS") {

        return {
            ...state,
            page: state.page + 1,
            itemPerPage: 8
        }
    }


    if (action.type === 'USER_TYPING') {
        if (state.activeChat && state.activeChat.chatNumber.toString() === action.payload.toString()) {
            return {
                ...state,
                friends: state.friends.map((friend, i) => friend.chat._id === action.payload ? { ...friend, typing: true } : friend),
                activeChat: { ...state.activeChat, typing: true }
            }
        }
        return {
            ...state,
            friends: state.friends.map((friend, i) => friend.chat._id === action.payload ? { ...friend, typing: true } : friend)
        }
    }


    if (action.type === 'USER_STOPED_TYPING') {
        if (state.activeChat && state.activeChat.chatNumber.toString() === action.payload.toString()) {
            return {
                ...state,
                friends: state.friends.map((friend, i) => friend.chat._id === action.payload ? { ...friend, typing: false } : friend),
                activeChat: { ...state.activeChat, typing: false }
            }
        }
        return {
            ...state,
            friends: state.friends.map((friend, i) => friend.chat._id === action.payload ? { ...friend, typing: false } : friend)
        }
    }


    if (action.type === 'UPDATE_USER_ONLINE_STATUS') {

        if (state.chat && state.chat._id.toString() === action.payload.id.toString()) {
            return {
                ...state,
                friends: state.friends.map((friend, i) => friend._id === action.payload.id ? { ...friend, online: action.payload.online } : friend),
                activeChat: { ...state.chat, online: action.payload.online }
            }
        } else {
            return {
                ...state,
                friends: state.friends.map((friend, i) => friend._id === action.payload.id ? { ...friend, online: action.payload.online } : friend)
            }
        }

    }


    if (action.type === "ADD_MSG") {
        return {
            ...state,
            friends: state.friends.map(f => {
                if (f.chat.chatNumber === action.payload.chatNumber) {
                    f.chat.conversation.push(action.payload)
                    if (state.activeChat && action.payload.chatNumber.toString() !== state.activeChat.chat.chatNumber.toString() || !state.activeChat) {
                        f.new += 1
                    }
                }
                return f
            })

        }
    }
    if (action.type === 'ADD_MSG_TO_CURRENT_CONV') {
        if (state.activeChat && action.payload.chatNumber.toString() === state.activeChat.chat.chatNumber.toString()) {
            return {
                ...state,
                conversation: [...state.conversation, action.payload],
            }
        }
    }


    if (action.type === "FRIEND_BLOCK_UNBLOCK") {
        return {
            ...state,
            friends: state.friends.map(f => {
                if (f._id.toString() === action.payload.blocker.toString()) {
                    f.chat.chat_status.active = action.payload.active
                    f.chat.chat_status.user = action.payload.blocker

                }
                return f
            })
        }
    }
    if (action.type === "CURRENT_CONV_BLOCK_UNBLOCK") {
        
        if (state.activeChat && action.payload.chatNumber === state.activeChat.chatNumber) {
        return {
            ...state,
            activeChat: { ...state.activeChat, chat: { ...state.activeChat.chat, chat_status: { active: action.payload.active, user: action.payload.blocker } } }

        }
    }
}



    if (action.type === 'DELETE_CONV') {
        if (state.chat && action.payload.toString() === state.chat.chat.chatNumber.toString()) {
            return {
                ...state,
                conversation: [],
            }
        }
    }
    if (action.type === 'DELETE_FRIEND_CONV') {
        return {
            ...state,
            friends: state.friends.map(f => {
                if (f.chat.chatNumber === action.payload) {
                    f.chat.conversation = []
                }
                return f
            })

        }
    }



    return state;
};

export default rootReducer;
