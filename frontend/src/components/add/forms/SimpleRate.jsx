import React from 'react'
import { FaRegFaceSmile, FaFaceSmile, FaRegFaceMeh, FaFaceMeh, FaRegFaceFrown, FaFaceFrown } from "react-icons/fa6";
import { useAddForm } from '../../../context/addFormContext';
import { useMain } from '../../../context/main';
import { singleItemRatingChange } from '../../../utils/ratingChange/singleItemRatingChange';

function SimpleRate({type, current, code, toggle}) {

    const { userAuthenticated, setPage, review } = useMain()
    const { sendResults } = useAddForm()

  const handleClick = (event) => {
    event.stopPropagation()
    if (userAuthenticated) {
        const iconParent = event.currentTarget
        let currentItemName = event.currentTarget.getAttribute('data-name')
        let key = currentItemName.split('-')[0]
        let answer =  parseInt(currentItemName.split('-')[1])
        if (review) {
            // when editing review
            review.answers[0][key] = answer
            let submission = review.answers[0]
            let category = 'single'
            singleItemRatingChange(event, type, iconParent, answer, toggle )
            sendResults(submission, category)
        } else {
            // when review is new
            let questionsAnswers = [ 
                {
                'p1' : '',
                'p2' : '',
                'p3' : '',
                'p4' : '',
                'p5' : '',
                'p6' : '',
                'c1' : '',
                'c2' : '',
                'ser1' : '',
                'ser2' : '',
                'ser3' : '',
                'ser4' : '',
                'ser5' : '',
                'sp1' : '',
                'sp2' : '',
                'sp3' : '',
                'sp4' : '',
                'sp5' : '',
                'sp6' : '',
                'sp7' : '',
                'sp8' : '',
                'sp9' : '',
                'sum' : '',
                'xcom': ''
                }
            ]
            questionsAnswers[0][key] = answer
            let submission = questionsAnswers
            let category = 'simpleRateNew'
            singleItemRatingChange(event, type, iconParent, answer, toggle )
            sendResults(submission, category)
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