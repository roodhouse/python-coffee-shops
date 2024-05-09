import React from 'react' 
import VenueForm from './forms/venueForm/VenueForm'
import MapForm from './forms/mapForm/MapForm'
import ImageForm from './forms/imageForm/ImageForm'
import DetailsForm from './forms/detailsForm/DetailsForm'
import SummaryForm from './forms/summaryForm/SummaryForm'
import RedundantVenue from './forms/redundantReview/RedundantVenue'
import { useMain } from '../../context/main'
import { useAddForm } from '../../context/addFormContext'

function AddForm() {

    const { editReview } = useMain()
    const { step } = useAddForm()
    
  return (
    <>
        { step === 'redundant' ? (
            <div id='redundantVenueWrapper'>
                <RedundantVenue />
            </div>
        ) : (
            <div id="addFormContainer">
        {!editReview ? (
            <>
                <div id="venueFormWrapper">
                    <VenueForm/>
                </div>
                <div id="mapFormWrapper">
                    <MapForm />
                </div>
                <div id="imageFormWrapper">
                    <ImageForm />
                </div>
            </>
            ) : ''}
            <div id="detailsFormWrapper">
                <DetailsForm id={'newVenueForm'} />
            </div>
            <div id="summaryFormWrapper">
                <SummaryForm />
            </div>
        </div>
        )}
        
    </>
  )
}

export default AddForm