import React from "react";
import { useDispatch } from 'react-redux';
import { accept_request, deny_request } from "js/actions";


function Request(prop) {

    const dispatch = useDispatch();

    function accept() {
        dispatch(accept_request(prop.request._id))
    }
    function deny() {
        dispatch(deny_request(prop.request._id))

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