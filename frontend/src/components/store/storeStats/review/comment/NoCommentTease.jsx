import React, { useState } from 'react'
import { useMain } from '../../../../../context/main'
import StoreNewComment from './storeNewComment/StoreNewComment'


// here ! need to figure out what the equal to review, reviewData, index and heading are compared to what they are while on the dashboard
// does not close when leaving view, if click on site name then error is thrown, will not submit
// toggle comment is not changing some part of state and causing an error when the header is clicked
function NoCommentTease() {

    const [ addComment, setAddComment ] = useState(false)

    const { userAuthenticated, currentVenue, setPage, review } = useMain()

    const handleClick = () => {
        if (!userAuthenticated) {
            setPage('join')
        } else {
            setAddComment(true)
        }
    }

    console.log(review)

  return (
    <>
        { addComment ? (
            // <CommentData review={review} reviewData={'none'} />
            <StoreNewComment  />
        ) : (
        <div id="noCommentContainer" className='underline cursor-pointer' onClick={handleClick}>
            <p>Leave a comment about {currentVenue}</p>
        </div>

        )}
    </>
  )
}

export default NoCommentTease