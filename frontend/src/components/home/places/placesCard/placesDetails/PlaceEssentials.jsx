import React from 'react'
import PlaceName from './placeEssentials/PlaceName'
import PlaceLocation from './placeEssentials/PlaceLocation'
import PlaceHours from './placeEssentials/PlaceHours'
import { useMain } from '../../../../../context/main'

function PlaceEssentials() {

  const { placeIcons } = useMain()

  return (
    <>
        <div id="placeEssentialsContainer">
            <div id="placeNameWrapper" className='mb-2'>
                <PlaceName />
            </div>
            <div id="placeHoursWrapper" className='mb-2'>
                <PlaceHours />
            </div>
            <div id="placeLocationWrapper">
                <PlaceLocation margin={'mr-2'} />
            </div>
            <div id="placeFilterIconsContainer" style={placeIcons.length > 0 ? {display: 'flex'} : {display: 'none'}} className=''>
                {placeIcons.length > 0 ? (
                    placeIcons.map((icon) => (
                        <div key={icon.label} id={icon.label+'PlaceContainer'} className='border-2 text-red border-red p-1 rounded mr-2 mt-2'>
                            {icon.icon}
                        </div>
                    ))
                ) : ''}
            </div>
        </div>
    </>
  )
}

export default PlaceEssentials