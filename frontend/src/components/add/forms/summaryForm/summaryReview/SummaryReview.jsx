import React from 'react'
import { useAddForm } from '../../../../../context/addFormContext'

function SummaryReview() {

  const { formData } = useAddForm()

  return (
    <>
      <div id="summaryReviewContainer" className='font-["PT_SERIF"]'>
        <div id="imageSummaryContainer" className='mb-4'>
          <img src={formData.image} alt="summary venue" />
          </div>
          <div id="venueSummaryContainer" className='mb-4'>
            <p>
              <span className='font-bold'>Venue: </span>
              <span>{formData.name}</span>
            </p>
          </div>
          <div id="locationSummaryContainer" className='mb-4'>
            <p>
              <span className='font-bold'>Location: </span>
              <span>{formData.address}</span>
            </p>
          </div>
          <div id="productivitySummaryContainer" className='mb-4'>
            <div id="productivityTitleContainer" className='font-bold mb-1'>
              <h2>Productivity:</h2>
            </div>
            {formData.Productivity && Array.isArray(formData.Productivity) ? (
                formData.Productivity.map((response, index) => (
                  <p key={index} className='mb-[2px]'>
                    <span>{response.question} </span>
                    <span className='italic'>{response.answer}</span>
                  </p>
                ))
            ) : (
              <p>No responses for productivity category</p>
            )}
            
          </div>
          <div id="communitySummaryContainer" className='mb-4'>
            <div id="communityTitleContainer" className='font-bold mb-1'>
              <h2>Community:</h2>
            </div>
            {formData.Community && Array.isArray(formData.Community) ? (
                formData.Community.map((response, index) => (
                  <p key={index} className='mb-[2px]'>
                    <span>{response.question} </span>
                    <span className='italic'>{response.answer}</span>
                  </p>
                ))
            ) : (
              <p>No responses for community category</p>
            )}
          </div>
          <div id="serviceSummaryContainer" className='mb-4'>
            <div id="serviceTitleContainer" className='font-bold mb-1'>
              <h2>Service:</h2>
            </div>
            {formData.Service && Array.isArray(formData.Service) ? (
                formData.Service.map((response, index) => (
                  <p key={index} className='mb-[2px]'>
                    <span>{response.question} </span>
                    <span className='italic'>{response.answer}</span>
                  </p>
                ))
            ) : (
              <p>No responses for service category</p>
            )}
          </div>
          <div id="spaceSummaryContainer" className='mb-4'>
            <div id="spaceTitleContainer" className='font-bold mb-1'>
              <h2>Space:</h2>
            </div>
            {formData.Space && Array.isArray(formData.Space) ? (
                formData.Space.map((response, index) => (
                  <p key={index} className='mb-[2px]'>
                    <span>{response.question} </span>
                    <span className='italic'>{response.answer}</span>
                  </p>
                ))
            ) : (
              <p>No responses for space category</p>
            )}
          </div>
          <div id="summarySummaryContainer" className='mb-4'>
            <div id="summaryTitleContainer" className='font-bold mb-1'>
              <h2>Summary:</h2>
            </div>
            {formData.Summary && Array.isArray(formData.Summary) ? (
                formData.Summary.map((response, index) => (
                  <p key={index} className='mb-[2px]'>
                    <span>{response.question} </span>
                    <span className='italic'>{response.answer}</span>
                  </p>
                ))
            ) : (
              <p>No responses for summary category</p>
            )}
          </div>
      </div>
    </>
  )
}

export default SummaryReview