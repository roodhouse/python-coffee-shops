import React from 'react'
import AddForm from './add/AddForm'
import { useAddForm } from '../context/addFormContext'
import NewReviewCopy from './newReview/NewReviewCopy'
import NewReviewForm from './newReview/NewReviewForm'

function NewReview() {

  const { step } = useAddForm()

  return (
    <>
        <div id="newReviewContainer">
            <div id="addCopyWrapper" className='mb-8'>
                <NewReviewCopy />
            </div>
             
            <div id="newReviewFormWrapper" style={ step === 'details' || step === 'summary' ? {marginBottom: 0} : {marginBottom: '253px'}}>
                <NewReviewForm />
            </div>
        </div>
    </>
  )
}

export default NewReview