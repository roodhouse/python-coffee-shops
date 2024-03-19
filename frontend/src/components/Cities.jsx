import React, { useState, useEffect } from 'react'
import CitiesTitle from './cities/CitiesTitle'
import CitiesList from './cities/CitiesList'
import { useMain } from '../context/main'

function Cities() {

  const { home } = useMain()
  const [currentCityStateData, setCurrentCityStateData] = useState(null) // Fixed useState invocation

  useEffect(() => {
    if ( home === 'cities' ) {
      const fetchCityStateData = async () => {
        try {
          const response = await fetch('http://127.0.0.1:5000/api/venues/city', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
          })

          if (response.ok) {
            const data = await response.json();
            setCurrentCityStateData(data); 
          } else {
            setCurrentCityStateData(null);
          }
        } catch (error) {
          console.error('An error occurred trying to get the data', error)
        }
      }
      fetchCityStateData()
    }
  }, [home])

  if (currentCityStateData) {
    console.log(currentCityStateData)
  }

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