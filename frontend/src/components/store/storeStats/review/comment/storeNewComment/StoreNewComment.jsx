import React, { useState, useEffect } from 'react'
import { useMain } from '../../../../../../context/main'
import { useDashContext } from '../../../../../../context/dashContext'

function StoreNewComment({toggleComponents, mt, formTrigger}) {

    const { review, currentVenueData } = useMain()
    const { handleDeleteCommentFromStore, handleSubmitStoreCommentClick } = useDashContext()
    const [ showForm, setShowForm ] = useState(false)

    const handleClick = () => {
        review ? handleSubmitStoreCommentClick(review.review_id) : handleSubmitStoreCommentClick('newComment')
        toggleComponents()
    }

    useEffect(() => {
      review !== null || formTrigger === true ? setShowForm(true) : setShowForm(false)
    },[formTrigger, review])

    console.log(showForm, currentVenueData)


  return showForm ? (
    <>
        <div id="storeCommentContainer">
        <textarea
          name={review ? `${review.review_id}-storeEditComment` : 'newComment-storeEditComment'}
          id={review ? `${review.review_id}-storeEditComment` : 'newComment-storeEditComment'}
          cols="10"
          rows="5"
          maxLength={100}
          className={`${mt ? 'mt-9' : '' } w-full mb-8 bg-[#f5f5f5] rounded p-3 text-black`}
          defaultValue={review ? (review?.answers?.[0]?.xcom || '') : ''}
          placeholder={`Leave a short comment about ${currentVenueData.venue}`} 
        ></textarea>
      </div>
      <div id="storeActionContainer" className="flex justify-center">
        <button
          onClick={handleClick}
          id={review ? `${review.review_id}_storeEdit` : 'newComment-storeEditComment'}
          className="text-white font-bold py-1 px-2 rounded border border-blue bg-blue hover:bg-black hover:border-black hover:text-white mr-2"
        >
          Submit
        </button>
        <button
          id={review ? `${review.review_id}_storeDelete` : 'newComment-storeEditComment'}
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