import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import socket from '../util/socket'
import useWindowDimensions from '../util/windowDimensions'
import NetworkDetector from '../Hoc/NetworkDetector';
import Login from "./Login";
import Settings from "./SideMenu/Settings_Menu/Main";
import Search from "./Search/Main";
import Chat from '../components/Conversation/Main'
import SideMenuSkeleton from "../components/SideMenu/index";

import { FetchMe, FetchFriends, checkAuth, UpdateUserOnlineStatus, NewMsg, UserTyping, UserStoppedTyping, AddMsgToCurrentConv } from "../actions/index";

const App = () => {
  const username = useSelector(state => state.username)
  const uid = useSelector(state => state.uid)
  const isAuth = useSelector(state => state.isAuth)
  const meMeta = useSelector(state => state.meMeta)
  const [toggleSidebar, setToggleSidebar] = useState(false)

  const dispatch = useDispatch();

  dispatch(checkAuth())


  useEffect(() => {
    if (isAuth) {
      dispatch(FetchFriends())
      dispatch(FetchMe())

      socket.emit('join-chats', uid)

      socket.on('typing', (userId) => dispatch(UserTyping(userId)))
      socket.on('stoptyping', (userId) => dispatch(UserStoppedTyping(userId)))
      socket.on('new-message', (msg) => {
        dispatch(NewMsg(msg))
        dispatch(AddMsgToCurrentConv(msg))
      })

      socket.on('online-user', (user) => {
        dispatch(UpdateUserOnlineStatus(user))
      })
      socket.on('friend_block_unblock', (data) => {
        dispatch({ type: "FRIEND_BLOCK_UNBLOCK", payload: data })
        dispatch({ type: "CURRENT_CONV_BLOCK_UNBLOCK", payload: data })


      })
      socket.on('new_friend_request', (user) => {
        dispatch({ type: "NEW_FRIEND_REQUEST", payload: [user] })
      })
      socket.on('friend_request_status', (data) => dispatch({ type: 'FRIEND_REQUEST_STATUS', payload: data }))

      window.addEventListener("beforeunload", handleUnload);
      return () => {
        window.removeEventListener("beforeunload", handleUnload);
      };
    }
  }, [isAuth, handleUnload])



  const handleUnload = (e) => {
    socket.emit('offline', uid)
  };


  if (!isAuth) {
    return <Login />
  }

  if (meMeta.loading) {
    return <div>
      <h1>Welcome Back, {username}</h1>
      <p>Please wait while loading your data...</p>
    </div>

  } else {
    console.log('hola')
    return <>
      <div>
        <SideMenuSkeleton toggleSidebar={toggleSidebar} onToggleSidebar={() => setToggleSidebar(false)} />
        <div className="md:pl-64 ">
          <div className="sticky top-0 flex-shrink-0 flex h-16 bg-white shadow">
            <button
              type="button"
              className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
              onClick={() => setToggleSidebar(true)}
            >
              <span className="sr-only">Open sidebar</span>
              =
            </button>
            <div className="flex-1 px-4 flex justify-between">
              <Search />
              <div className="ml-4 flex items-center md:ml-6">
                <button
                  type="button"
                  className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="sr-only">View notifications</span>
                  {/* <BellIcon className="h-6 w-6" aria-hidden="true" /> */}
                </button>

                <Settings active={true} clearOpenedItem={() => { }} />
              </div>
            </div>
          </div>

          <main className="flex-1">
            <Chat />
          </main>
        </div>
      </div>
    </>
  }




};

export default NetworkDetector(App);