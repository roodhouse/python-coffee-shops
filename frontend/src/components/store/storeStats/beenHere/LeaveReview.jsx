import React from 'react'
import { useMain } from '../../../../context/main'

function LeaveReview() {

    const { userAuthenticated, setPage } = useMain()

    const handleClick = () => {
        if (userAuthenticated) {
            console.log('take to shortened review form')
        } else {
            setPage('join')
        }
    }
  return (
    <>
        <div id="beenHereCopyLeaveReviewContainer" onClick={handleClick}>
            <p>Leave a review</p>
        </div>
    </>
  )
}

export default LeaveReview