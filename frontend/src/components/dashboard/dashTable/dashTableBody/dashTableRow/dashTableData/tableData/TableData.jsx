import React from 'react'
import ActionData from './data/ActionData'
import CommentData from './data/CommentData'
import RatingData from './data/RatingData'

function TableData({review, reviewData, index, heading}) {
    
  return (
    heading === 'Actions' ? (
        <ActionData review={review} reviewData={reviewData} index={index} heading={heading} />
    ) : heading === 'Comment' ?(
        <CommentData review={review} reviewData={reviewData} index={index} heading={heading} />
    ) : heading === 'Rating' ? (
        <RatingData review={review} reviewData={reviewData} index={index} heading={heading} />
    ) : (
        reviewData
    )
  )
}

export default TableData