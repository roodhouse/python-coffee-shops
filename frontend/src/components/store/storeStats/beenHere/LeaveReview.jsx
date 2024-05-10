import React from 'react'
import { useMain } from '../../../../context/main'
import { useAddForm } from '../../../../context/addFormContext'

function LeaveReview() {

    const { userAuthenticated, setPage, setHistory, home, currentVenue } = useMain()
    const { newReviewExistingVenue } = useAddForm()

    const handleClick = () => {
        if (userAuthenticated) {
            newReviewExistingVenue()
        } else {
            setHistory([home, currentVenue])
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