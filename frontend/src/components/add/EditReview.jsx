import React from 'react'
import { useAddForm } from '../../context/addFormContext'

function EditReview({review}) {

    const { editTheReview } = useAddForm()

    const handleClick = () => {
        editTheReview(review)
    }

  return (
    <>
        <div id="beenHereCopyEditReviewContainer" data-name='editReview' onClick={handleClick}>
            <p>Edit your review</p>
        </div>
    </>
  )
}

export default EditReview