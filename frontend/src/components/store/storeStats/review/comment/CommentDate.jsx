import React from 'react'

// replace with info from db

function CommentDate({date}) {
  return (
    <>
        <div id="commentDataContainer" className='text-sm text-[#bbbbbb]'>
            <p>{date}</p>
        </div>
    </>
  )
}

export default CommentDate