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
        // this data should come from api not hard coded
        updateFormData(
            {
                location: 'google link here', 
                address: 'address here', 
                hours: [
                    {
                        'Sun': [
                            {
                                'open': '5am',
                                'close': '8pm'
                            }
                        ],
                        'Mon': [
                            {
                                'open' : '5am',
                                'close' : '8pm'
                            }
                        ],
                        'Tues': [
                            {
                                'open' : '5am',
                                'close' : '8pm'
                            }
                        ],
                        'Wed': [
                            {
                                'open' : '5am',
                                'close' : '8pm'
                            }
                        ],
                        'Thurs': [
                            {
                                'open' : '5am',
                                'close' : '8pm'
                            }
                        ],
                        'Fri': [
                            {
                                'open' : '5am',
                                'close' : '8pm'
                            }
                        ],
                        'Sat': [
                            {
                                'open' : '5am',
                                'close' : '8pm'
                            }
                        ],
                    }
                ] 
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