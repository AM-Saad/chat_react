import React, { useEffect, useState } from 'react'
import Friends from "./Friends_Menu/Friends";
import Requests from "../SideMenu/Requests_Menu/Requests";
import "../../../public/css/menu.css"

import { useSelector } from "react-redux";

const SideMenuContent = () => {

    const isOpenedFriends = useSelector(state => state.isOpenedFriends)
    const activeChat = useSelector(state => state.activeChat)

    return (
        <div className={'w-full px-5 ' + (isOpenedFriends || !activeChat ? 'opened' : '')}>
            <div className="flex">
                <Requests />
            </div>

            <Friends />
        </div>
    )
}


export default SideMenuContent
