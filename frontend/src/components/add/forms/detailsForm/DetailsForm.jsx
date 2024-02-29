import React from 'react'
import { useAddForm } from '../../../../context/addFormContext'
import AddFormTitle from '../title/AddFormTitle'
import DetailsSelectionForm from './detailsSelectionForm/DetailsSelectionForm'

function DetailsForm({ id }) {

    const { step, formData } = useAddForm()

    // if (step === 'details') {
    //     console.log(formData)
    // }

  return (
    <>
        <div id="detailsFormContainer">
            <div id="detailsTitleWrapper" style={ step === 'details' ? {opacity: 1} : {opacity: .25}}>
                <AddFormTitle section={'Details'} />
            </div>
            <div id="detailsSectionFormWrapper" style={ step === 'details' ? {display: 'block'} : {display: 'none'}} className='mb-8'>
                <DetailsSelectionForm id={id} />
            </div>
        </div>
    </>
  )
}

export default DetailsForm