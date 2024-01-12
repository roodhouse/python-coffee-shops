import React from 'react'
import { useAddForm } from '../../../../context/addFormContext'
import AddFormTitle from '../title/AddFormTitle'
import ImageSelectionForm from './imageSelectionForm/ImageSelectionForm'

function ImageForm() {

    const { step } = useAddForm()
  return (
    <>
        <div id="imageFormContainer">
            <div id="imageTitleWrapper" style={ step === 'image' ? {opacity: 1} : {opacity: .25}}>
                <AddFormTitle section={'Choose an Image'} />
            </div>
            <div id="imageSelectionFormWrapper" style={ step === 'image' ? {display: 'block'} : {display: 'none'}} className='mb-8'>
                <ImageSelectionForm />
            </div>
        </div>
    </>
  )
}

export default ImageForm