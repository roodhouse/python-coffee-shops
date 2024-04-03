import React from 'react'
import { useMain } from '../../../../../../context/main'
import { useDashContext } from '../../../../../../context/dashContext'

function StoreNewComment({toggleComponents}) {

    const { review } = useMain()
    const { handleDeleteCommentFromStore, handleSubmitStoreCommentClick } = useDashContext()

    const handleClick = () => {
        handleSubmitStoreCommentClick(review.review_id)
        toggleComponents()
    }

  return review !== null ? (
    <>
        <div id="storeCommentContainer">
        <textarea
          name={`${review.review_id}-storeEditComment`}
          id={`${review.review_id}-storeEditComment`}
          cols="10"
          rows="5"
          maxLength={100}
          className="w-full mb-8 bg-[#f5f5f5] rounded p-3 text-black"
          defaultValue={review ? (review?.answers?.[0]?.xcom || '') : ''}
          placeholder={`Leave a short comment about ${review.venue}`} 
        ></textarea>
      </div>
      <div id="storeActionContainer" className="flex justify-center">
        <button
          onClick={handleClick}
          id={`${review.review_id}_storeEdit`}
          className="text-white font-bold py-1 px-2 rounded border border-blue bg-blue hover:bg-black hover:border-black hover:text-white mr-2"
        >
          Submit
        </button>
        <button
          id={`${review.review_id}_storeDelete`}
          onClick={() => handleDeleteCommentFromStore('comment', review)}
          className="text-white font-bold py-1 px-2 rounded border border-red bg-red hover:bg-black hover:border-black hover:text-white"
        >
          Delete
        </button>
      </div>
    </>
  ) : (
    ''
  )
}

export default StoreNewComment