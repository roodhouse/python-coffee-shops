import React from 'react'

function Hours({ hours }) {

  const d = new Date();
  const currentDay = d.getDay()

  return (
    <>
        <div id="hoursContainer">
            {currentDay === 0 ? (
              <p className='uppercase'>{hours[0].Sun.split(': ')[1]}</p>
            ) : currentDay === 1 ? (
              <p className='uppercase'>{hours[0].Mon.split(': ')[1]}</p>
            ) : currentDay === 2 ? (
              <p className='uppercase'>{hours[0].Tues.split(': ')[1]}</p>
            ) : currentDay === 3 ? (
              <p className='uppercase'>{hours[0].Wed.split(': ')[1]}</p>
            ) : currentDay === 4 ? (
              <p className='uppercase'>{hours[0].Thurs.split(': ')[1]}</p>
            ) : currentDay === 5 ? (
              <p className='uppercase'>{hours[0].Fri.split(': ')[1]}</p>
            ) : currentDay === 6 ? (
              <p className='uppercase'>{hours[0].Sat.split(': ')[1]}</p>
            ) : '' }
        </div>
    </>
  )
}

export default Hours