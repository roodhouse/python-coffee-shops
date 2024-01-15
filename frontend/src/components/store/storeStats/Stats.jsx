import React from 'react'
import ProductivityStats from './stats/ProductivityStats'
import CommunityStats from './stats/CommunityStats'
import ServiceStats from './stats/ServiceStats'
import SpaceStats from './stats/SpaceStats'

function Stats() {
  return (
    <>
        <div id="statsContainer">
            <div id="statsProductivityWrapper">
                <ProductivityStats />
            </div>
            <div id="statsCommunityWrapper">
                <CommunityStats />
            </div>
            <div id="statsServiceWrapper">
                <ServiceStats />
            </div>
            <div id="statsSpaceWrapper">
                <SpaceStats />
            </div>
        </div>
    </>
  )
}

export default Stats