import React from 'react'
import { useAddForm } from '../../../../context/addFormContext'
import AddFormTitle from '../title/AddFormTitle'
import MapSelectionForm from './mapSelectionForm/MapSelectionForm'

function MapForm() {

  const { step } = useAddForm()

  return (
    <>
      <div id="mapFormContainer">
          <div id="mapTitleWrapper" style={ step === 'map' ? {opacity: 1} : {opacity: .25}}>
                  <AddFormTitle section={'Confirm Location'} />
              </div>
              <div id="mapSelectionFormWrapper" style={ step === 'map' ? {display: 'block'} : {display: 'none'}} className='mb-8'>
                  <MapSelectionForm />
              </div>
      </div>
    </>
  )
}

export default MapForm