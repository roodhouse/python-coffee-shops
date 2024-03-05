import React from 'react'
import BeenHere from './storeStats/BeenHere'
import Review from './storeStats/Review'
import Stats from './storeStats/Stats'

function StoreStats() {
  return (
    <>
      <div id="storeStatsContainer">
        <div id="beenHereWrapper">
          <BeenHere />
        </div>
        <div id="reviewsWrapper">
          <Review />
        </div>
        <div id="statsWrapper">
          <Stats page={'storePage'} data={null} reviewId={null} />
        </div>
      </div>
    </>
  )
}
 
export default StoreStats