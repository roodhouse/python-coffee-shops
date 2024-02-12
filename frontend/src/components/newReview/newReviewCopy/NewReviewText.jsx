import React from 'react'
import { useMain } from '../../../context/main'

function NewReviewText() {

    const { currentVenue } = useMain()
  return (
    <>
        <div id="newReviewTextContainer" className='font-["PT_Serif"] leading-7 text-center'>
            <p>Add your review for {currentVenue} below!</p>
        </div>
    </>
  )
}

export default NewReviewText