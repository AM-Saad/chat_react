import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Conversation from "../Conversation/Chat";

const Chat = () => {
    const activeChat = useSelector(state => state.activeChat)


    if (activeChat) {

        return <div className="chat">
            <Conversation  />
        </div>
    }
    if (!activeChat) {
        return <div className="title"> Start Texting Now!</div>
    }

};

export default Chat;