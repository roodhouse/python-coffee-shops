import React, { useContext, createContext, useState, useEffect } from "react";
import { useMain } from "./main";
import { useAddForm } from "./addFormContext";
import { deleteReview } from "../utils/deleteReview/deleteReview";
import { updateUser } from "../utils/sendToDatabase/userAPI/UserAPI";
import { aggregateResults } from "../utils/aggregateResults/aggregateResults";


const DashboardContext = createContext()

const DashProvider = ({children}) => {
    const { userData, home, setVenue, setCity, setPage, aggDataUpdated } = useMain()
    const { sendResults } = useAddForm()
    const [ venueReviews, setVenueReviews ] = useState(null)
    const [ editResponse, setEditResponse ] = useState(null)
    const [ currentAnswers, setCurrentAnswers ] = useState()
    const [ currentComment, setCurrentComment ] = useState(null)
    const [ tableHeadings, setTableHeadings ] = useState(['ID', 'Venue', 'Location', 'Actions']) 

    useEffect(() => {
        console.log(userData)
        if ( home === 'dash' ) {
            if ( userData && userData.review_content ) {
                if ( userData.review_content.length > 0 ) {
                    setVenueReviews(userData.review_content)
                    // Dynamically add Comment and/or Rating headings if needed
                    updateTableHeadings(userData.review_content)
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

    const updateTableHeadings = (reviews) => {
        const baseHeadings = ['ID', 'Venue', 'Location', 'Actions']
        const hasXcom = reviews.some(review => review.answers && review.answers.xcom)
        const hasSum = reviews.some(review => review.answers && review.answers.sum)

        if (hasXcom) baseHeadings.splice(3, 0, 'Comment')
        if (hasSum) baseHeadings.splice(hasXcom ? 4 : 3, 0, 'Rating')

        setTableHeadings(baseHeadings)
    }

    // handle onClick types --- continue below here!
    const clickType = (heading, reviewData, event, id) => {
        switch (heading) {
            case 'ID':
                return
            case 'Venue':
                return handleVenueClick(reviewData)
            case 'Location':
                return handleLocationClick(reviewData)
            case 'Rating':
                return
            case 'Comment':
                return handleCommentClick(reviewData, event, id)
            case 'Actions':
                return ''
            default:
                return
        }

    }

    // onClick functions
    // venue click
    const handleVenueClick = (reviewData) => {
        setVenue(reviewData)
      }
    
      // location click
      const handleLocationClick = (reviewData) => {
        setCity(reviewData)
      }

      // comment click
      const handleCommentClick = (reviewData, event, id) => {
        console.log(reviewData)
        if (event.target.closest('#commentContainer')) {
            return
        }
        
        if ( currentComment === reviewData ) {
            setCurrentComment(null)
        } else {
            setCurrentComment(reviewData)
            console.log(venueReviews)
            const reviewIndex = venueReviews.findIndex(review => review.review_id === id)
            setCurrentAnswers(venueReviews[reviewIndex].answers)
        }
      }

      // handle submit of comment click
      const handleSubmitCommentClick = (reviewId) => {
        const commentValue = document.getElementById(`${reviewId}-editComment`).value
        let category = 'singleDash'
        currentAnswers.xcom = commentValue
        let submission = currentAnswers
        sendResults(submission, category, reviewId)
      }

      // review edit button click
      const handleEditClick = (reviewId) => {
        if ( editResponse === reviewId ) {
            setEditResponse(null)
        } else {
            setEditResponse(reviewId)
            const reviewIndex = venueReviews.findIndex(review => review.review_id === reviewId)
            setCurrentAnswers(venueReviews[reviewIndex].answers)
        }
      }

      // review delete button click
      const handleDelete = async (data, review) => {
        let reviewId = review.review_id
        if (data === 'comment') {
            // delete comment
           review.answers.xcom = ''
           let submission = review.answers
           let category = 'singleDash'
           sendResults(submission, category, reviewId)
        } else if (data === 'full') {
            try {
                // delete entire review
                let delRev = await deleteReview(reviewId)
                if (delRev) {
                    let type = data
                    try {
                        // update user review array
                        let userUpdate = await updateUser(userData.user_id, review.venue_name, type)
                        if (userUpdate) {
                            try {
                                // rerun aggregate results
                                let aggUpdate = aggregateResults()
                                if (aggUpdate) {
                                    aggDataUpdated(true)
                                }
                            } catch (error) {
                                console.error('Error aggregating results', error)
                            }
                        }
                    } catch (error) {
                        console.error('Error updating user', error)
                    }
                }
            } catch(error) {
                console.error('Error deleting review', error)
            }
        }
      }

    return <DashboardContext.Provider value =
        {
            {
                venueReviews, setVenueReviews, editResponse, currentAnswers, currentComment, tableHeadings, clickType, handleEditClick, handleDelete, handleSubmitCommentClick
            }
        }>
            {children}
        </DashboardContext.Provider>
}

const useDashContext = () => {
    const dashContext = useContext(DashboardContext)
    if (!dashContext) {
        throw new Error('useDashContext must me used within a DashProvider')
    }
    return dashContext
}

export { DashProvider, useDashContext }