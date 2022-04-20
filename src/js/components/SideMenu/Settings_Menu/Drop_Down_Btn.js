import React, {  useRef } from "react";
import {  useSelector } from 'react-redux';
import { useDetectOutsideClick } from "js/util/useDetectOutsideClick";
const Button = (props) => {

    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
    const onClick = () => setIsActive(!isActive);
    const me = useSelector(state => state.me)
    const url = useSelector(state => state.url)

    return <div className="container">
        <div className="menu-container">
            <button onClick={onClick} className="menu-trigger">
                <span>{me.name}</span>
                <img
                     src={me.image ? `${url}/${me.image} ` : 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/df/df7789f313571604c0e4fb82154f7ee93d9989c6.jpg'}
                    alt="User avatar"
                />
            </button>
            <nav
                ref={dropdownRef}
                className={`menu ${isActive ? "active" : "inactive"}`}
            >
                <ul>
                    <li>
                        <a onClick={props.openMenuElement}>Profile</a>
                    </li>
                    <li>
                        <a onClick={props.openMenuElement}>Trips</a>
                    </li>
                    <li>
                        <a onClick={props.openMenuElement}>Saved</a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>



};

export default Button;