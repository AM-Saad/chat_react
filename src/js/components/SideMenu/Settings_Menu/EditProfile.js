import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { updateInfo } from "js/actions/index";
import DisplayImage from 'js/components/General/DisplayImage'

function EditProfile(props) {

    const dispatch = useDispatch();
    const me = useSelector(state => state.me)
    const loading = useSelector(state => state.loading_update_info)
    const msg = useSelector(state => state.update_info_msg)
    const [newImage, setNewImage] = useState();

    // Submit user name
    function submit() {

        // get user name
        const name = document.getElementById('updated_name').value
        const email = document.getElementById('updated_email').value

        if (!email || !name) {
            return dispatch({ type: "UPDATE_INFO_MESSAGE", payload: { msg: 'Email and name are required', type: 'info' } });
        }
        // Dispatch the user email to the store
        dispatch(updateInfo(email, name, newImage))

    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            submit()
        }
    }
    const closeEditProfile = () => {
        props.closeEditProfile()
    }
    useEffect(() => {
        console.log(newImage);
    }, [newImage])
    return (
        <div className="">
            <div className={`p-large bg-w b-r-medium  ${loading ? 'loader' : ''}`} onKeyDown={handleKeyDown}>
      
                <p>{msg.msg}</p>
                <DisplayImage image={me.image} getImage={(e) => setNewImage(e)} />
                <input className="border-1-b bg-lightgray b-none w-100 border-none p-large b-r-medium m-b-large m-t-large font-medium" id="updated_name" type="text" placeholder="Your Name..  " defaultValue={me.name} />
                <input className="border-1-b bg-lightgray b-none w-100 border-none p-large b-r-medium m-b-large m-t-large font-medium" id="updated_email" type="email" placeholder="Your Email..  " defaultValue={me.email} />
                <button className="btn" onClick={submit}>Submit</button>
            </div>
        </div>
    )
}

export default EditProfile;
