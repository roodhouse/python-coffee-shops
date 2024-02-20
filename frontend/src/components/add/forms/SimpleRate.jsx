import React from 'react'
import { FaRegFaceSmile, FaFaceSmile, FaRegFaceMeh, FaFaceMeh, FaRegFaceFrown, FaFaceFrown } from "react-icons/fa6";
import { useAddForm } from '../../../context/addFormContext';
import { useMain } from '../../../context/main';
import { singleItemRatingChange } from '../../../utils/ratingChange/singleItemRatingChange';

function SimpleRate({type, current, code, toggle}) {

    const { userAuthenticated, setPage, review } = useMain()
    const { sendResults } = useAddForm()

    // have the answers on load, have the face filled for the current answer if there is one,
    // onclick toggle the face color, send update to database 
    // if no review then answers should be sent as empty strings other wise send answers again with new overwritten data
    // change background of element to solid black
    // move the icon into the middle
    // close the element

  const handleClick = (event) => {
    event.stopPropagation()
    if (userAuthenticated) {
        if (review) {
            // when editing review
            const iconParent = event.currentTarget
            let currentItemName = event.currentTarget.getAttribute('data-name')
            let category = 'single'
            let answer =  parseInt(currentItemName.split('-')[1])
            review.answers[0][currentItemName.split('-')[0]] = answer
            let submission = review.answers[0]
            singleItemRatingChange(event, review, type, iconParent, answer, toggle )
            sendResults(submission, category)
        } else {
            // when review is new
            console.log('new review')
        }
    } else {
        setPage('join')
    }
  }

  return (
    <>
        <div id={`${type}-simpleRateContainer`} className='w-full'>
            <div id={`${type}-iconsContainer`} className='w-[95%] h-12 flex text-2xl justify-between items-center border-2 border-[#ddd] rounded-3xl my-2 p-2 transition-colors duration-1000'>
                <div id={`${type}-happyContainer`} data-name={`${code}-2`} className='text-green' onClick={handleClick}>
                    { current === 2 ? (
                        <FaFaceSmile />
                    ) : (
                        <FaRegFaceSmile />
                    )}
                </div>
                <div id={`${type}-midContainer`} data-name={`${code}-1`} className='text-yellowBorder' onClick={handleClick}>
                     { current === 1 ? (
                        <FaFaceMeh />
                    ) : (
                        <FaRegFaceMeh />
                    )}
                </div>
                <div id={`${type}-sadContainer`} data-name={`${code}-0`} className='text-red' onClick={handleClick}>
                    { current === 0 ? (
                        <FaFaceFrown />
                    ) : (
                        <FaRegFaceFrown />
                    )}
                </div>
            </div>
        </div>
    </>
  )
}

export default SimpleRate