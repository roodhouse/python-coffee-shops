import React from 'react'
import CommentDate from './CommentDate'
import CommentBody from './CommentBody'
import Avatar from '../../../../shared/avatar/Avatar'

function WithSingleComment({date, comment, pic, user, userId, seeAllReviews}) {
  return (
    <>
        <div id={`withSingleCommentContainer`} className='font-["PT_SERIF"]'>
          <div id={`singleCommentDateWrapper`}>
            <CommentDate date={date} />
          </div>
          <div id={`singleCommentBodyWrapper`}>
            <CommentBody comment={comment} />
          </div>
          <div id={`singleCommentAvatarWrapper`}>
            <Avatar
              align={"justify-end"}
              display={"flex"}
              name={"comment"}
              pic={pic}
              user={user}
              userId={userId}
              index={0}
              comment={true}
              amount={'single'}
              seeAllReviews={seeAllReviews}
            />
          </div>
        </div>
    </>
  )
}

export default WithSingleComment