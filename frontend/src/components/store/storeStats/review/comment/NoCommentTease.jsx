import React, { useState } from 'react'
import { useMain } from '../../../../../context/main'
import CommentData from '../../../../dashboard/dashTable/dashTableBody/dashTableRow/dashTableData/tableData/data/CommentData'


// here ! need to figure out what the equal to review, reviewData, index and heading are compared to what they are while on the dashboard
function NoCommentTease() {

    const { userAuthenticated, currentVenue, setPage } = useMain()
    const [ addComment, setAddComment ] = useState(false)

    const handleClick = () => {
        if (!userAuthenticated) {
            setPage('join')
        } else {
            setAddComment(true)
        }
    }
  return (
    <>
        { addComment ? (
            <CommentData />
        ) : (
        <div id="noCommentContainer" className='underline cursor-pointer' onClick={handleClick}>
            <p>Leave a comment about {currentVenue}</p>
        </div>

        )}
    </>
  )
}

export default NoCommentTease