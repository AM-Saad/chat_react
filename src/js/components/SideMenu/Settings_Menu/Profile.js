import React, {  Fragment } from 'react'
import EditProfile from './EditProfile'
import { Dialog, Transition } from '@headlessui/react'

export default function Profile(props) {

    return (<Transition.Root show={props.active} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 overflow-hidden z-50" onClose={props.closePanel}>
            <div className="absolute inset-0 overflow-hidden">
             <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
                <div className="pointer-events-none fixed inset-y-0  flex max-w-full pr-10">
                    <Transition.Child
                        as={Fragment}
                        enter="transform transition ease-in-out duration-500 sm:duration-700"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transform transition ease-in-out duration-500 sm:duration-700"
                        leaveFrom="-translate-x-0"
                        leaveTo="-translate-x-full"
                    >
                        <div className="pointer-events-auto w-screen max-w-md h-full">
                            <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                <div className="px-4 sm:px-6 w-full">
                                    <div className="flex items-start justify-between">
                                        <Dialog.Title className="text-lg font-medium text-gray-900"> Edit Info </Dialog.Title>
                                        <div className="ml-3 flex h-7 items-center">
                                            <button
                                                type="button"
                                                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                onClick={props.closePanel}
                                            >
                                                <span className="sr-only">Close panel</span>
                                                X
                     </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative mt-6 flex-1 px-4 sm:px-6 w-full">
                                    {/* Replace with your content */}
                                    <div className="absolute inset-0 px-4 sm:px-6">
                                        <EditProfile />
                                    </div>
                                    {/* /End replace */}
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </div>
        </Dialog>
    </Transition.Root>)

}
