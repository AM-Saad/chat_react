import React ,{useState}from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleFriends } from "../../actions/index";

import Input from "js/components/Conversation/Input";
import Messages from "js/components/Conversation/Messages";
import ChatActions from "js/components/Conversation/ChatActionsDropDown";
import OnlineIcon from "js/components/General/OnlineIcon";
import UserImage from "js/components/General/UserImage";


const Conversation = (prop) => {
    const dispatch = useDispatch()
    let numberOfMsgs = -8
    const activeChat = useSelector(state => state.activeChat)
    const [isFullScreen, setIsFullScreen] = useState(false);
    const url = useSelector(state => state.url)
    let msgs = activeChat.chat.conversation.slice(1).slice(numberOfMsgs)
    const imageSrc = activeChat.image ? `${url}/${activeChat.image}` : 'https://www.bsn.eu/wp-content/uploads/2016/12/user-icon-image-placeholder.jpg'
    const openFullScreen = (state) => {
        
        setIsFullScreen(state)
    }
    return (
        <div >
            <div className="flex f-space-between box-header">
                <div className="flex">

                    <img className='back-to-friends close-button' onClick={() => dispatch(toggleFriends(true))} src="https://img.icons8.com/small/32/000000/back.png" />
                    <div className="p-relative">
                    <UserImage  src={imageSrc} openFullScreen={openFullScreen} isFullScreen={isFullScreen}>

                    </UserImage>
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
            <div className="chating">
                <Messages msgs={msgs} />
                <div className="box-footer">
                    <Input chat={activeChat} key={activeChat._id} />
                </div>
            </div>

        </div>
    );


};

export default Conversation;