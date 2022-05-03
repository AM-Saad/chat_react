import React, { useState, Fragment } from "react";

import { useSelector, useDispatch } from "react-redux";
import 'public/css/settings.css'
import Profile from 'js/components/SideMenu/Settings_Menu/Profile'
import { Menu, Transition } from '@headlessui/react'
import { Logout } from '../../../actions/index'

export default function Main() {
    const url = useSelector(state => state.url)
    const me = useSelector(state => state.me)
    const [isEditProfile, setIsEditProfile] = useState(false);
    const dispatch = useDispatch()
   
    const settingComponents = () => {
            return (
                <>
                {me && 
                    <Menu as="div" className="ml-3 relative" >
                        <div>
                            <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <span className="sr-only">Open menu</span>
                                <img
                                    className="h-8 w-8 rounded-full"
                                    src={me.image ? `${url}/${me.image} ` : 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/df/df7789f313571604c0e4fb82154f7ee93d9989c6.jpg'}
                                    alt=""
                                />
                            </Menu.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <a className="block py-2 px-4 text-sm text-gray-700 cursor-pointer" onClick={(e) => setIsEditProfile(!isEditProfile)}>Settings</a>
                                <a className="block py-2 px-4 text-sm text-gray-700 cursor-pointer" onClick={(e) => { dispatch(Logout()) }}>Logout</a>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                    }
                    {!me && <div>
                            <div className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <span className="sr-only">Open menu</span>
                                <div
                                    className="h-8 w-8 rounded-full bg-gray-500 "
                                ></div>
                            </div>
                        </div>}
                    <Profile active={isEditProfile} closePanel={() => { setIsEditProfile(false) }} />
                </>
            );

    }

    return <div>{settingComponents()}</div>

}
