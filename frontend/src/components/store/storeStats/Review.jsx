import React from 'react'
import StoreHeading from '../storeShared/StoreHeading'
import Comment from './review/Comment'
import Divider from '../../shared/divider/Divider'

function Review() {
  return (
    <>
      <div id="reviewContainer">
        <div id="reviewHeadingWrapper">
          <StoreHeading heading={"Reviews"} />
        </div>
        <div id="commentWrapper">
          <Comment />
        </div>
        <div id="reviewDividerWrapper">
          <Divider />
        </div>
      </div>
    </>
  )
}

export default Review