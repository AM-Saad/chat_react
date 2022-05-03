import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { open_chat, loadMoreMsgs } from "../../../actions/index";
import {StyledFriend} from '../../styles/Friend.styled'
import OnlineIcon from "js/components/General/OnlineIcon";


function Friend(friend) {
    const url = useSelector(state => state.url)
    const dispatch = useDispatch();

    function openChat() {

        dispatch(open_chat(friend.friend._id))
        dispatch(loadMoreMsgs())
    }

    const renderLastMsg = () => {
        if (friend.friend.chat && friend.friend.chat.conversation.length > 0) {
            return <div className="flex w-100">

                <p className="last-msg">{friend.friend.chat.conversation.length > 0 ? friend.friend.chat.conversation[friend.friend.chat.conversation.length - 1].msg : ''}</p>
                <p className="last-msg">{friend.friend.chat.conversation.length > 0 ? friend.friend.chat.conversation[friend.friend.chat.conversation.length - 1].date.date : ''}</p>
            </div>
        }
    }

   
    return (
        <StyledFriend onClick={openChat} visible={friend.friend.visible} newMsg={friend.friend.new} >
            <div className="flex cursor-pointer w-full">
                <div className="p-relative">

                    <img  alt={friend.friend.name} src={friend.friend.image ? `${url}/${friend.friend.image} ` : 'https://www.bsn.eu/wp-content/uploads/2016/12/user-icon-image-placeholder.jpg'} />
                    <OnlineIcon  online={friend.friend.online}/>

                </div>
                <div className="w-100">
                    <div>
                        <div className="flex ">
                            <h3>{friend.friend.name}</h3>
                            <span className='new-message'>{friend.friend.new}</span>
                        </div>
                        <span className={(friend.friend.typing ? 'block' : 'none')}>Typing...</span>
                    </div>
                    {renderLastMsg()}
                </div>


            </div>

        </StyledFriend>
    );
};

export default Friend;