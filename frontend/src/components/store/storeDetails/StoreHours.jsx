import React from 'react'
import TimeIcon from '../../home/places/placesCard/placesDetails/placeEssentials/placeHours/TimeIcon'
import { useMain } from '../../../context/main'

let hoursOfOperation;


function StoreHours() {

    const { currentVenueData } = useMain()

    if ( currentVenueData && currentVenueData.hours ) {
        hoursOfOperation = [
            {
                day: currentVenueData.hours[0].Sun.split(': ')[0],
                hours: currentVenueData.hours[0].Sun.split(': ')[1]
            },
            {
                day: currentVenueData.hours[0].Mon.split(': ')[0],
                hours: currentVenueData.hours[0].Mon.split(': ')[1]
            },
            {
                day: currentVenueData.hours[0].Tues.split(': ')[0],
                hours: currentVenueData.hours[0].Tues.split(': ')[1]
            },
            {
                day: currentVenueData.hours[0].Wed.split(': ')[0],
                hours: currentVenueData.hours[0].Wed.split(': ')[1]
            },
            {
                day: currentVenueData.hours[0].Thurs.split(': ')[0],
                hours: currentVenueData.hours[0].Thurs.split(': ')[1]
            },
            {
                day: currentVenueData.hours[0].Fri.split(': ')[0],
                hours: currentVenueData.hours[0].Fri.split(': ')[1]
            },
            {
                day: currentVenueData.hours[0].Sat.split(': ')[0],
                hours: currentVenueData.hours[0].Sat.split(': ')[1]
            },
        ]
    }

  return (
    <>
        <div id="storeHoursContainer" className='flex items-center'>
            <div id="hoursIconWrapper" className='mr-14'>
                <TimeIcon />
            </div>
            <div id="hoursContainer" className='w-full mr-10'>
                {
                    hoursOfOperation ? (
                         hoursOfOperation.map((day) => (
                            
                                <div key={day.day} id={day.day + 'DayHourContainer'} className='flex justify-between'>
                                    <div id={day.day + 'DayContainer'} className=''>
                                        {day.day}
                                    </div>
                                    <div id={day.day + 'HourContainer'}>
                                        {day.hours}
                                    </div>
                                </div>
                            
                        ))
                    ) : ''
                }
            </div>
        </div>
    </>
  )
}

export default StoreHours