import React from 'react'
import { useAddForm } from '../../../../../context/addFormContext'

function SummaryReview() {

  const { formData } = useAddForm()

  console.log(formData)

  return (
    <>
      <div id="summaryReviewContainer">
        <div id="imageSummaryContainer">
            <p>
              {/* replace with image */}
              {formData.image}
            </p>
          </div>
          <div id="venueSummaryContainer">
            <p>
              <span>Venue: </span>
              <span>{formData.venue}</span>
            </p>
          </div>
          <div id="locationSummaryContainer">
            <p>
              <span>Location: </span>
              <span>{formData.location}</span>
            </p>
          </div>
          <div id="productivitySummaryContainer">
            <div id="productivityTitleContainer">
              <h2>Productivity:</h2>
            </div>
            {formData.Productivity && Array.isArray(formData.Productivity) ? (
                formData.Productivity.map((response, index) => (
                  <p key={index}>
                    <span>{response.question} </span>
                    <span>{response.answer}</span>
                  </p>
                ))
            ) : (
              <p>No responses for productivity category</p>
            )}
            
          </div>
          <div id="communitySummaryContainer">
            <div id="communityTitleContainer">
              <h2>Community:</h2>
            </div>
            {formData.Community && Array.isArray(formData.Community) ? (
                formData.Community.map((response, index) => (
                  <p key={index}>
                    <span>{response.question} </span>
                    <span>{response.answer}</span>
                  </p>
                ))
            ) : (
              <p>No responses for community category</p>
            )}
          </div>
          <div id="serviceSummaryContainer">
            <div id="serviceTitleContainer">
              <h2>Service:</h2>
            </div>
            {formData.Service && Array.isArray(formData.Service) ? (
                formData.Service.map((response, index) => (
                  <p key={index}>
                    <span>{response.question} </span>
                    <span>{response.answer}</span>
                  </p>
                ))
            ) : (
              <p>No responses for service category</p>
            )}
          </div>
          <div id="spaceSummaryContainer">
            <div id="spaceTitleContainer">
              <h2>Space:</h2>
            </div>
            {formData.Space && Array.isArray(formData.Space) ? (
                formData.Space.map((response, index) => (
                  <p key={index}>
                    <span>{response.question} </span>
                    <span>{response.answer}</span>
                  </p>
                ))
            ) : (
              <p>No responses for space category</p>
            )}
          </div>
          <div id="summarySummaryContainer">
            <div id="summaryTitleContainer">
              <h2>Summary:</h2>
            </div>
            {formData.Summary && Array.isArray(formData.Summary) ? (
                formData.Summary.map((response, index) => (
                  <p key={index}>
                    <span>{response.question} </span>
                    <span>{response.answer}</span>
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