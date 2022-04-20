import React, { useEffect, useState, Fragment, useRef } from "react";

import { useSelector } from "react-redux";
import 'public/css/settings.css'
import Profile from 'js/components/SideMenu/Settings_Menu/Profile'
import {  Menu, Transition } from '@headlessui/react'


export default function Main(prop) {
    const url = useSelector(state => state.url)
    const me = useSelector(state => state.me)
    const [isActive, setIsActive] = useState(false);
    const [isEditProfile, setIsEditProfile] = useState(false);

    const onClick = () => {
        setIsActive(!isActive)
        prop.clearOpenedItem()
    }
    useEffect(() => {
        if (prop.active === 'Profile' && !isActive) {
            setIsActive(true)
        } else {
            if (prop.active != 'Profile' && !isActive) {
                setIsActive(false)
                prop.clearOpenedItem()
            }
        }
    }, [prop.active, isActive, isEditProfile])

    const settingComponents = () => {
        if (me) {

            return (
                <div>
                    <Menu as="div" className="ml-3 relative" >
                        <div>
                            <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <span className="sr-only">Open user menu</span>
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
                                <a className="block py-2 px-4 text-sm text-gray-700" onClick={(e) => setIsEditProfile(!isEditProfile)}>Edit Profile</a>
                                <a className="block py-2 px-4 text-sm text-gray-700">Settings</a>
                                <a className="block py-2 px-4 text-sm text-gray-700" onClick={(e) => { }}>Logout</a>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                    <Profile active={isEditProfile} closePanel={() => { setIsEditProfile(false) }} />
                </div>
            );
        }

    }

    return <div>{settingComponents()}</div>

}
