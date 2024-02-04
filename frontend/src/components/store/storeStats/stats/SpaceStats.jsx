import React from 'react'
import StoreHeading from '../../storeShared/StoreHeading'
import SpaceResults from './space/SpaceResults'

function SpaceStats() {

  return (
    <>
        <div id="spaceStatsContainer">
            <div id="spaceStatsHeadingWrapper">
                <StoreHeading heading={'Space'} />
            </div>
            <div id="spaceCategoryWrapper">
                <SpaceResults />
            </div>
        </div>
    </>
  )
}

export default SpaceStats