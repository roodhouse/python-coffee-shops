import React from 'react'
import ProductivityStats from './stats/ProductivityStats'
import CommunityStats from './stats/CommunityStats'
import ServiceStats from './stats/ServiceStats'
import SpaceStats from './stats/SpaceStats'
import Divider from '../../shared/divider/Divider'
import { useMain } from '../../../context/main'
import findUserReview from '../../../utils/miscFunctions/findUserReview'

function Stats({page, data, reviewId}) {

    const { userData, currentVenueData } = useMain()

    const userReview = findUserReview(userData, currentVenueData)
    let currentProductivity = null
    let currentCommunity = null
    let currentService = null
    let currentSpace = null

    if (userReview && page === 'storePage') {
        if (userReview) {
            currentProductivity = [userReview.answers[0].p1, userReview.answers[0].p2, userReview.answers[0].p3, userReview.answers[0].p4, userReview.answers[0].p5, userReview.answers[0].p6]
            currentCommunity = [userReview.answers[0].c1, userReview.answers[0].c2]
            currentService = [userReview.answers[0].ser1, userReview.answers[0].ser2, userReview.answers[0].ser3, userReview.answers[0].ser4, userReview.answers[0].ser5]
            currentSpace = [userReview.answers[0].sp1, userReview.answers[0].sp2, userReview.answers[0].sp3, userReview.answers[0].sp4, userReview.answers[0].sp5, userReview.answers[0].sp6, userReview.answers[0].sp7, userReview.answers[0].sp8, userReview.answers[0].sp9]
        } 
    } else {
        if (data !== null) {
            currentProductivity = [data.p1, data.p2, data.p3, data.p4, data.p5, data.p6]
            currentCommunity = [data.c1, data.c2]
            currentService = [data.ser1, data.ser2, data.ser3, data.ser4, data.ser5]
            currentSpace = [data.sp1, data.sp2, data.sp3, data.sp4, data.sp5, data.sp6, data.sp7, data.sp8, data.sp9]
        }
    }

  return (
    <>
        <div id={`statsContainer-${page}`}>
            <div id={`statsProductivityWrapper-${page}`}>
                <ProductivityStats current={currentProductivity} page={page} data={data} reviewId={reviewId} />
            </div>
            <div><Divider marginTop={0} /></div>
            <div id={`statsCommunityWrapper-${page}`}>
                <CommunityStats current={currentCommunity} page={page} data={data} reviewId={reviewId} />
            </div>
            <div><Divider marginTop={0} /></div>
            <div id={`statsServiceWrapper-${page}`}>
                <ServiceStats current={currentService} page={page} data={data} reviewId={reviewId} />
            </div>
            <div><Divider marginTop={0} /></div>
            <div id={`statsSpaceWrapper-${page}`}>
                <SpaceStats current={currentSpace} page={page} data={data} reviewId={reviewId} />
            </div>
            <div><Divider marginTop={0} /></div>
        </div>
    </>
  )
}

export default Stats