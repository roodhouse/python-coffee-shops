import React from 'react'
import StoreHeading from '../../storeShared/StoreHeading'
import SpaceResults from './space/SpaceResults'

function SpaceStats({current, page, data, reviewId}) {

  return (
    <>
        <div id={`spaceStatsContainer-${page}`}>
            <div id={`spaceStatsHeadingWrapper-${page}`}>
                <StoreHeading page={page} heading={'Space'} />
            </div>
            <div id={`spaceCategoryWrapper-${page}`}>
                <SpaceResults page={page} current={current} data={data} reviewId={reviewId} />
            </div>
        </div>
    </>
  )
}

export default SpaceStats