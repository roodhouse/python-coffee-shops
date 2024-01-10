import React from 'react'
import State from './citiesList/State'
import { useMain } from '../../context/main'

// move loop function here, encompass everything inside of the data coming from main context
// so that states city data inside them

function CitiesList() {

  const { listOfStates } = useMain()

  return (
    <>
        <div id="citiesListContainer">
            { listOfStates.map((stateName) => (
                <div id={stateName.state + 'Wrapper'} key={stateName.state+'Wrapper'} className='mb-8'>
                    <State state={stateName.state} cities={stateName.cities} />
                </div>
            ))}
        </div>
    </>
  )
}

export default CitiesList