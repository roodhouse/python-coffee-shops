import React from 'react'
import State from './citiesList/State'

function CitiesList({ currentCityStateData }) {

   let finalStateArray = []

  if (currentCityStateData) {
    const stateArray = Object.entries(currentCityStateData.state)
    stateArray.forEach(([key,value]) => {
    finalStateArray.push(key)
    })
  }

  console.log(currentCityStateData)
  console.log(finalStateArray)

  return (
    <>
        <div id="citiesListContainer">
            { finalStateArray ? (
              finalStateArray.map((state) => (
                <div id={state + 'Wrapper'} key={state} className='mb-8'>
                  <State state={state} cities={currentCityStateData.state[state].city} />
                </div>
              ))
            ) : (
              ''
            )}
        </div>    
    </>
  )
}

export default CitiesList