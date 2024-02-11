import React from 'react'
import AddForm from './add/AddForm'
import { useAddForm } from '../context/addFormContext'
import NewReviewCopy from './newReview/NewReviewCopy'

function NewReview() {

  const { step } = useAddForm()

  return (
    <>
        <div id="newReviewContainer">
            <div id="addCopyWrapper" className='mb-8'>
                <NewReviewCopy />
            </div>
             {/* here */}
            {/* <div id="addFormWrapper" style={ step === 'details' || step === 'summary' ? {marginBottom: 0} : {marginBottom: '253px'}}>
                <AddForm />
            </div> */}
        </div>
    </>
  )
}

export default NewReview