import React from 'react'
import TimeIcon from '../../home/places/placesCard/placesDetails/placeEssentials/placeHours/TimeIcon'

// NEED replace loop here with loop that goes through the hours api

const hoursOfOperation = [
    {
        day: 'Sun',
        hours: '6am - 8pm'
    },
    {
        day: 'Mon',
        hours: '6am - 8pm'
    },
    {
        day: 'Tues',
        hours: '6am - 8pm'
    },
    {
        day: 'Wed',
        hours: '6am - 8pm'
    },
    {
        day: 'Thurs',
        hours: '6am - 8pm'
    },
    {
        day: 'Fri',
        hours: '6am - 8pm'
    },
    {
        day: 'Sat',
        hours: '6am - 8pm'
    }
]


function StoreHours() {
  return (
    <>
        <div id="storeHoursContainer" className='flex items-center'>
            <div id="hoursIconWrapper" className='mr-14'>
                <TimeIcon />
            </div>
            <div id="hoursContainer" className='w-full mr-10'>
                { hoursOfOperation.map((day) => (
                    <>
                        <div id={day.day + 'DayHourContainer'} className='flex justify-between'>
                            <div id={day.day + 'DayContainer'} className=''>
                                {day.day}
                            </div>
                            <div id={day.day + 'HourContainer'}>
                                {day.hours}
                            </div>
                        </div>
                    </>
                ))}
            </div>
        </div>
    </>
  )
}

export default StoreHours