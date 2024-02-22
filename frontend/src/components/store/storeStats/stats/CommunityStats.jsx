import React from 'react'
import StoreHeading from '../../storeShared/StoreHeading'
import CommunityResults from './community/CommunityResults'

function CommunityStats({current}) {
  return (
    <>
        <div id="communityStatsContainer">
            <div id="communityStatsHeaderWrapper">
                <StoreHeading heading={'Community'} />
            </div>
            <div id="communityCategoryWrapper">
                <CommunityResults current={current} />
            </div>
        </div>
    </>
  )
}

export default CommunityStats