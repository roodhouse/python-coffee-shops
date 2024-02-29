import React from 'react'
import { useForm } from 'react-hook-form'
import { useAddForm } from '../../../../../context/addFormContext'
import ConfirmMap from './confirmMap/ConfirmMap'
import MapInput from './mapInput/MapInput'

function MapSelectionForm() {
    
    const { register, handleSubmit, formState: {errors} } = useForm()
    const { currentStep, updateFormData, formData } = useAddForm()


    const onSubmit = () => {
        currentStep('image')
        updateFormData(
            {
                map: formData.url,
                location: 
                {
                    lng: formData.geometry.viewport.Jh.hi,
                    lat: formData.geometry.viewport.Zh.hi
                },
                address: formData.formatted_address, 
                hours: formData.opening_hours.weekday_text,
                city: formData.address_components[3].long_name
            }
        )
    }

    const onError = () => {
        console.log('error in map')
    }

  return (
    <>
        <div id="mapSelectionFormContainer">
            <form noValidate onSubmit={handleSubmit(onSubmit, onError)}>
                <div id="confirmMapWrapper" className='mb-4'>
                    <ConfirmMap />
                </div>
                <div id="mapInputWrapper">
                    <MapInput register={register} errors={errors} />
                </div>
            </form>
        </div>
    </>
  )
}

export default MapSelectionForm