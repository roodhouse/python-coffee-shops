import React from 'react'
import StoreHeading from '../storeShared/StoreHeading'
import Avatar from '../../shared/avatar/Avatar'
import Divider from '../../shared/divider/Divider'
import { useMain } from '../../../context/main'
import EditReview from '../../add/EditReview'
import LeaveReview from './beenHere/LeaveReview'

function BeenHere() {

  const { review } = useMain()

  return (
    <>
        <div id="beenHereContainer">
            <div id="beenHereWrapper">
                <StoreHeading heading={'Been Here'} />
            </div>
            <div id="beenHereAvatarWrapper" className='mb-5'>
                <Avatar />
            </div>
            <div id="beenHereCopyWrapper" className='underline'>
                {review ? (
                    <EditReview review={review} />
                ) : (
                    <LeaveReview />
                )}
            </div>
            <div id="beenHereDividerWrapper">
                <Divider />
            </div>
        </div>
    </>
  )
}

export default BeenHere