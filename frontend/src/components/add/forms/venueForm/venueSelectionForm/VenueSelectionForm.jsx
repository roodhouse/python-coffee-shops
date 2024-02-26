import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAddForm } from '../../../../../context/addFormContext'
import VenueInput from './venueInput/VenueInput'

function VenueSelectionForm() {

    // const [ userSelectedLocation, setUserSelectedLocation ] = useState(null)

    const { register, handleSubmit, formState: {errors} } = useForm()
    const { updateFormData, currentStep, userSelectedLocation } = useAddForm()

    // const onLocationSelect = (place) => {
    //     setUserSelectedLocation(place)
    // }

    const onSubmit = (data) => {
        updateFormData(userSelectedLocation)
        // onLocationSelect(data)
        currentStep('map')
        // console.log(userSelectedLocation)
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