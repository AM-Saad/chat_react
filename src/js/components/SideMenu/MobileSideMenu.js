import React, { Fragment } from "react";
import SideMenuContent from "./SideMenuContent";
import Settings from "../SideMenu/Settings_Menu/Main";
import { Dialog, Transition } from '@headlessui/react'

import Requests from "../../components/SideMenu/Requests_Menu/Requests"

const MobileSideMenu = (props) => {


    return <Transition.Root show={props.toggleSidebar} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 flex z-40 md:hidden" onClose={() => props.closeMobileMenu()}>
            <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
            >
                <div className="h-full relative flex-1  flex-col max-w-xs w-full pt-5 pb-4 bg-white">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="absolute top-0 right-0 -mr-12 pt-2">
                            <button
                                type="button"
                                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                onClick={() => props.closeMobileMenu()}
                            >
                                <span className="sr-only">Close sidebar</span>
                                X
                            </button>
                        </div>
                    </Transition.Child>

                    <div className="flex-shrink-0 flex items-center justify-between px-4">
                        <img
                            className="h-8 w-auto"
                            src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
                            alt="Workflow"
                        />
                        <div className="flex">
                        <Requests />

                        <Settings />
                        </div>

                    </div>
                    <div className="mt-5 flex-1 overflow-y-auto">
                        <SideMenuContent />
                    </div>
                </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
                <div></div>
            </div>
        </Dialog>
    </Transition.Root>


}

export default MobileSideMenu