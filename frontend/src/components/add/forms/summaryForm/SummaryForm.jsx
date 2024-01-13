import React from 'react'
import { useAddForm } from '../../../../context/addFormContext'
import AddFormTitle from '../title/AddFormTitle'
import SummaryCopy from './summaryCopy/SummaryCopy'
import SummaryReview from './summaryReview/SummaryReview'
import SummarySubmission from './summarySubmission/SummarySubmission'

function SummaryForm() {

    const { step } = useAddForm()

  return (
    <>
        <div id="summaryFormContainer">
            <div id="summaryTitleWrapper" style={ step === 'summary' ? {opacity: 1} : {opacity: .25} }>
                <AddFormTitle section={'Summary'} />
            </div>
            <div id="summaryDetailsContainer" style={ step === 'summary' ? {display: 'block'} : {display: 'none'}} className='mb-8'>
                <div id="summaryCopyWrapper">
                    <SummaryCopy />
                </div>
                <div id="summaryReviewWrapper">
                    <SummaryReview />
                </div>
                <div id="summarySubmissionWrapper">
                    <SummarySubmission />
                </div>
            </div>
        </div>
    </>
  )
}

export default SummaryForm