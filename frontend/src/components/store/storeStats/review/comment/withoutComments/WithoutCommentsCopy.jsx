import React from 'react'
import { useMain } from '../../../../../../context/main'
import { useAddForm } from '../../../../../../context/addFormContext'

function WithoutCommentsCopy() {

    const { userAuthenticated, setPage } = useMain()
    const { newReviewExistingVenue } = useAddForm()

    const handleClick = () => {
        if (userAuthenticated) {
            newReviewExistingVenue()
        } else {
            setPage('join')
        }
    }

  return (
    <>
        <div id="withoutCommentsCopyContainer" className='underline' onClick={handleClick}>
            <p>Be the first to leave a comment</p>
        </div>
    </>
  )
}

export default WithoutCommentsCopy