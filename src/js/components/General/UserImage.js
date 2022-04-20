import React from "react";

import { StyledUserImage } from 'js/components/styles/UserImage.styled'

const Userimage = ({ src, isFullScreen, openFullScreen }) => {
    return <>
        <button  onClick={() => openFullScreen(false)} type="button" className={` focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white h-10 items-center justify-center ml-1 relative ring ring-white rounded-full text-2xl text-white w-10 z-50 ${isFullScreen? 'flex': 'none'}`} tabindex="0"><span className="sr-only">Close sidebar</span>X</button>
        <div className={`${isFullScreen ? 'fixed right-0 top-0 w-100 h-100 bg-opacity-50 bg-black' : ''}`}>

        <StyledUserImage src={src} onClick={() =>openFullScreen(true)} fullscreen={isFullScreen} />
        </div>

    </>
}

export default Userimage;
