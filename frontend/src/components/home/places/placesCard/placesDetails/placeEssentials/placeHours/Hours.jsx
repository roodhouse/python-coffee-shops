import React from 'react'

function Hours({ hours }) {

  const d = new Date();
  const currentDay = d.getDay()

  return (
    <>
        <div id="hoursContainer">
            {currentDay === 0 ? (
              <p className='uppercase'>{hours[0].Sun[0].open} - {hours[0].Sun[0].close}</p>
            ) : currentDay === 1 ? (
              <p className='uppercase'>{hours[0].Mon[0].open} - {hours[0].Mon[0].close}</p>
            ) : currentDay === 2 ? (
              <p className='uppercase'>{hours[0].Tues[0].open} - {hours[0].Tues[0].close}</p>
            ) : currentDay === 3 ? (
              <p className='uppercase'>{hours[0].Wed[0].open} - {hours[0].Wed[0].close}</p>
            ) : currentDay === 4 ? (
              <p className='uppercase'>{hours[0].Thurs[0].open} - {hours[0].Thurs[0].close}</p>
            ) : currentDay === 5 ? (
              <p className='uppercase'>{hours[0].Fri[0].open} - {hours[0].Fri[0].close}</p>
            ) : currentDay === 6 ? (
              <p className='uppercase'>{hours[0].Sat[0].open} - {hours[0].Sat[0].close}</p>
            ) : '' }
        </div>
    </>
  )
}

export default Hours