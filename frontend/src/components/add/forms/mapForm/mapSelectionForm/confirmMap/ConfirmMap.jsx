import React from 'react'
import { useAddForm } from '../../../../../../context/addFormContext'

function ConfirmMap() {

  const { userSelectedLocation } = useAddForm()
  
  return (
    <>
        <div id="confirmMapContainer">
            <p>{ userSelectedLocation && userSelectedLocation.venue ? userSelectedLocation.venue : ''}</p>
        </div>
    </>
  )
}

export default ConfirmMap