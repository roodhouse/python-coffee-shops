import React from 'react'
import { useAddForm } from '../../context/addFormContext'
import AddFormTitle from './forms/title/AddFormTitle'
import VenueSelectionForm from './forms/VenueSelectionForm'

// read article on multi step form
// search for venue
    // style venue
    // set up and style multi step form 
// confirm with map
// choose picture
// clear button
// next button

// confirm screen

function AddForm() {

    const { step } = useAddForm()

  return (
    <>
        <div id="addFormContainer">
            <div id="venueTitleWrapper" style={ step === 'venue' ? {opacity: 1} : {opacity: .25}}>
                <AddFormTitle section={'Venue'} />
            </div>
            <div id="venueSelectionFormWrapper">
                <VenueSelectionForm />
            </div>
        </div>
    </>
  )
}

export default AddForm