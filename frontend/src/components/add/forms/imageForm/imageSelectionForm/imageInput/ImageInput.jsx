import React, { useState } from 'react'
import { useAddForm } from '../../../../../../context/addFormContext'
import ImageOption from './imageOption/ImageOption'
import BackButton from '../../../back/BackButton'
import NextButton from '../../../next/NextButton'

function ImageInput({ register, errors, setValue }) {

    // const { googlePhotos, formData } = useAddForm()
    const { formData, step } = useAddForm()
    const [ selectedImage, setSelectedImage ] = useState(null)

    const handleImageClick = (photo) => {
      setSelectedImage(photo)
      setValue('image', photo)
    }

    let googlePhotos = []

      if (step === "image" && formData && formData.photos) {
        const firstSixPhotos = formData.photos.slice(0,6)

        firstSixPhotos.forEach((photo) => {
          if (typeof photo.getUrl === "function") {
            googlePhotos.push(photo.getUrl());
          } else {
            console.error("Error getting google photos");
          }
        })
      }

    console.log(googlePhotos)

  return (
    <>
        <div id="imageInputContainer">
          <div id='imageChoiceContainer' className='flex flex-wrap justify-between my-7'>
            { googlePhotos.map((photo, index) => (
              <div id={`imageOptionContainer-${index}`} key={index} className={`${index === 0 || index === 1 || index === 2 ? 'mb-7' : ''} w-24 h-52`}>
                <ImageOption
                  key={index}
                  photo={photo}
                  onClick={() => handleImageClick(photo)}
                  isSelected={selectedImage === photo }
                  index={index}
                />
              </div>
            ))}
          </div>

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