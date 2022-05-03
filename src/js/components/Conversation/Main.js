import React from "react";
import { useSelector } from "react-redux";

import Conversation from "../Conversation/Chat";

const Chat = () => {
    const activeChat = useSelector(state => state.activeChat)

    if (activeChat) {

        return <div className="chat h-full ">
            <Conversation  />
        </div>
    }
    if (!activeChat) {
        return <div className="font-medium ml-10 mt-10 text-3xl text-gray-500 title"> Start Texting Now!</div>
    }

};

export default Chat;