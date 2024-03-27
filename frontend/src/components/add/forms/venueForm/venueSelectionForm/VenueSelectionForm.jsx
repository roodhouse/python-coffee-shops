import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useAddForm } from '../../../../../context/addFormContext'
import VenueInput from './venueInput/VenueInput'

function VenueSelectionForm() { 

    const { register, formState: {errors}, reset, watch } = useForm()
    const { updateFormData, currentStep, userSelectedLocation } = useAddForm()
    const [ triggerSubmit, setTriggerSubmit ] = useState(false)

    // reset the form when component is unmounted
    useEffect(() => {
        return () => {
            reset()
        }
    },[])

    const onSubmitCallback = () => {
        setTriggerSubmit(true)
    }

    useEffect(() => {
        if (userSelectedLocation) {
            setTriggerSubmit(true)
        }
    },[userSelectedLocation])

    useEffect(() => {
        if (triggerSubmit === true) {
            updateFormData(userSelectedLocation)
            reset()
            currentStep('map')
            setTriggerSubmit(false)
        }
    },[triggerSubmit, currentStep, reset, userSelectedLocation, updateFormData])

  return (
    <>
        <div id="venueSelectionFormContainer">
            <form id='venueSelectionForm' noValidate>
                <div id="venueInputWrapper">
                    <VenueInput register={register} errors={errors} reset={reset} watch={watch} onSubmitCallback={onSubmitCallback} />
                </div>
            </form>
        </div>
        {triggerSubmit && <input type='submit' style={{display: 'none'}} />}
    </>
  )
}

export default VenueSelectionForm