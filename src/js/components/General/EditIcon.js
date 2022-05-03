import React from "react";
import editIcon from 'public/image/edit.png'

const EditIcon = ({startEdit, isEdit}) => {
return <div className={`h-7 w-7 bg-white shadow-md rounded-full p-2 cursor-pointer hover:bg-blue-100 ${isEdit ? 'hidden' : 'block'}`}  onClick={() => {startEdit()}}>
    <img className="w-full h-full" src={editIcon} alt="edit-ocpn"/>
</div>

}

export default EditIcon;
