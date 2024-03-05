import React, { useContext, createContext, useState, useEffect } from "react";
import { useMain } from "./main";

const DashboardContext = createContext()

const DashProvider = ({children}) => {
    const { userData, home, setVenue, setCity } = useMain()
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

    // handle onClick types --- continue below here!
    const clickType = (heading, reviewData, event) => {
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
                return handleCommentClick(reviewData, event)
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
      const handleCommentClick = (reviewId, event) => {
        if (event.target.closest('#commentContainer')) {
            return
        }
        
        if ( currentComment === reviewId ) {
            setCurrentComment(null)
        } else {
            setCurrentComment(reviewId)
            const reviewIndex = venueReviews.findIndex(review => review.review_id === reviewId)
            setCurrentAnswers(venueReviews[reviewIndex].answers)
        }
      }

    return <DashboardContext.Provider value =
        {
            {
                venueReviews, setVenueReviews, editResponse, currentAnswers, currentComment, tableHeadings, clickType
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