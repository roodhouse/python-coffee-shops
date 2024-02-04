import React from 'react'
import { useAddForm } from '../../context/addFormContext'

function EditReview({review}) {

    const { editTheReview } = useAddForm()

    const handleClick = () => {
        editTheReview(review)
        // send user to review form that has their answers pulled in already, all editing of just the answers portion,
        // update all of it (user review, aggregate) and recall the aggregate function and user
        // return user to venue page on submit.. or send them to a confirm page and redirect after a few seconds
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