import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useDetectOutsideClick } from "../../util/useDetectOutsideClick";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { deleteChat, blockUnblock,  RemoveFriend } from "../../actions/index";

const ChatActions = (props) => {

    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
    const onClick = () => setIsActive(!isActive);
    const dispatch = useDispatch()
    const activeChat = useSelector(state => state.activeChat)

    const uid = useSelector(state => state.uid)
    const checkIfBlock = () => {
        if (activeChat.chat.chat_status.active) {

            return <a onClick={() => dispatch(blockUnblock({ receiver: props.chat._id, chatNumber: props.chat.chat.chatNumber, status: false }))}>Block</a>
        } else {
            if (activeChat.chat.chat_status.user === uid) {
                return <a onClick={() => dispatch(blockUnblock({ receiver: props.chat._id, chatNumber: props.chat.chat.chatNumber, status: true }))}>Unblock</a>
            }
        }
    }
    useEffect(() => {

        if (activeChat) {
            console.log(activeChat);
        }
    }, activeChat)
    return <div className="container">
        <div className="menu-container">
            <button onClick={onClick} className="menu-trigger">
                <FontAwesomeIcon icon="ellipsis-v" />
            </button>
            <nav ref={dropdownRef} className={`menu ${isActive ? "active" : "inactive"}`}>
                <ul>
                    <li>
                        <a onClick={props.openMenuElement}>View Porfile</a>
                    </li>
                    <li>
                        {checkIfBlock()}
                    </li>
                    <li>
                        <a className="c-r" onClick={() => dispatch(deleteChat(props.chat.chat.chatNumber))}>Delete Chat</a>
                    </li>
                    <li>
                        <a className="c-r" onClick={() => dispatch(RemoveFriend(activeChat._id))}>Remove {activeChat.name}</a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>

};

export default ChatActions;