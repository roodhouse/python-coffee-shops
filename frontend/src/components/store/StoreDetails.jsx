import React from 'react'
import StoreHours from './storeDetails/StoreHours'
import StoreLocation from './storeDetails/StoreLocation'
import Divider from '../shared/divider/Divider'

function StoreDetails() {
  return (
    <>
      <div id="storeDetailsContainer" className='font-["PT_SERIF"]'>
        <div id="storeHoursWrapper" className='mb-9'>
          <StoreHours />
        </div>
        <div id="storeLocationWrapper">
          <StoreLocation />
        </div>
        <div><Divider /></div>
      </div>
    </>
  )
}

export default StoreDetails