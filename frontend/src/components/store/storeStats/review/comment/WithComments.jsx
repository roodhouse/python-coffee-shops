import React from 'react'
import Avatar from '../../../../shared/avatar/Avatar'
import CommentDate from './withComments/CommentDate'
import CommentBody from './withComments/CommentBody'

function WithComments({review, index, seeAllReviews}) {
  return (
    <>
        <div
              id={`${index}withCommentContainer`}
              key={index}
              className='font-["PT_SERIF"]'
            >
              <div id={`${index}CommentDateWrapper`}>
                <CommentDate date={review.date} />
              </div>
              <div id={`${index}CommentBodyWrapper`}>
                <CommentBody comment={review.answers[0].xcom} />
              </div>
              <div id={`${index}commentAvatarWrapper`}>
                <Avatar
                  align={"justify-end"}
                  display={"flex"}
                  name={"comment"}
                  pic={review.avatar}
                  user={review.user_email}
                  userId={review.user_id}
                  index={index}
                  comment={true}
                  amount={'multiple'}
                  seeAllReviews={seeAllReviews}
                />
              </div>
            </div>
    </>
  )
}

export default WithComments