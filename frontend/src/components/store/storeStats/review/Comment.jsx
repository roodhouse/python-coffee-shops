import React from 'react'
import Avatar from '../../../shared/avatar/Avatar'
import CommentDate from './comment/CommentDate'
import CommentBody from './comment/CommentBody'

function Comment() {
  return (
    <>
        <div id="commentContainer" className='font-["PT_SERIF"]'>
            <div id="commentDateWrapper">
                <CommentDate />
            </div>
            <div id="commentBodyWrapper">
                <CommentBody />
            </div>
            <div id="commentAvatarWrapper">
                <Avatar align={'justify-end'} display={'flex'} name={'comment'}/>
            </div>
        </div>
    </>
  )
}

export default Comment