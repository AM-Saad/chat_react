import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import socket from '../util/socket'
import NetworkDetector from '../Hoc/NetworkDetector';
import useWindowDimensions from '../util/windowDimensions';
import Login from "./Login";
import Search from "./Search/Main";
import Chat from '../components/Conversation/Main'
import SideMenuSkeleton from "../components/SideMenu/index";
import { StyledBody } from '../components/styles/Body.styled'
import { fetch_me, fetch_friends, update_friend_online_status, new_msg, friend_typing, friend_stopped_typing, add_msg_to_active_conv } from "../actions/index";
import Notification from 'js/components/General/Notification'

const App = () => {
  const uid = useSelector(state => state.uid)
  const isAuth = useSelector(state => state.isAuth)
  const activeChat = useSelector(state => state.activeChat)
  const [toggleSidebar, setToggleSidebar] = useState(false)

  const dispatch = useDispatch();
  dispatch({ type: 'CHECK_AUTH' })


  // Ask: Why  when  the value inside useWindowDimensions it re-render tha app component and the value inside useWindowDimensions is the same
  const [screenWidth, setScreenWidth] = useState(useWindowDimensions().width)

  useEffect(() => {
    if (isAuth) {
      dispatch(fetch_friends())
      dispatch(fetch_me())
      
      socket.emit('join-chats', uid)

      socket.on('typing', (userId) => dispatch(friend_typing(userId)))
      socket.on('stoptyping', (userId) => dispatch(friend_stopped_typing(userId)))
      
      socket.on('new-message', (msg) => {
        dispatch(new_msg(msg))
        dispatch(add_msg_to_active_conv(msg))
      })

      socket.on('online-user', (user) => {
        dispatch(update_friend_online_status(user))
      })

      socket.on('friend_block_unblock', (data) => {
        dispatch({ type: "FRIEND_BLOCK_UNBLOCK", payload: data })
        dispatch({ type: "ACTIVE_CONV_BLOCK_UNBLOCK", payload: data })

      })

      socket.on('clear_chat', (data) => {
        dispatch({ type: "DELETE_ACTIVE_CONV", payload: data.chatNumber })
        dispatch({ type: "DELETE_FRIEND_CONV", payload: data.chatNumber })
      })


      socket.on('new_friend_request', (user) => {
        dispatch({ type: "NEW_FRIEND_REQUEST", payload: [user] })
      })

      socket.on('friend_request_status', (data) => dispatch({ type: 'FRIEND_REQUEST_STATUS', payload: data }))

      window.addEventListener("beforeunload", handleUnload);
      if (screenWidth && screenWidth < 900) {
        setToggleSidebar(true)
      }
    }
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [isAuth, handleUnload, screenWidth])

  const handleUnload = (e) => {
    socket.emit('offline', uid)
  };


  if (!isAuth) {
    return <Login />
  }

  return <>
    <SideMenuSkeleton toggleSidebar={toggleSidebar} onToggleSidebar={() => setToggleSidebar(false)} />
    <div className="md:pl-72 lg:pl-80 ">
      <div className={`sticky top-0 flex-shrink-0 ${activeChat ? ' sm:hidden flex' : ' flex '} h-16 bg-white shadow`}>
        <button
          type="button"
          className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
          onClick={() => setToggleSidebar(true)}
        >
          <span className="sr-only">Open sidebar</span>
          =
        </button>
        <div className='flex-1 px-4 flex justify-between'>
          <Search />
        </div>
      </div>
      <StyledBody >
        <Chat />
        <Notification />
      </StyledBody>

    </div>
  </>
}




// };

export default NetworkDetector(App);