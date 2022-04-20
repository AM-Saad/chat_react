import React from "react";
import { useDispatch } from 'react-redux';
import { acceptRequest, denyRequest } from "js/actions";

import socket from '../../../util/socket'


function Request(prop) {

    const dispatch = useDispatch();

    // Get next question when choose specific answer 
    function accept() {
        dispatch(acceptRequest(prop.request._id))
    }
    function deny() {
        dispatch(denyRequest(prop.request._id))

    }


    return (
        <div className=" b-r-medium bg-lightgray p-medium m-large flex f-space-between">
            <span>{prop.request.name}</span>
            <div className=" flex f-space-between">
                <button onClick={accept} className="btn btn-small btn-success">Accept</button>
                <button onClick={deny} className="btn btn-small btn-alert">Deny</button>
            </div>
        </div>
    );
};

export default Request;