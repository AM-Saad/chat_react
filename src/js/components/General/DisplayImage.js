import React, { useState, useEffect } from 'react'
import {  change_image } from "js/actions/index";

import { useSelector, useDispatch } from 'react-redux';


export default function DisplayImage(props) {
    const dispatch = useDispatch();

    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()

    const url = useSelector(state => state.url)
    const meMeta = useSelector(state => state.meMeta)
    const me = useSelector(state => state.me)
    const loadingChangingImage = useSelector(state => state.loadingChangingImage)

    let image = props.image ? url + "/" + props.image : 'https://www.bsn.eu/wp-content/uploads/2016/12/user-icon-image-placeholder.jpg'
    const resetUploadingImage = () =>{
        setPreview(image)
        setSelectedFile(undefined)

    }
    const saveImage = async () =>{
      await dispatch( change_image(selectedFile))
      resetUploadingImage()
    }
    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)
          
        // free memory when ever this component is unmounted
        return () => {
        URL.revokeObjectURL(objectUrl)}
    }, [selectedFile, me])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0])
    }
    return (
        <div className="img-input-container">
            <div className='img-input-container'>

            <img src={preview || image} id="uploadImg" alt="User profile" />
            <div className="input">
                <label className="label" htmlFor="image"></label>
                <input name="" id="image" type='file' onChange={onSelectFile} />
            </div>
            </div>
            {selectedFile &&
                <>
                <button type="button" className="bg-gray-300 px-6 py-2 rounded-sm text-gray-700 hover:opacity-70" onClick={() => resetUploadingImage()}>Cancel</button>
                <button type="button" className="bg-green-200 px-6 py-2 rounded-sm text-gray-700 hover:opacity-7" onClick={() => saveImage()}>{meMeta.loading || loadingChangingImage ? 'Update...' : 'Update'}</button>
                </>
            }
        </div>
    )
}