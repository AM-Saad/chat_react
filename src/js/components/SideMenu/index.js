import React, { useEffect, useState } from "react";
import MobileSideMenu from "./MobileSideMenu";
import SideMenuContent from "./SideMenuContent";
import Settings from "../SideMenu/Settings_Menu/Main";
import Requests from "../SideMenu/Requests_Menu/Requests";

const SideMenuSkeleton = (props) => {
    return <div>
        <MobileSideMenu toggleSidebar={props.toggleSidebar} closeMobileMenu={() => props.onToggleSidebar(false)} />

        {/* Static sidebar for desktop */}
        <div className="hidden md:flex md:w-72 lg:w-80 md:flex-col md:fixed md:inset-y-0">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className=" flex-col flex-grow border-r border-gray-200 pt-5 bg-white overflow-y-auto">
                <div className="flex items-center justify-between flex-shrink-0 px-4">
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
                <div className="mt-5 flex-grow flex flex-col w-full">
                    <SideMenuContent />
                </div>
            </div>
        </div>
    </div>

}

export default SideMenuSkeleton
