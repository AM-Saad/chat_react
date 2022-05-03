import React, { useEffect, useRef } from "react";
import Request from './Request'
import { useSelector } from "react-redux";
import { fetch_requests, fetch_panding_requests } from "js/actions/index";
import { useDispatch, } from 'react-redux';

import { useDetectOutsideClick } from "js/util/useDetectOutsideClick";

const Requests = () => {
    const dispatch = useDispatch();

    const isAuth = useSelector(state => state.isAuth)
    const allRequests = useSelector(state => state.requests)
    const requestsMeta = useSelector(state => state.requestsMeta)

    const fetchRequestesAndPandingRequests = () =>{
        dispatch(fetch_panding_requests())
        dispatch(fetch_requests())
    }
    useEffect(() => {
            fetchRequestesAndPandingRequests()
    }, [isAuth])

    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
    const onClick = () => setIsActive(!isActive);
 
    return (
        <div>
            <button className={`flex  ${isActive ? "none" : ""}`} onClick={onClick}> <span className={allRequests.length > 0 ? 'c-g' : ''}>{allRequests.length}</span><img src="https://img.icons8.com/small/32/000000/friends.png" /> </button>
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
                {!requestsMeta.error && !requestsMeta.loading && allRequests.length === 0 && <p className={`mt-5 text-gray-400 text-xl true `}>No recent requests...</p>}
                {requestsMeta.loading && <p>Loading...</p>}
                {requestsMeta.error && <div className="bg-opacity-50 bg-yellow-100 p-3 rounded">
                <p className="mb-5">{requestsMeta.error}</p>
                <button className="bg-gray-300 px-6 py-2 rounded-sm bg-blue-200 hover:opacity-70" onClick={() => dispatch(fetchRequestesAndPandingRequests())}>Reload</button>
            </div>}

            </div>
        </div>

    );
};

export default Requests;