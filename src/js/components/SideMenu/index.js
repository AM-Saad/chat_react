import React, { useEffect, useState } from "react";
import MobileSideMenu from "./MobileSideMenu";
import SideMenuContent from "./SideMenuContent";
import { useDispatch } from "react-redux";

import { FetchFriends } from "js/actions/index";

const SideMenuSkeleton = (props) => {

    return <div>
        <MobileSideMenu toggleSidebar={props.toggleSidebar} closeMobileMenu={() => props.onToggleSidebar(false)} />

        {/* Static sidebar for desktop */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex flex-col flex-grow border-r border-gray-200 pt-5 bg-white overflow-y-auto">
                <div className="flex items-center flex-shrink-0 px-4">
                    <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
                        alt="Workflow"
                    />
                </div>
                <div className="mt-5 flex-grow flex flex-col w-full">
                    <SideMenuContent />
                </div>
            </div>
        </div>
    </div>

}

export default SideMenuSkeleton
