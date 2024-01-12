import React from 'react'
import { useAddForm } from '../../../../../../context/addFormContext'
import ImageOption from './imageOption/ImageOption'

function ImageInput({ register, errors }) {

    const { googlePhotos } = useAddForm()

  return (
    <>
        <div id="imageInputContainer">
            <select name="venuePhoto" id="venuePhotoSelect" {...register('image')} className='hidden'>
                    { googlePhotos.map((photo) => (
                        <ImageOption photo={photo} key={photo} />
                    ))}
                
            </select>
        </div>
    </>
  )
}

export default ImageInput