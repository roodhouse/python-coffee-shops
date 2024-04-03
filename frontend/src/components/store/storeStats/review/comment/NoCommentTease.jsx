import React, { useState } from 'react'
import { useMain } from '../../../../../context/main'
import StoreNewComment from './storeNewComment/StoreNewComment'


// here ! need to figure out what the equal to review, reviewData, index and heading are compared to what they are while on the dashboard
// does not close when leaving view, if click on site name then error is thrown, will not submit
// toggle comment is not changing some part of state and causing an error when the header is clicked
function NoCommentTease({count}) {

    const [ addComment, setAddComment ] = useState(false)
    const [ kids, setKids ] = useState()

    const { userAuthenticated, currentVenue, setPage } = useMain()

    let hideOriginal;

    console.log(count)

    let toggleComponents = () => {
        setAddComment(false)
        if (count === 1) {
            kids.forEach((kid) => {
                kid.classList.remove('hidden')
            })
        }
        setKids()
        if (count === 2) {
            let commentTeaseStyle = document.getElementById('withCommentTeaseWrapper')
            commentTeaseStyle.classList.remove('mt-[2.25rem]')
        }
    }

    const handleClick = (count, event) => {
        if (!userAuthenticated) {
            setPage('join')
        } else {
            setAddComment(true)
            if (count === 1) {
                let parentContainer = event.currentTarget.parentElement.parentElement
                hideOriginal = Array.from(parentContainer.children).slice(0,3)
                setKids(hideOriginal)
                hideOriginal.forEach((child) => {
                    child.classList.add('hidden')
                })
            } else if (count === 2) {
                let commentTeaseStyle = document.getElementById('withCommentTeaseWrapper')
                commentTeaseStyle.classList.add('mt-[2.25rem]')
            }
        }
    }
    
  return (
    <>
        { addComment ? (
            <StoreNewComment toggleComponents={toggleComponents} mt={true} />
        ) : (
             count === 0 ? (
            <div id="noCommentContainer" className='underline cursor-pointer' onClick={(event) => handleClick(count, event)}>
                <p>Leave a comment about {currentVenue}</p>
            </div>
            ) : (
                count === 1 ? (
                    <div id="storeEditCommentContainer" onClick={(event) => handleClick(count, event)} className='cursor-pointer underline text-right mt-1'>
                        <p>Edit your comment</p>
                    </div>
                ) : (
                    count === 4 ? (
                        <div id="noCommentLoggedOutContainer" className='underline cursor-pointer' onClick={(event) => handleClick(count, event)}>
                            <p>Leave a comment.</p>
                        </div>
                    ) : ''
                )
            )
        )}
    </>
  )
}

export default NoCommentTease