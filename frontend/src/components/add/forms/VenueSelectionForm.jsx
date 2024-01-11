import React from 'react'
import { useForm } from 'react-hook-form'
import { useAddForm } from '../../../context/addFormContext'
import VenueInput from './venueForm/VenueInput'

function VenueSelectionForm() {

    const { register, handleSubmit, formState: {errors} } = useForm()
    const { step, formData, updateFormData } = useAddForm()

    console.log(step)
    console.log(formData)

    const onSubmit = (data) => {
        updateFormData(data)
    }

    const onError = () => {
        console.log('big time error')
    }

  return (
    <>
        <div id="venueSelectionFormContainer">
            <form noValidate onSubmit={handleSubmit(onSubmit, onError)}>
                <div id="venueInputWrapper">
                    <VenueInput register={register} errors={errors}/>
                </div>
            </form>
        </div>
    </>
  )
}

export default VenueSelectionForm