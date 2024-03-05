import React, { useState, useEffect } from 'react'
import { useMain } from '../../../context/main';
import { FaFaceSmile, FaFaceMeh, FaFaceFrown } from "react-icons/fa6";
import Stats from '../../store/storeStats/Stats';
import Divider from '../../shared/divider/Divider';

function DashVenueTable() {

    const { userData, home, setVenue, setCity } = useMain()
    const [ venueReviews, setVenueReviews ] = useState(null)
    const [ editResponse, setEditResponse ] = useState(null)
    const [ currentAnswers, setCurrentAnswers ] = useState()
    const [ currentComment, setCurrentComment ]= useState(null)

    useEffect(() => {
        if ( home === 'dash' ) {
            if ( userData && userData.review_content ) {
                if ( userData.review_content.length > 0 ) {
                    setVenueReviews(userData.review_content)
                } else {
                    setVenueReviews([])
                }
            } else {
                console.error('There was an error with userData')
            }
        } else {
            setEditResponse(null)
            setCurrentComment(null)
        }
    },[home, userData])

  const handleEditClick = (reviewId) => {
    if ( editResponse === reviewId ) {
        setEditResponse(null)
    } else {
        setEditResponse(reviewId)
        const reviewIndex = venueReviews.findIndex(review => review.review_id === reviewId)
        setCurrentAnswers(venueReviews[reviewIndex].answers)
    }
  }

  const handleDelete = () => {
    console.log('delete click')
  }

  const handleVenueClick = (data) => {
    setVenue(data)
  }

  const handleLocationClick = (data) => {
    setCity(data)
  }

  const handleCommentClick = (data) => {
    console.log(data)
    setCurrentComment(data)

  }

  return (
    <>
        <div id="dashVenueTableContainer">
            {
                venueReviews ? (
            <div id="ordersTableContainer">
                <table className='min-w-full border-collapse block md:table'>
                    <thead className='block md:table-header-group'>
                        <tr className='border border-deepOrange md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative'>
                            <th className='bg-black p-2 md:text-center text-white font-bold md:border-deepOrange text-left block md:table-cell'>ID</th>
                            <th className='bg-black p-2 md:text-center text-white font-bold md:border-deepOrange text-left block md:table-cell'>Venue</th>
                            <th className='bg-black p-2 md:text-center text-white font-bold md:border-deepOrange text-left block md:table-cell'>Location</th>
                            {
                                 venueReviews.map(review => review.answers.xcom) && (
                                    <th className='bg-black p-2 md:text-center text-white font-bold md:border-deepOrange text-left block md:table-cell'>Comment</th>
                                ) 
                            }

                            {
                                venueReviews.map(review => review.answers.sum) && (
                                    <th className='bg-black p-2 md:text-center text-white font-bold md:border-deepOrange text-left block md:table-cell'>Rating</th>
                                )
                            }
                            <th className='bg-black p-2 md:text-center text-white font-bold md:border-deepOrange text-left block md:table-cell'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='block md:table-row-group'>
                        {venueReviews.map((review, index) => (
                            <tr key={review.review_id} id={review.review_id} className={`${index % 2 === 0 ? 'bg-almostWhite text-black' : 'bg-[#4c4c4c] text-white'} ${index === venueReviews.length -1 ? 'border-b' : 'border-b-0'} border border-black md:border-none block md:table-row`}>
                                <td className='p-2 text-left md:text-center block md:table-cell'><span className='inline-block w-1/3 md:hidden font-bold'>Review</span><span className='cursor-pointer hover:text-deepOrange'>{review.review_id}</span></td>
                                <td onClick={() => handleVenueClick(review.venue_name)} className='p-2 text-left md:text-center block md:table-cell'><span className='inline-block w-1/3 md:hidden font-bold'>Venue</span>{review.venue_name}</td>
                                <td onClick={() => handleLocationClick(review.venue_location)} className='p-2 text-left md:text-center block md:table-cell'><span className='inline-block w-1/3 md:hidden font-bold'>Location</span>{review.venue_location}</td>
                               
                                {/* here code is not working */}
                                { review.answers.xcom ? (
                                    <td onClick={() => handleCommentClick(review.answers.xcom)} className='p-2 text-left md:text-center block md:table-cell'>
                                        <span className='inline-block w-1/3 md:hidden font-bold'>Comment</span>{review.answers.xcom ? review.answers.xcom : review.answers.xcom && currentComment !== null ? (
                                        <div id="commentContainer">
                                            <textarea name={`${review.review_id}Comment`} id={`${review.review_id}Comment`} cols="10" rows="5" maxLength={100} className='w-full mb-8 bg-[#f5f5f5] rounded p-3'>{review.answers.xcom}</textarea>
                                        </div>
                                    ) : ''}</td>

                                ) : '' }

                                { review.answers.sum ? (
                                    <td style={{ color: review.answers.sum === 0 ? 'red' : review.answers.sum === 1 ? '#f6D95E' : 'green'}} className='flex items-center text-2xl p-2 text-left md:text-center md:table-cell'><span style={{ color: index % 2 === 0 ? 'black' : 'white'}} className='text-black text-base inline-block w-1/3 md:hidden font-bold'>Rating</span>
                                        {
                                            review.answers.sum === 0 ? (
                                                <FaFaceFrown />
                                    ) : review.answers.sum === 1 ? (
                                                <FaFaceMeh />
                                    ) : (
                                        <FaFaceSmile />
                                    )}</td>
                                ) : ''}
                                
                                <td className={editResponse ? 'flex flex-col p-2 text-left md:text-center md:table-cell' : 'flex flex-row p-2 text-left md:text-center md:table-cell'}>
                                    {
                                        editResponse === review.review_id && (
                                            <>
                                                <div id={`dashStatsDivider-${index}`}>
                                                    <Divider />
                                                </div>
                                                <div id={`dashStatsWrapper-${index}`}>
                                                    <Stats page={'dashPage'} data={currentAnswers} reviewId={editResponse} />
                                                </div>
                                            </>
                                        )
                                    }
                                    <div id='actionWrapper' className={editResponse ? `mb-9 flex items-center w-full` : `flex items-center w-full`}>
                                        <span className='inline-block w-1/3 md:hidden font-bold'>Actions</span>
                                        <div id='actionContainer' className='flex justify-center'>
                                            <button onClick={() => handleEditClick(review.review_id)} id={`${review.review_id}_edit`} className='text-white font-bold py-1 px-2 rounded border border-blue bg-blue hover:bg-black hover:border-black hover:text-white mr-2'>{ editResponse === review.review_id ? 'Done' : 'Edit' }</button>
                                            <button id={`${review.review_id}_delete`} onClick={handleDelete} className='text-white font-bold py-1 px-2 rounded border border-red bg-red hover:bg-black hover:border-black hover:text-white'>Delete</button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
                ) : ''
            }
        </div>
    </>
  )
}

export default DashVenueTable