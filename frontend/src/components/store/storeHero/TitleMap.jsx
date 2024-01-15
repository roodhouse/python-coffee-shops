import React from 'react'
import StoreTitle from './storeTitle/StoreTitle'
import StoreMap from './storeMap/StoreMap'

function TitleMap() {
  return (
    <>
        <div id="storeTitleMapContainer" className='flex justify-between items-center'>
            <div id="storeTitleWrapper">
                <StoreTitle />
            </div>
            <div id="storeMapWrapper" className='pl-3'>
                <StoreMap />
            </div>
        </div>
    </>
  )
}

export default TitleMap