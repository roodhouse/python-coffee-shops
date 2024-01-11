import React from 'react'
import VenueForm from './forms/venueForm/VenueForm'

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

  return (
    <>
        <div id="addFormContainer">
            <div id="venueFormWrapper" className='mb-8'>
                <VenueForm />
            </div>
        </div>
    </>
  )
}

export default AddForm