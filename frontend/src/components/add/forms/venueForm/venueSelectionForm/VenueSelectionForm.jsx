import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAddForm } from '../../../../../context/addFormContext'
import VenueInput from './venueInput/VenueInput'

function VenueSelectionForm() {

    const { register, handleSubmit, formState: {errors} } = useForm()
    const { updateFormData, currentStep, userSelectedLocation } = useAddForm()

    const onSubmit = (data) => {
        updateFormData(userSelectedLocation)
        currentStep('map')
    }

    const onError = () => {
        console.log('big time error')
    }

  return (
    <>
        <div id="venueSelectionFormContainer">
            <form noValidate onSubmit={handleSubmit(onSubmit, onError)}>
                <div id="venueInputWrapper">
                    <VenueInput register={register} errors={errors} />
                </div>
            </form>
        </div>
    </>
  )
}

export default VenueSelectionForm