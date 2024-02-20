import React from 'react'
import ProductivityStats from './stats/ProductivityStats'
import CommunityStats from './stats/CommunityStats'
import ServiceStats from './stats/ServiceStats'
import SpaceStats from './stats/SpaceStats'
import Divider from '../../shared/divider/Divider'
import { useMain } from '../../../context/main'
import findUserReview from '../../../utils/miscFunctions/findUserReview'

function Stats() {

    const { userData, currentVenueData } = useMain()

    const userReview = findUserReview(userData, currentVenueData)
    let currentProductivity = null
    let currentCommunity = null
    let currentService = null
    let currentSpace = null

    if (userReview) {
        if (userReview) {
            currentProductivity = [userReview.answers[0].p1, userReview.answers[0].p2, userReview.answers[0].p3, userReview.answers[0].p4, userReview.answers[0].p5, userReview.answers[0].p6]
            currentCommunity = [userReview.answers[0].c1, userReview.answers[0].c2]
            currentService = [userReview.answers[0].ser1, userReview.answers[0].ser2, userReview.answers[0].ser3, userReview.answers[0].ser4, userReview.answers[0].ser5]
            currentSpace = [userReview.answers[0].sp1, userReview.answers[0].sp2, userReview.answers[0].sp3, userReview.answers[0].sp4, userReview.answers[0].sp5, userReview.answers[0].sp6, userReview.answers[0].sp7, userReview.answers[0].sp8, userReview.answers[0].sp9]
        }
    }

  return (
    <>
        <div id="statsContainer">
            <div id="statsProductivityWrapper">
                <ProductivityStats current={currentProductivity} />
            </div>
            <div><Divider marginTop={0} /></div>
            <div id="statsCommunityWrapper">
                <CommunityStats current={currentCommunity} />
            </div>
            <div><Divider marginTop={0} /></div>
            <div id="statsServiceWrapper">
                <ServiceStats current={currentService} />
            </div>
            <div><Divider marginTop={0} /></div>
            <div id="statsSpaceWrapper">
                <SpaceStats current={currentSpace} />
            </div>
            <div><Divider marginTop={0} /></div>
        </div>
    </>
  )
}

export default Stats