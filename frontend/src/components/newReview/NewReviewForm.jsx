import React from 'react'
import SummaryForm from '../add/forms/summaryForm/SummaryForm'
import DetailsInput from '../add/forms/detailsForm/detailsSelectionForm/detailsInput/DetailsInput'
import { useAddForm } from '../../context/addFormContext'

function NewReviewForm() {

    const { step } = useAddForm()
  return (
    <>
        <div id="newReviewFormContainer">
            <div id="newReviewDetailsFormWrapper" style={ step === 'details' ? {display: 'block'} : {display: 'none'}} className='mb-8' >
                <DetailsInput id={'newReviewForm'} />
            </div>
            <div id="newReviewSummaryFormWrapper">
                <SummaryForm />
            </div>
        </div>
    </>
  )
}

export default NewReviewForm