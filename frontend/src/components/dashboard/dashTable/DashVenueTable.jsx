import React, { useState, useEffect } from 'react'
import { useMain } from '../../../context/main';

function DashVenueTable() {

    const { userData, home, setVenue } = useMain()
    const [ venueReviews, setVenueReviews ] = useState(null)

    // need to replace 'order' below with 'venue' and correctly map the data -- here!

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
        }
    },[home, userData])

  const handleClick = () => {
    console.log('click')
  }

  const handleDelete = () => {
    console.log('delete click')
  }

  const handleVenueClick = (data) => {
    setVenue(data)
  }

  if (venueReviews !== null) {
    console.log(venueReviews)
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
                            { venueReviews.map(review => review.answers.xcom) && (
                                <th className='bg-black p-2 md:text-center text-white font-bold md:border-deepOrange text-left block md:table-cell'>Comment</th>
                            ) }
                            <th className='bg-black p-2 md:text-center text-white font-bold md:border-deepOrange text-left block md:table-cell'>Rating</th>
                            <th className='bg-black p-2 md:text-center text-white font-bold md:border-deepOrange text-left block md:table-cell'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='block md:table-row-group'>
                        {venueReviews.map((review, index) => (
                            <tr key={review.review_id} id={review.review_id} className={`${index % 2 === 0 ? 'bg-almostWhite text-black' : 'bg-charcoal text-offWhite'} border border-deepOrange md:border-none block md:table-row`}>
                                <td onClick={handleClick} className='p-2 text-left md:text-center block md:table-cell'><span className='inline-block w-1/3 md:hidden font-bold'>Review</span><span className='cursor-pointer hover:text-deepOrange'>{review.review_id}</span></td>
                                <td onClick={() => handleVenueClick(review.venue_name)} className='p-2 text-left md:text-center block md:table-cell'><span className='inline-block w-1/3 md:hidden font-bold'>Venue</span>{review.venue_name}</td>
                                <td className='p-2 text-left md:text-center block md:table-cell'><span className='inline-block w-1/3 md:hidden font-bold'>Location</span>{review.venue_location}</td>
                                { review.answers.xcom ? (
                                    <td className='p-2 text-left md:text-center block md:table-cell'><span className='inline-block w-1/3 md:hidden font-bold'>Comment</span>{review.answers.xcom}</td>

                                ) : '' }

                                { review.answers.sum ? (
                                    <td className='p-2 text-left md:text-center block md:table-cell'><span className='inline-block w-1/3 md:hidden font-bold'>Rating</span>{review.answers.sum}</td>
                                ) : ''}
                                
                                <td className='p-2 text-left md:text-center block md:table-cell'>
                                    <span className='inline-block w-1/3 md:hidden font-bold'>Actions</span>
                                    <button onClick={handleClick} id={`${review.review_id}_edit`} className='text-white font-bold py-1 px-2 rounded border border-blue bg-blue hover:bg-black hover:border-black hover:text-white mr-2'>Edit</button>
                                    <button id={`${review.review_id}_delete`} onClick={handleDelete} className='text-white font-bold py-1 px-2 rounded border border-red bg-red hover:bg-black hover:border-black hover:text-white'>Delete</button>
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