import React from 'react'
import { useForm } from 'react-hook-form'
import { useAddForm } from '../../../../../context/addFormContext'
import ConfirmMap from './confirmMap/ConfirmMap'
import MapInput from './mapInput/MapInput'

function MapSelectionForm() {
    
    const { register, handleSubmit, formState: {errors} } = useForm()
    const { currentStep } = useAddForm()

    const onSubmit = () => {
        currentStep('image')
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