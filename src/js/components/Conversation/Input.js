import React, { useEffect } from "react";
import socket from '../../util/socket'
import { useDispatch, useSelector } from 'react-redux';

import { sendMsg, typing, stopedtyping } from "../../actions/index";

const Input = (prop) => {
    const dispatch = useDispatch();
    const uid = useSelector(state => state.uid)
    const activeChat = useSelector(state => state.activeChat)

    function send() {
        const message = document.getElementById('group-msg').value
        if (message.replace(/\s/g, '').length) {
            let newd = new Date()
            let date = { date: newd.toLocaleDateString(), time: newd.getHours() + ':' + newd.getMinutes() }
            let msg = { chatNumber: prop.chat.chat.chatNumber, msg: message, type: 0, date: date, sender: uid, receiver: prop.chat._id }

            dispatch(sendMsg(socket, msg))
            document.getElementById('group-msg').value = ''

            dispatch(stopedtyping(socket, prop.chat.chatNumber, prop.chat._id))

        }
    }


    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            send()
        }
    }

    function usertyping() {
        const message = document.getElementById('group-msg').value
        if (message.replace(/\s/g, '').length) {
            dispatch(typing(socket, prop.chat.chatNumber, prop.chat._id))
        } else {
            dispatch(stopedtyping(socket, prop.chat.chatNumber, prop.chat._id))
        }
    }
    if (activeChat.chat.chat_status.active) {

        return <div>
            <div className="flex" id="send-group-msg-from" onKeyDown={handleKeyDown}>
                <input type="text" className="form-control" id="group-msg" onChange={usertyping} placeholder="Type here..." autocomplete="none" />
                <button type="submit" onClick={send}>Send</button>
            </div>
        </div>
    } else {
        if (activeChat.chat.chat_status.user == uid) {
        return  <div>
            <div className="flex bg-darkgray p-large text-center" id="send-group-msg-from">
               You Blocked {activeChat.chat.name} Click Here To <span> Unblock </span>
            </div>
        </div>
    }else{
        return  <div>
            <div className="flex bg-darkgray p-large text-center" id="send-group-msg-from">
               You cant text each other ...
            </div>
        </div>
    }
    }



};

export default Input;