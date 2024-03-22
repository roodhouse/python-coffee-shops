import React from 'react'
import City from './City'

function State({state, cities}) {
  console.log(state, cities)

  return (
    <>
        <div id={state+'Container'} key={state+'Inner'}>
          <div id={state+'Name'} className='text-2xl uppercase tracking-wider font-bold text-center mb-4'>
            <p>{state}</p>
          </div>
          <div id={state+'CityNames'} className='flex justify-around flex-wrap'>
            { cities.map((cityName) => (
                <div id={cityName + 'Wrapper'} key={cityName+'Wrapper'} className='cursor-pointer mb-4'>
                    <City city={cityName} />
                </div>
              ))}
          </div>
        </div>
    </>
  )
}

export default State