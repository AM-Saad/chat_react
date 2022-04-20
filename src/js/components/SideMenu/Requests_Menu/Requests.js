import React, { useEffect, useRef } from "react";
import Request from './Request'
import { useSelector } from "react-redux";
import { requests, pandingrequests } from "js/actions/index";
import { useDispatch, } from 'react-redux';

import { useDetectOutsideClick } from "js/util/useDetectOutsideClick";
import socket from 'js/util/socket'

const Requests = () => {
    const dispatch = useDispatch();

    const isAuth = useSelector(state => state.isAuth)
    const allRequests = useSelector(state => state.requests)


    useEffect(() => {
        if (isAuth) {
            dispatch(pandingrequests())
            dispatch(requests())
          
        }
    }, [isAuth])


    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
    const onClick = () => setIsActive(!isActive);

    return (
        <div>
            <button className={`btn  ${isActive ? "none" : ""}`} onClick={onClick}><img src="https://img.icons8.com/small/32/000000/friends.png" /> <span className={allRequests.length > 0 ? 'c-g' : ''}>{allRequests.length}</span> </button>
            <div className={`requests-menu submenu-item ${isActive ? "active" : ""}`}>
                <div className="flex m-b-xlarge m-t-xlarge f-space-between">
                    <p className="submenu-item-title">Friend Requests </p>
                    <img className='close-button' onClick={onClick} src="https://img.icons8.com/small/32/000000/back.png" />
                </div>
                <ul>
                    <li className="m-small admin">
                        {allRequests.map((object, i) => <Request request={object} requestId={object._id} key={object._id} />)}
                    </li>
                </ul>

            </div>
        </div>

    );
};

export default Requests;