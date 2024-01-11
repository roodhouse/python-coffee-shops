import React from 'react'
import { useAddForm } from '../../../../context/addFormContext'
import AddFormTitle from '../title/AddFormTitle'
import VenueSelectionForm from './venueSelectionForm/VenueSelectionForm'

function VenueForm() {

    const { step } = useAddForm()
  return (
    <>
        <div id="venueTitleWrapper" style={ step === 'venue' ? {opacity: 1} : {opacity: .25}}>
                <AddFormTitle section={'Venue'} />
            </div>
            <div id="venueSelectionFormWrapper" style={ step === 'venue' ? {display: 'block'} : {display: 'none'}}>
                <VenueSelectionForm />
            </div>
    </>
  )
}

export default VenueForm