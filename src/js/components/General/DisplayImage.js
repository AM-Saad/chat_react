import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';


export default function DisplayImage(props) {
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()
    const url = useSelector(state => state.url)

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0])
        props.getImage(e.target.files[0])
    }
    let image = props.image ? url + "/" + props.image : 'https://www.bsn.eu/wp-content/uploads/2016/12/user-icon-image-placeholder.jpg'
    return (
        <div className="img-input-container">
            <img src={preview || image} id="uploadImg" />
            <div class="input">
                <label class="label" for="image"></label>
                <input name="" id="image" type='file' onChange={onSelectFile} />
            </div>
        </div>
    )
}