import React from 'react'
import City from './City'

function State(props) {

  return (
    <>
        <div id={props.state+'Container'} key={props.state}>
          <div id={props.state+'Name'} className='text-2xl uppercase tracking-wider font-bold text-center mb-4'>
            <p>{props.state}</p>
          </div>
          <div id={props.state+'CityNames'} className='flex justify-around flex-wrap'>
            { props.cities.map((cityName) => (
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