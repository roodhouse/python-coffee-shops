import React from 'react'

function CommentBody({comment}) {
  return (
    <>
        <div id="commentBodyContainer">
            <p>{comment}</p>
        </div>
    </>
  )
}

export default CommentBody