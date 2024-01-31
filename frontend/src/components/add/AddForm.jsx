import React from 'react'
import VenueForm from './forms/venueForm/VenueForm'
import MapForm from './forms/mapForm/MapForm'
import ImageForm from './forms/imageForm/ImageForm'
import DetailsForm from './forms/detailsForm/DetailsForm'
import SummaryForm from './forms/summaryForm/SummaryForm'

// only allow access to this page if the user is authenticated -- here
// fetch venues
// if currentVenue is in venues then only allow the details and summary form
// if currentVenue is not in the venues table then all full form
// fetch reviews by venue and user
// if good then populate the answers with the answers from the review
// if not good then leave form as is

function AddForm() {

  return (
    <>
        <div id="addFormContainer">
            <div id="venueFormWrapper">
                <VenueForm />
            </div>
            <div id="mapFormWrapper">
                <MapForm />
            </div>
            <div id="imageFormWrapper">
                <ImageForm />
            </div>
            <div id="detailsFormWrapper">
                <DetailsForm />
            </div>
            <div id="summaryFormWrapper">
                <SummaryForm />
            </div>
        </div>
    </>
  )
}

export default AddForm