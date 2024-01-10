import React from 'react'
import CitiesTitle from './cities/CitiesTitle'
import CitiesList from './cities/CitiesList'

function Cities() {
  return (
    <>
        <div id="citiesContainer">
            <div id="citiesTitleWrapper" className='mb-8'>
                <CitiesTitle />
            </div>
            <div id="citiesListWrapper">
                <CitiesList />
            </div>
        </div>
    </>
  )
}

export default Cities