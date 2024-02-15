import React from 'react'
import BackButton from '../../back/BackButton'
import { useAddForm } from '../../../../../context/addFormContext'

function SummarySubmission() {

    const { formData, editTheReview, sendResults } = useAddForm()

    console.log(`from summary formData is:`)
    console.log(formData)

    const submitReviewForm = () => {
        const category = 'full'
        sendResults(formData, category)
        editTheReview(false)
    }

  return (
    <>
        <div id="summarySubmissionContainer" className='flex justify-between'>
            <div id="summarySubmissionBackButtonWrapper">
                <BackButton back={'details'} />
            </div>
            <div id="summarySubmitButtonContainer" className='bg-blue rounded py-4 px-16 flex justify-center cursor-pointer text-center text-white border border-blue hover:bg-white hover:text-black w-[165px]'>
                <button id='reviewSubmitButton' type='submit' onClick={submitReviewForm}>Submit</button>
            </div>
        </div>
    </>
  )
}

export default SummarySubmission