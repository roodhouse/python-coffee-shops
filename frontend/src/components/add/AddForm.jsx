import React from 'react'
import VenueForm from './forms/venueForm/VenueForm'
import MapForm from './forms/mapForm/MapForm'
import ImageForm from './forms/imageForm/ImageForm'
import DetailsForm from './forms/detailsForm/DetailsForm'
import SummaryForm from './forms/summaryForm/SummaryForm'

// read article on multi step form
// search for venue
    // style venue
    // set up and style multi step form 
// confirm with map
// choose picture
    // stuck here with the option and select ! here !!!
// clear button
// next button

// confirm screen

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