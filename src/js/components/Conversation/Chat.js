import React, { useState } from "react";
import { useSelector } from "react-redux";

import Input from "js/components/Conversation/Input";
import Messages from "js/components/Conversation/Messages";
import ChatActions from "js/components/Conversation/ChatActionsDropDown";
import OnlineIcon from "js/components/General/OnlineIcon";
import UserImage from "js/components/General/UserImage";


const Conversation = () => {
    let numberOfMsgs = -8
    const activeChat = useSelector(state => state.activeChat)
    const [isFullScreen, setIsFullScreen] = useState(false);
    const url = useSelector(state => state.url)
    let msgs = activeChat.chat.conversation.slice(1).slice(numberOfMsgs)
    const imageSrc = activeChat.image ? `${url}/${activeChat.image}` : 'https://www.bsn.eu/wp-content/uploads/2016/12/user-icon-image-placeholder.jpg'

    const openFullScreenImage = (state) => {
        setIsFullScreen(state)
    }

    return (
        <div className="h-full ">
            <div className="flex f-space-between bg-white f-space-between flex h-20 p-4 sticky top-0 z-10">
                <div className="flex">

                    <div className="p-relative">
                        <UserImage src={imageSrc} openFullScreen={openFullScreenImage} isFullScreen={isFullScreen} />
                        <OnlineIcon online={activeChat.online} />
                    </div>
                    <div>
                        <p className="flex">
                            {activeChat.name}
                        </p>
                        <span className={(activeChat.typing ? 'block' : 'none')}>Typing...</span>

                    </div>
                </div>

                <ChatActions chat={activeChat} />
            </div>
            <div className="h-full overflow-scroll mt-20 sm:px-16">
                <Messages msgs={msgs} />
                <div className="absolute bg-white bottom-3 left-5 sm:left-40 md:left-72 lg:left-96 p-2 rounded-lg shadow-xl  sm:w-8/12 w-11/12 z-10">
                    <Input chat={activeChat} key={activeChat._id} />
                </div>
            </div>

        </div>
    );


};

export default Conversation;