import React, { useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useDetectOutsideClick } from "../../util/useDetectOutsideClick";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { clear_chat, block_unblock,  remove_friend } from "../../actions/index";

const ChatActions = (props) => {

    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
    const toggleIsActive = () => setIsActive(!isActive);
    const dispatch = useDispatch()
    const activeChat = useSelector(state => state.activeChat)

    const uid = useSelector(state => state.uid)


    // block or unblock component based on chat state and the blocker
    const checkIfBlock = () => {
        if (activeChat.chat.chat_status.active) {

            return <a href onClick={() => dispatch(block_unblock({ receiver: props.chat._id, chatNumber: props.chat.chat.chatNumber, status: false }))}>Block</a>
        } else {
            if (activeChat.chat.chat_status.user === uid) {
                return <a href onClick={() => dispatch(block_unblock({ receiver: props.chat._id, chatNumber: props.chat.chat.chatNumber, status: true }))}>Unblock</a>
            }
        }
    }


    return <div className="container">
        <div className="menu-container">
            <button onClick={toggleIsActive} className="menu-trigger">
                <FontAwesomeIcon icon="ellipsis-v" />
            </button>
            <nav ref={dropdownRef} className={`menu ${isActive ? "active" : "inactive"}`}>
                <ul>
                    <li>
                        <a href onClick={props.openMenuElement}>View Porfile</a>
                    </li>
                    <li>
                        {checkIfBlock()}
                    </li>
                    <li>
                        <a href className="c-r" onClick={() => dispatch(clear_chat(activeChat.chatNumber, activeChat._id))}>Clear Chat</a>
                    </li>
                    <li>
                        <a href className="c-r" onClick={() => dispatch(remove_friend(activeChat._id, activeChat.chatNumber))}>Remove {activeChat.name}</a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>

};

export default ChatActions;