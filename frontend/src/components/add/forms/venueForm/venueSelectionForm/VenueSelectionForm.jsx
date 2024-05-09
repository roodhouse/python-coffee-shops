import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useAddForm } from '../../../../../context/addFormContext'
import VenueInput from './venueInput/VenueInput'
import { useMain } from '../../../../../context/main'

function VenueSelectionForm() { 

    const { register, formState: {errors}, reset, watch } = useForm()
    const { updateFormData, currentStep, userSelectedLocation } = useAddForm()
    const { venues } = useMain()
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
            if (userSelectedLocation !== null) {
                let newlySelectedPlaceId = userSelectedLocation.place_id
                console.log(newlySelectedPlaceId)
                if (venues.venues) {
                    venues.venues.forEach((venue) => {
                        if (venue.place_id === newlySelectedPlaceId) {
                            currentStep('redundant')
                        } else {
                            updateFormData(userSelectedLocation)
                            currentStep('map')
                        }
                    })
                }
            }
            setTriggerSubmit(false)
            reset()
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