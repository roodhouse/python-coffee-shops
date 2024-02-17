import React from 'react'

// replace with info from db

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