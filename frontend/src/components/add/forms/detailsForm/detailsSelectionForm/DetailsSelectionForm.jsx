import React from 'react'
import SelectionTitle from './selectionTitle/SelectionTitle'
import DetailsInput from './detailsInput/DetailsInput'

function DetailsSelectionForm({id}) {
  return (
    <>
        <div id="detailsSelectionFormContainer">
            <div id="detailsSelectionFormTitleWrapper" className='mb-4'>
                <SelectionTitle />
            </div>
            <div id="detailsInputWrapper">
                <DetailsInput id={id} />
            </div>
        </div>
    </>
  )
}

export default DetailsSelectionForm