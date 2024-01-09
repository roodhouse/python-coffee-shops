import React from 'react'
import TimeIcon from './placeHours/TimeIcon'
import Hours from './placeHours/Hours'

function PlaceHours() {
  return (
    <>
        <div id="placeHoursContainer" className='flex items-center'>
            <div id="timeIconWrapper" className='mr-2'>
                <TimeIcon />
            </div>
            <div id="hoursWrapper">
                <Hours />
            </div>
        </div>
    </>
  )
}

export default PlaceHours