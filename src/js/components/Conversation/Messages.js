
import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {StyledMessage} from '../styles/Message.styled'

const Messages = () => {
    const dispatch = useDispatch()

    const displayedMsgs = useSelector(state => state.displayedMsgs)
    const conversation = useSelector(state => state.conversation)
    const uid = useSelector(state => state.uid)

    const messagesEndRef = useRef()
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };


    useEffect(() => {
        scrollToBottom()
    }, [conversation]);


    return (
        <ul id="messages" className="box-messages">
            {conversation.map((object, i) => <StyledMessage type={(object.sender === uid ? 'type-0' : 'type-1')}> {object.msg} <small>{object.date.time}</small> </StyledMessage>)}
            <StyledMessage className="end"  ref={messagesEndRef} />
        </ul>

    );


};

export default Messages;