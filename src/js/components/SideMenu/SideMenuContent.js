import React, { useEffect, useState } from 'react'
import Friends from "./Friends_Menu/Friends";
import SearchFriends from "./Friends_Menu/Search_Friends";
import "../../../public/css/menu.css"

import { useSelector } from "react-redux";

const SideMenuContent = () => {

    const activeChat = useSelector(state => state.activeChat)

    return (
        <div className={'w-full px-5 ' + (!activeChat ? 'opened' : '')}>
            <SearchFriends />
            <Friends />
        </div>
    )
}


export default SideMenuContent
