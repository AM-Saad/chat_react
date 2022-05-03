import React from "react";
import { useDispatch, useSelector, } from 'react-redux';
import { send_request, accept_request, deny_request, socket_send_friend_requiest } from "js/actions/index"

import socket from 'js/util/socket'
import addFriendIcon from 'public/image/add-friend.png'
import friendIcon from 'public/image/friend.png'

function ListItem(prop) {
    const allfriends = useSelector(state => state.friends)
    const panding_requests = useSelector(state => state.panding_requests)
    const requests = useSelector(state => state.requests)
    const me = useSelector(state => state.me)
    const sendingRequest = useSelector(state => state.sendingRequest)

    const dispatch = useDispatch();


    function request() {
        dispatch(send_request(prop.user._id))
        dispatch(socket_send_friend_requiest(socket, prop.user._id, me))

    }


    function accept() {
        dispatch(accept_request(prop.request._id))
    }
    function deny() {
        dispatch(deny_request(prop.request._id))

    }

 

    const userFriendRqquestStatus = () => {
        let existInFriends = allfriends.find(f => f._id.toString() === prop.user._id.toString())
        if (existInFriends) {
            return <div className="flex cursor-pointer"><img className="h-7" src={friendIcon} alt="friend" /> Friend</div>
        }
        let existInPanding = panding_requests.find(i => i.toString() === prop.user._id.toString())
        let existInRequests = requests.find(i => i._id.toString() === prop.user._id.toString())
        if (existInPanding) {
            return <div>Request Sended</div>
        } else if (existInRequests) {
            return <div className=" flex f-space-between">
                <button onClick={accept} className="btn btn-small btn-success">Accept</button>
                <button onClick={deny} className="btn btn-small btn-alert">Deny</button>
            </div>
        } else {
            // return <button onClick={request} className="btn btn-small btn-success">Friend Request <img className="h-75 ml-2" alt="add-friend" src={addFriendIcon}/></button>
            return <div onClick={request} className="flex cursor-pointer"><img  className="h-7 ml-2" alt="add-friend" src={addFriendIcon} /> Add Friend</div>

        }

    }



    return (
        <li className={`b-r-medium bg-lightgray p-large m-large flex f-space-between ${sendingRequest ? "loader" : ""}`}>
            <p>{prop.user.name}</p>
            {userFriendRqquestStatus()}
        </li>
    );
};

export default ListItem;