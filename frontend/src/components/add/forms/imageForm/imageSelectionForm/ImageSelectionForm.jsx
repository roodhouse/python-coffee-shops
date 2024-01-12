import React from 'react'
import { useForm } from 'react-hook-form'
import { useAddForm } from '../../../../../context/addFormContext'
import ImageInput from './imageInput/ImageInput'

function ImageSelectionForm() {

    const { register, handleSubmit, setValue, formState: {errors} } = useForm()
    const { currentStep, updateFormData } = useAddForm()

    const onSubmit = (data) => {
        updateFormData(data)
        currentStep('details')
    }

    const onError = () => {
        console.log('error in image')
    }

  return (
    <>
        <div id="imageSelectionFormContainer">
            <form noValidate onSubmit={handleSubmit(onSubmit, onError)}>
                <div id="imageInputWrapper">
                    <ImageInput register={register} errors={errors} setValue={setValue} />
                </div>
            </form>
        </div>
    </>
  )
}

export default ImageSelectionForm