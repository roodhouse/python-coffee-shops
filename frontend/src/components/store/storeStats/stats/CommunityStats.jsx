import React from 'react'
import StoreHeading from '../../storeShared/StoreHeading'
import CommunityResults from './community/CommunityResults'

function CommunityStats({current, page, data, reviewId}) {
  return (
    <>
        <div id={`communityStatsContainer-${page}`}>
            <div id={`communityStatsHeaderWrapper-${page}`}>
                <StoreHeading page={page} heading={'Community'} />
            </div>
            <div id={`communityCategoryWrapper-${page}`}>
                <CommunityResults page={page} current={current} data={data} reviewId={reviewId} />
            </div>
        </div>
    </>
  )
}

export default CommunityStats