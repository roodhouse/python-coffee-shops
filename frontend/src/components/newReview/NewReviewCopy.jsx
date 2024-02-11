import React from 'react'
import NewReviewTitle from './newReviewCopy/NewReviewTitle'
import NewReviewText from './newReviewCopy/NewReviewText'

function NewReviewCopy() {

    return (
      <>
          <div id="newReviewCopyContainer">
              <div id="newReviewTitleWrapper" className='mb-8'>
                  <NewReviewTitle />
              </div>
              <div id="newReviewTextWrapper">
                  <NewReviewText />
              </div>
          </div>
      </>
    )
}

export default NewReviewCopy