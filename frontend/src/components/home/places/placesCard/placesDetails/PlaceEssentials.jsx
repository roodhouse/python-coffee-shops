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
            {placeIcons.length > 0 ? (
                placeIcons.map((icon) => (
                    <div id={icon.label+'PlaceContainer'}>
                        {icon.icon}
                    </div>
                ))
            ) : ''}
        </div>
    </>
  )
}

export default PlaceEssentials