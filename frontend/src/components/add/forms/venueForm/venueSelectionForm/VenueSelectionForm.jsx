import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useAddForm } from '../../../../../context/addFormContext'
import VenueInput from './venueInput/VenueInput'

function VenueSelectionForm() { 

    const { register, handleSubmit, formState: {errors}, reset } = useForm()
    const { updateFormData, currentStep, userSelectedLocation } = useAddForm()

    const onSubmit = (data) => {
        updateFormData(userSelectedLocation)
        reset()
        currentStep('map')
    }

    const onError = () => {
        console.log('big time error')
    }

    // reset the form when component is unmounted
    useEffect(() => {
        return () => {
            console.log('Component unmounted, resetting form');
            reset()
        }
    },[])

  return (
    <>
        <div id="venueSelectionFormContainer">
            <form noValidate onSubmit={handleSubmit(onSubmit, onError)}>
                <div id="venueInputWrapper">
                    <VenueInput register={register} errors={errors} reset={reset} />
                </div>
            </form>
        </div>
    </>
  )
}

export default VenueSelectionForm