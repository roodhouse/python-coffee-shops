import React, { useState } from 'react'
import { useAddForm } from '../../../../../../context/addFormContext'
import ImageOption from './imageOption/ImageOption'
import BackButton from '../../../back/BackButton'
import NextButton from '../../../next/NextButton'

function ImageInput({ register, errors, setValue }) {

    const { googlePhotos } = useAddForm()
    const [ selectedImage, setSelectedImage ] = useState(googlePhotos[0])

    const handleImageClick = (photo) => {
      setSelectedImage(photo)
      setValue('image', photo)
    }

  return (
    <>
        <div id="imageInputContainer">
            { googlePhotos.map((photo) => (
              <div id='imageOptionContainer' key={photo}>
                <ImageOption
                  key={photo}
                  photo={photo}
                  onClick={() => handleImageClick(photo)}
                  isSelected={selectedImage === photo }
                />
              </div>
            ))}

          <input className='inputValue' type="hidden" name='venuePhoto' value={selectedImage || ''} {...register('image')} />
          
          <div id="imageInputButtonContainer" className='flex justify-between'>
            <div id="imageInputBackButtonWrapper">
              <BackButton back={'map'} />
            </div>
            <div id="imageSubmitContainer" className='bg-blue rounded py-4 px-16 flex justify-center cursor-pointer text-center text-white border border-blue hover:bg-white hover:text-black'>
              <NextButton name={'imageSubmitButton'} id={'imageSubmitButton'} />
            </div>
          </div>

        </div>
    </>
  )
}

export default ImageInput