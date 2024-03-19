import React from 'react'
import { useForm } from 'react-hook-form'
import { useAddForm } from '../../../../../context/addFormContext'
import ConfirmMap from './confirmMap/ConfirmMap'
import MapInput from './mapInput/MapInput'
import { getState } from '../../../../../utils/mapFunctions/getState'

function MapSelectionForm() {
    
    const { register, handleSubmit, formState: {errors} } = useForm()
    const { currentStep, updateFormData, formData, step } = useAddForm()

    let state;

    if (formData && step === 'map') {
        state = getState(formData.formatted_address)
    }
    
    const onSubmit = () => {
        currentStep('image')
        updateFormData(
            {
                map: formData.url,
                location: [
                    {
                        lng: formData.geometry.viewport.Jh.hi,
                        lat: formData.geometry.viewport.Zh.hi
                    }
                ],
                address: formData.formatted_address, 
                hours: formData.opening_hours.weekday_text,
                city: formData.address_components[3].long_name,
                state: state
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