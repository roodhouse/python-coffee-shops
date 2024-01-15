import React from 'react'
import ProductivityStats from './stats/ProductivityStats'
import CommunityStats from './stats/CommunityStats'
import ServiceStats from './stats/ServiceStats'
import SpaceStats from './stats/SpaceStats'
import Divider from '../../shared/divider/Divider'

function Stats() {
  return (
    <>
        <div id="statsContainer">
            <div id="statsProductivityWrapper">
                <ProductivityStats />
            </div>
            <div><Divider /></div>
            <div id="statsCommunityWrapper">
                <CommunityStats />
            </div>
            <div><Divider /></div>
            <div id="statsServiceWrapper">
                <ServiceStats />
            </div>
            <div><Divider /></div>
            <div id="statsSpaceWrapper">
                <SpaceStats />
            </div>
            <div><Divider /></div>
        </div>
    </>
  )
}

export default Stats