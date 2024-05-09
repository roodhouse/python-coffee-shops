import React from 'react'
import { useAddForm } from '../../../../context/addFormContext'
import { useMain } from '../../../../context/main'

function RedundantVenue() {

  const { step, userSelectedLocation, currentStep, onLocationSelect } = useAddForm()
  const { setVenue, setPage } = useMain()

  const handleClick = (action) =>  {
    if (action === 'view') {
      setVenue(userSelectedLocation.place_id, userSelectedLocation.name)
    } else {
      setPage('suggest')
    }
    currentStep('venue')
    onLocationSelect(null)
  }

  return (
    <div id='redundantVenueContainer' className='border border-black p-2' style={ step === 'redundant' ? {display: 'block'} : {display: 'none'}}>
      <p className='mb-1 text-center'>{`It looks like this location of ${userSelectedLocation.name} is already listed.`}</p>
      <p>Click <span onClick={() => handleClick('view')} className='underline font-bold text-blue'>here</span> to view it or choose a <span onClick={() => handleClick('new')} className='underline font-bold text-blue'>new venue</span>.</p>
    </div>
  )
}

export default RedundantVenue