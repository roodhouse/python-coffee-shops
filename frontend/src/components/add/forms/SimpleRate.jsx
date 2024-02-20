import React from 'react'
import { FaRegFaceSmile, FaFaceSmile, FaRegFaceMeh, FaFaceMeh, FaRegFaceFrown, FaFaceFrown } from "react-icons/fa6";
import { useAddForm } from '../../../context/addFormContext';

function SimpleRate({type, current, code}) {

    const { sendResults } = useAddForm()

    // have the answers on load, have the face filled for the current answer if there is one,
    // onclick toggle the face color, send update to database 
    // if no review then answers should be sent as empty strings other wise send answers again with new overwritten data
    // change background of element to solid black
    // move the icon into the middle
    // close the element

  const handleClick = (event) => {
    event.stopPropagation()
    let currentItem = event.currentTarget.getAttribute('data-name')
    let submission = {}
    let category = 'single'
    submission[currentItem.split('-')[0]] = parseInt(currentItem.split('-')[1])
    // need to mimic ratingChange.js and toggle the face color and save new entry into users review if review is true
    // send to db
    sendResults(submission, category)
    // toggle face color
    // change bg of element
    // move icon to the middle
    // close element
  }

  return (
    <>
        <div id={`${type}-simpleRateContainer`} className='w-full'>
            <div id={`${type}-iconsContainer`} className='w-[95%] h-12 flex text-2xl justify-between items-center border-2 border-[#ddd] rounded-3xl my-2 p-2'>
                <div id={`${type}-happyContainer`} data-name={`${code}-2`} className='text-green' onClick={handleClick}>
                    { current === 2 ? (
                        <FaFaceSmile />
                    ) : (
                        <FaRegFaceSmile />
                    )}
                </div>
                <div id={`${type}-midContainer`} data-name={`${code}-1`} className='text-yellow' onClick={handleClick}>
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