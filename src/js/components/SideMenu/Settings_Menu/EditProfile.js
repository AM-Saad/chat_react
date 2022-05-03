import React, { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {  update_partial_me } from "js/actions/index";
import DisplayImage from 'js/components/General/DisplayImage'
import EditIcon from 'js/components/General/EditIcon'

const userNameReducer = (state, action) => {
    if(action.type === 'UPDATE_USER_NAME_STATE'){
        return {isEdit:action.isEdit, newName: action.newName}
    }
    return {isEdit:false, newName: state.newName}
}
const userEmailReducer = (state, action) => {
    if(action.type === 'UPDATE_USER_EMAIL_STATE'){
        return {isEdit:action.isEdit, newEmail: action.newEmail}
    }
    return {isEdit:false, newEmail: state.newEmail}
}
const userBioReducer = (state, action) => {
    if(action.type === 'UPDATE_USER_BIO_STATE'){
        return {isEdit:action.isEdit, newBio: action.newBio}
    }
    return {isEdit:false, newBio: state.newBio}
}

function EditProfile() {

    const dispatch = useDispatch();
    const me = useSelector(state => state.me)
    const meMeta = useSelector(state => state.meMeta)
    const [userNameState, dispatchUserNameState] = useReducer(userNameReducer, {isEdit:false,newName:me.name});
    const [userEmailState, dispatchUserEmailState] = useReducer(userEmailReducer, {isEdit:false,newEmail:me.email});
    const [userBioState, dispatchUserBioState] = useReducer(userBioReducer, {isEdit:false,newBio:me.bio});

        
 
    useEffect(() => {
        if(!meMeta.loading && !meMeta.error) {
            dispatchUserNameState({type:'UPDATE_USER_NAME_STATE',isEdit:false, newName:me.name});
            dispatchUserEmailState({type:'UPDATE_USER_EMAIL_STATE',isEdit:false, newEmail:me.email});
            dispatchUserBioState({type:'UPDATE_USER_BIO_STATE',isEdit:false, newBio:me.bio});
        }
      
    }, [meMeta])
    return (
        <>
        {!me && <div>Loading...</div>}
        {me && <div className="">
            <div className={`p-large bg-w b-r-medium  `} >

                <DisplayImage image={me.image} />
      
                <div className="border-b-1-g mb-6 pb-2">
                    <span className="text-sm font-bold text-gray-600 mb-2">Bio</span>

                    <div className="flex items-center">
                        <p className={`${userBioState.isEdit ? 'hidden' : 'block'} mr-5  font-medium`}>{me.bio || 'Available'}</p>
                        <EditIcon isEdit={userBioState.isEdit} startEdit={() => { dispatchUserBioState({type:'UPDATE_USER_BIO_STATE',isEdit:true}) }} />
                    </div>
                    <div className={`${userBioState.isEdit ? 'block' : 'hidden'}`}>

                        <input className={`border-1-b bg-lightgray  w-100  p-large b-r-medium m-b-large m-t-large font-medium `} onChange={(e)=> dispatchUserBioState({type:'UPDATE_USER_BIO_STATE',newBio:e.target.value, isEdit:true})} id="updated_bio" type="text" placeholder="Tell us about you..  " defaultValue={userBioState.newBio} />
                        <div className="flex justify-end gap-2">
                            <button type="button" className="bg-gray-300 px-6 py-2 rounded-sm text-gray-700 hover:opacity-70" onClick={() => dispatchUserBioState({type:'UPDATE_USER_BIO_STATE',isEdit:false})}>Cancel</button>
                            <button type="button" className="bg-green-200 px-6 py-2 rounded-sm text-gray-700 hover:opacity-7" onClick={() => dispatch( update_partial_me({bio:userBioState.newBio }, [{bio:userBioState.newBio}]))}>{meMeta.loading ? 'Update...' : 'Update'}</button>
                        </div>
                    </div>
                </div>


                <div className="border-b-1-g mb-6 pb-2">
                    <span className="text-sm font-bold text-gray-600 mb-2">Name</span>

                    <div className="flex items-center">
                        <p className={`${userNameState.isEdit ? 'hidden' : 'block'} mr-5  font-medium`}>{me.name}</p>
                        <EditIcon isEdit={userNameState.isEdit} startEdit={() => { dispatchUserNameState({type:'UPDATE_USER_NAME_STATE', isEdit: true, newName:me.name}) }} />
                    </div>
                    <div className={`${userNameState.isEdit ? 'block' : 'hidden'}`}>

                        <input className={`border-1-b bg-lightgray  w-100  p-large b-r-medium m-b-large m-t-large font-medium `} onChange={(e)=> dispatchUserNameState({type:'UPDATE_USER_NAME_STATE', newName:e.target.value, isEdit:true})} id="updated_name" type="text" placeholder="Your Name..  " defaultValue={userNameState.newName} />
                        <div className="flex justify-end gap-2">
                            <button type="button" className="bg-gray-300 px-6 py-2 rounded-sm text-gray-700  hover:opacity-70" onClick={() => dispatchUserNameState({type:'UPDATE_USER_NAME_STATE', isEdit: false, newName:me.name})}>Cancel</button>
                            <button type="button" className="bg-green-200 px-6 py-2 rounded-sm text-gray-700  hover:opacity-70" onClick={() => dispatch( update_partial_me({name:userNameState.newName }, [{name:userNameState.newName}]))}>{meMeta.loading ? 'Update...' : 'Update'}</button>
                        </div>
                    </div>
                </div>


                <div className="border-b-1-g mb-6 pb-2">
                    <span className="text-sm font-bold text-gray-600 mb-2">Email</span>

                    <div className="flex items-center">
                        <p className={`${userEmailState.isEdit ? 'hidden' : 'block'} mr-5  font-medium`}>{me.email}</p>
                        <EditIcon isEdit={userEmailState.isEdit} startEdit={() => { dispatchUserEmailState({type:'UPDATE_USER_EMAIL_STATE', isEdit: true, newEmail:me.email}) }} />
                    </div>
                    <div className={`${userEmailState.isEdit ? 'block' : 'hidden'}`}>

                        <input className={`border-1-b bg-lightgray  w-100  p-large b-r-medium m-b-large m-t-large font-medium `} onChange={(e) => { dispatchUserEmailState({type:'UPDATE_USER_EMAIL_STATE', isEdit: true, newEmail:e.target.value}) }} id="updated_emil" type="text" placeholder="Your Email..  " defaultValue={userEmailState.newEmail} />
                        <div className="flex justify-end gap-2">
                            <button type="button" className="bg-gray-300 px-6 py-2 rounded-sm text-gray-700  hover:opacity-70" onClick={() => { dispatchUserEmailState({type:'UPDATE_USER_EMAIL_STATE', isEdit: false, newEmail:me.email}) }} >Cancel</button>
                            <button type="button" className="bg-green-200 px-6 py-2 rounded-sm text-gray-700  hover:opacity-70" disabled={meMeta.loading} onClick={() => dispatch( update_partial_me({email:userEmailState.newEmail }, [{email:userEmailState.newEmail}]))}>{meMeta.loading ? 'Update...' : 'Update'}</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>}
        </>

    )
}

export default EditProfile;
