import React, { useRef } from "react";
import socket from '../../util/socket'
import { useDispatch, useSelector } from 'react-redux';
import {StyledSendButton} from '../styles/SendButton.styled'
import { send_msg, typing, stoped_typing, block_unblock } from "../../actions/index";

const Input = (prop) => {
    const dispatch = useDispatch();
    const uid = useSelector(state => state.uid)
    const activeChat = useSelector(state => state.activeChat)
    const messageInput = useRef()


    function sendMessage() {
        const message = messageInput.current.value
        if (message.replace(/\s/g, '').length > 0) {
            let newd = new Date()
            let date = { date: newd.toLocaleDateString(), time: newd.getHours() + ':' + newd.getMinutes() }
            let msg = { chatNumber: prop.chat.chat.chatNumber, msg: message, type: 0, date: date, sender: uid, receiver: prop.chat._id }

            dispatch(send_msg(socket, msg))
            dispatch(stoped_typing(socket, prop.chat.chatNumber, prop.chat._id))

            messageInput.current.value = ''


        }
    }



    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendMessage()
        }
    }

    function usertyping() {
        const message = messageInput.current.value
        if (message.replace(/\s/g, '').trim('').length > 0) {
            dispatch(typing(socket, prop.chat.chatNumber, prop.chat._id))
        } else {
            dispatch(stoped_typing(socket, prop.chat.chatNumber, prop.chat._id))
        }
    }
    if (activeChat.chat.chat_status.active) {

        return <div>
            <div className="flex" id="send-group-msg-from" onKeyDown={handleKeyDown}>
                <input ref={messageInput} type="text" className="border-0 w-10/12" id="group-msg" onChange={usertyping} placeholder="Type here..." autoComplete="none" />

                <StyledSendButton    onClick={sendMessage} class="send"><span class="text">Send</span><span class="icon">
                    <svg viewBox="0 0 512.005 512.005">
                        <path d="M511.658 51.675c2.496-11.619-8.895-21.416-20.007-17.176l-482 184a15 15 0 00-.054 28.006L145 298.8v164.713a15 15 0 0028.396 6.75l56.001-111.128 136.664 101.423c8.313 6.17 20.262 2.246 23.287-7.669C516.947 34.532 511.431 52.726 511.658 51.675zm-118.981 52.718L157.874 271.612 56.846 232.594zM175 296.245l204.668-145.757c-176.114 185.79-166.916 176.011-167.684 177.045-1.141 1.535 1.985-4.448-36.984 72.882zm191.858 127.546l-120.296-89.276 217.511-229.462z"></path>
                    </svg></span></StyledSendButton >
            </div>
        </div>
    } else {
        if (activeChat.chat.chat_status.user === uid) {
            return <div>
                <div className="flex bg-darkgray p-4 text-center" id="send-group-msg-from">
                    You Blocked {activeChat.chat.name} Click Here To <span className="ml-1 cursor-pointer" onClick={() => dispatch(block_unblock({ receiver: activeChat._id, chatNumber: activeChat.chatNumber, status: true }))}> Unblock </span>
                </div>
            </div>
        } else {
            return <div>
                <div className="flex bg-darkgray p-4 text-center" id="send-group-msg-from">
                    You cant text each other ...
                </div>
            </div>
        }
    }



};

export default Input;