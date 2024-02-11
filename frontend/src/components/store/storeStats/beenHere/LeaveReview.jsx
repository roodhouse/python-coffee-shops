import React from 'react'
import { useMain } from '../../../../context/main'
import { useAddForm } from '../../../../context/addFormContext'

function LeaveReview() {

    const { userAuthenticated, setPage } = useMain()
    const { newReviewExistingVenue } = useAddForm()

    const handleClick = () => {
        if (userAuthenticated) {
            console.log('take to shortened review form')
            newReviewExistingVenue()
            // need to pass the current venue as the name 
            // create form first then connect it to backend
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