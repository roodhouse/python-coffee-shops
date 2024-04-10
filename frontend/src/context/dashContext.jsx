import React, { useContext, createContext, useState, useEffect } from "react";
import { useMain } from "./main";
import { useAddForm } from "./addFormContext";
import { deleteReview } from "../utils/deleteReview/deleteReview";
import { updateUser } from "../utils/sendToDatabase/userAPI/UserAPI";
import { aggregateResults } from "../utils/aggregateResults/aggregateResults";


const DashboardContext = createContext()

const DashProvider = ({children}) => {
    const { userData, home, setVenue, setCity, setPage, aggDataUpdated, review } = useMain()
    const { sendResults } = useAddForm()
    const [ venueReviews, setVenueReviews ] = useState(null)
    const [ editResponse, setEditResponse ] = useState(null)
    const [ currentAnswers, setCurrentAnswers ] = useState()
    const [ currentComment, setCurrentComment ] = useState(null)
    const [ tableHeadings, setTableHeadings ] = useState(['ID', 'Venue', 'Location', 'Actions']) 

    useEffect(() => {
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

    // handle onClick types
    const clickType = (heading, reviewData, event, id, place_id) => {
        switch (heading) {
            case 'ID':
                return
            case 'Venue':
                return handleVenueClick(reviewData, place_id)
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
    const handleVenueClick = (reviewData, place_id) => {
        console.log(reviewData)
        setVenue(place_id)
      }
    
      // location click
      const handleLocationClick = (reviewData) => {
        setCity(reviewData)
      }

      // comment click
      const handleCommentClick = (reviewData, event, id) => {
        if (event.target.closest('#commentContainer')) {
            return
        }
        
        if ( currentComment === reviewData ) {
            setCurrentComment(null)
        } else {
            setCurrentComment(reviewData)
            const reviewIndex = venueReviews.findIndex(review => review.review_id === id)
            setCurrentAnswers(venueReviews[reviewIndex].answers)
        }
      }

      // handle submit of comment click from dash
      const handleSubmitCommentClick = (reviewId) => {
        const commentValue = document.getElementById(`${reviewId}-editComment`).value
        let category = 'singleDash'
        currentAnswers.xcom = commentValue
        let submission = currentAnswers
        sendResults(submission, category, reviewId)
      }

      // handle submit of comment click from store page
      const handleSubmitStoreCommentClick = (reviewId) => {
          const commentValue = document.getElementById(`${reviewId}-storeEditComment`).value

        if (reviewId === 'newComment') {
            console.log(reviewId)
            // this is a new review submission with only a comment
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
            questionsAnswers[0]['xcom'] = commentValue
            let submission = questionsAnswers
            let category = 'simpleRateNew'
            sendResults(submission, category)
        } else {
            let category = 'singleStore'
            review.answers[0].xcom = commentValue
            let submission = review.answers[0]
            sendResults(submission, category, reviewId)
        }
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

      // review delete button click from dash
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

       // review delete button click from dash
       const handleDeleteCommentFromStore = async (data, review) => {
        let reviewId = review.review_id
        console.log(review)
        if (data === 'comment') {
            // delete comment
           review.answers.xcom = null
           let submission = review.answers
           let category = 'singleStore'
           sendResults(submission, category, reviewId)
        } 
      }

    return <DashboardContext.Provider value =
        {
            {
                venueReviews, setVenueReviews, editResponse, currentAnswers, currentComment, tableHeadings, clickType, handleEditClick, handleDelete, handleSubmitCommentClick, handleSubmitStoreCommentClick, handleDeleteCommentFromStore
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