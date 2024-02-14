import React from 'react'
import { FaHeartCrack, FaHeart } from "react-icons/fa6";
import { useMain } from '../../../context/main';
import { useAddForm } from '../../../context/addFormContext';
import { ratingChange } from '../../../utils/ratingChange/ratingChange';

function StoreSummaryIcons() {

    const { userAuthenticated, setPage, review } = useMain()
    const { sendResults } = useAddForm()

    let usersOverallRating;
    if (review) {
        usersOverallRating = review.answers[0].sum
    }

    const handleClick = async (e) => {

        if (userAuthenticated) {
            try {
                const submission = await ratingChange(e, review)
                const category = 'single'
                if (submission) {
                    sendResults(submission, category)
                } else {
                    console.error('error in ratingChange')
                }
            } catch (error) {
                console.error(`Error in StoreSummaryIcons: ratingChange`, error)
            }
        } else {
            setPage('join')
        }

    }

  return (
    <>
        <div id="storeSummaryIconsContainer" className='flex justify-evenly text-5xl'>
            <div id="noIconContainer" className={usersOverallRating === 0 ? 'text-red' : 'text-[#ddd]'} onClick={handleClick}>
                <FaHeartCrack />
            </div>
            <div id="sometimesIconContainer" className={usersOverallRating === 1 ? 'text-[#f6D95E]' : 'text-[#ddd]'} onClick={handleClick}>
                <FaHeart />
            </div>
            <div id="yesIconContainer" className={usersOverallRating === 2 ? 'text-green' : 'text-[#ddd]'} onClick={handleClick}>
                <FaHeart />
            </div>
        </div>
    </>
  )
}

export default StoreSummaryIcons