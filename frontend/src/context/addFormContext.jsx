import React, { useContext, createContext, useState, useEffect } from "react";
import { useMain } from "./main";
import { FaWifi, FaPlug, FaUserClock, FaSquarePen, FaVolumeLow, FaHeadphones, FaLaptop, FaUserGroup, 
    FaMugHot, FaUtensils, FaLeaf, FaMartiniGlass, FaCreditCard, FaSun, FaTree, FaArrowsUpDownLeftRight, FaToiletPaper, FaWheelchair, FaTemperatureFull,
    FaBanSmoking, FaDog, FaCar, FaStar } from "react-icons/fa6";


const AddFormContext = createContext();

const AddFormProvider = ({ children }) => {

    const { setPage, userAuthenticated, userData  } = useMain()
    const [ step, setStep ] = useState('venue')
    const [ formData, setFormData ] = useState({})
    const [ editReview, setEditReview ] = useState(false)

    // select step
    function currentStep(sentStep) {
        setStep(sentStep)
    }

    // update data from forms
    function updateFormData(sentData) {
        setFormData({...formData, ...sentData})
    }

    // useEffect(() => {
    //     aggregateResults()
    // },[])

    async function aggregateResults() {
        // fetch all the reviews first
        const allReviewsRequest = await fetch("http://127.0.0.1:5000/api/reviews", {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })

        if ( allReviewsRequest.ok ) {
            const allReviews = await allReviewsRequest.json()
            
            // now that we have all the reviews we can aggregate the results here and send back to the server 
            let venueCount = {}

            for (let review of allReviews.reviews) {
                let venueName = review.venue
                if (venueCount[venueName]) {
                    venueCount[venueName] += 1
                } else {
                    venueCount[venueName] = 1
                }

            }

            console.log(venueCount)

            let pairedAnswers = []
            let c1 = [], c2 = [], p1 = [], p2 = [], p3 = [], p4 = [], p5 = [], ser1 = [], ser2 = [], ser3 = [], ser4 = [], ser5 = [];
            let sp1 = [], sp2 = [], sp3 = [], sp4 = [], sp5 = [], sp6 = [], sp7 = [], sp8 = [], sp9 = [], sum = [];
            let aggScore = []

            for (let [venue, count] of Object.entries(venueCount)) {

                if (count > 1) {
                    const allReviewsForVenue = []
                    allReviewsForVenue.push(allReviews.reviews.filter(review => review.venue === venue))

                    allReviewsForVenue[0].forEach(review => {
                        Object.keys(review.answers[0]).forEach(key => {
                            let answer = review.answers[0][key] * 100
                            switch (key) {
                                case 'c1':
                                    c1.push(answer)
                                    break;
                                case 'c2':
                                    c2.push(answer)
                                    break;
                                case 'p1':
                                    p1.push(answer)
                                    break;
                                case 'p2':
                                    p2.push(answer)
                                    break;
                                case 'p3':
                                    p3.push(answer)
                                    break;
                                case 'p4':
                                    p4.push(answer)
                                    break;
                                case 'p5':
                                    p5.push(answer)
                                    break;
                                case 'ser1':
                                    ser1.push(answer)
                                    break;
                                case 'ser2':
                                    ser2.push(answer)
                                    break;
                                case 'ser3':
                                    ser3.push(answer)
                                    break;
                                case 'ser4':
                                    ser4.push(answer)
                                    break;
                                case 'ser5':
                                    ser5.push(answer)
                                    break;
                                case 'sp1':
                                    sp1.push(answer)
                                    break;
                                case 'sp2':
                                    sp2.push(answer)
                                    break;
                                case 'sp3':
                                    sp3.push(answer)
                                    break;
                                case 'sp4':
                                    sp4.push(answer)
                                    break;
                                case 'sp5':
                                    sp5.push(answer)
                                    break;
                                case 'sp6':
                                    sp6.push(answer)
                                    break;
                                case 'sp7':
                                    sp7.push(answer)
                                    break;
                                case 'sp8':
                                    sp8.push(answer)
                                    break;
                                case 'sp9':
                                    sp9.push(answer)
                                    break;
                                case 'sum':
                                    sum.push(answer)
                                    break;
                                default:
                                    break;
                            }
                        })
                    })
                } else {
                    const reviewForVenue = allReviews.reviews.find(review => review.venue === venue)
                    try {
                        await fetch('http://127.0.0.1:5000/api/aggregate', {
                            method: 'POST',
                            body: JSON.stringify({
                                name: venue,
                                c1: parseFloat(reviewForVenue.answers[0].c1),
                                c2: parseFloat(reviewForVenue.answers[0].c2),
                                p1: parseFloat(reviewForVenue.answers[0].p1),
                                p2: parseFloat(reviewForVenue.answers[0].p2),
                                p3: parseFloat(reviewForVenue.answers[0].p3),
                                p4: parseFloat(reviewForVenue.answers[0].p4),
                                p5: parseFloat(reviewForVenue.answers[0].p5),
                                p6: parseFloat(reviewForVenue.answers[0].p6),
                                ser1: parseFloat(reviewForVenue.answers[0].ser1),
                                ser2: parseFloat(reviewForVenue.answers[0].ser2),
                                ser3: parseFloat(reviewForVenue.answers[0].ser3),
                                ser4: parseFloat(reviewForVenue.answers[0].ser4),
                                ser5: parseFloat(reviewForVenue.answers[0].ser5),
                                sp1: parseFloat(reviewForVenue.answers[0].sp1),
                                sp2: parseFloat(reviewForVenue.answers[0].sp2),
                                sp3: parseFloat(reviewForVenue.answers[0].sp3),
                                sp4: parseFloat(reviewForVenue.answers[0].sp4),
                                sp5: parseFloat(reviewForVenue.answers[0].sp5),
                                sp6: parseFloat(reviewForVenue.answers[0].sp6),
                                sp7: parseFloat(reviewForVenue.answers[0].sp7),
                                sp8: parseFloat(reviewForVenue.answers[0].sp8),
                                sp9: parseFloat(reviewForVenue.answers[0].sp9),
                                sum: parseFloat(reviewForVenue.answers[0].sum)
                            }),
                            headers: {'Content-Type': 'application/json'}
                        })
                    }
                    catch (error) {
                        console.error("An unexpected error occurred", error)
                        alert("An unexpected error occurred")
                    }
                    // update venue with lone sum score
                    const encodedName = encodeURIComponent(venue)
                        try {
                            await fetch(`http://127.0.0.1:5000/api/venues/${encodedName}`, {
                                method: 'PUT',
                                body: JSON.stringify({
                                    rating: reviewForVenue.answers[0].sum
                                }),
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${localStorage.getItem('id_token')}`
                                }
                            })
                        }
                        catch (error) {
                            console.error("An unexpected error occurred", error)
                            alert("An unexpected error occurred")
                        } 
                }

                pairedAnswers = [c1, c2, p1, p2, p3, p4, p5, ser1, ser2, ser3, ser4, ser4, ser5, sp1, sp2, sp3, sp4, sp5, sp6, sp7, sp8, sp9, sum]
                aggScore = pairedAnswers.map(answers => {
                    let sumOfAnswers = answers.reduce((acc, val) => acc + val, 0)
                    return (sumOfAnswers / answers.length) / 100
                })
                       
                try {
                        await fetch('http://127.0.0.1:5000/api/aggregate', {
                        method: 'POST',
                        body: JSON.stringify({
                            name: venue,
                            c1: aggScore[0],
                            c2: aggScore[1],
                            p1: aggScore[2],
                            p2: aggScore[3],
                            p3: aggScore[4],
                            p4: aggScore[5],
                            p5: aggScore[6],
                            p6: aggScore[7],
                            ser1: aggScore[8],
                            ser2: aggScore[9],
                            ser3: aggScore[10],
                            ser4: aggScore[11],
                            ser5: aggScore[12],
                            sp1: aggScore[13],
                            sp2: aggScore[14],
                            sp3: aggScore[15],
                            sp4: aggScore[16],
                            sp5: aggScore[17],
                            sp6: aggScore[18],
                            sp7: aggScore[19],
                            sp8: aggScore[20],
                            sp9: aggScore[21],
                            sum: aggScore[22]
                        }),
                        headers: {'Content-Type': 'application/json'}
                    })
                }
                catch (error) {
                    console.error("An unexpected error occurred", error)
                    alert("An unexpected error occurred")
                }
                const encodedName = encodeURIComponent(venue)
                try {
                    await fetch(`http://127.0.0.1:5000/api/venues/${encodedName}`, {
                        method: 'PUT',
                        body: JSON.stringify({
                            rating: aggScore[22]
                        }),
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('id_token')}`
                        }
                    })
                }
                catch (error) {
                    console.error("An unexpected error occurred", error)
                    alert("An unexpected error occurred")
                }
            }

        } else {
            console.error("Error fetching all reviews from server", allReviewsRequest.statusText)
            alert("Error fetching all reviews from server")
            return null
        }
    }
 
    const sendToDataBase = async (submission) => {
        // if edit review is false then it is a new review 
        if (!editReview) {
            const venue = submission.venue
            const image = submission.image
            const location = submission.location
            const address = submission.address
            const hours = submission.hours
            // rating should actually come from an aggregate off all reviews
            const rating = parseInt(submission.Summary[0].answer)
            // const answers = submission.answers
            const answers = [
                {
                    'p1' : parseInt(submission.Productivity[0].answer),
                    'p2' : parseInt(submission.Productivity[1].answer),
                    'p3' : parseInt(submission.Productivity[2].answer),
                    'p4' : parseInt(submission.Productivity[3].answer),
                    'p5' : parseInt(submission.Productivity[4].answer),
                    'p6' : parseInt(submission.Productivity[5].answer),
                    'c1' : parseInt(submission.Community[0].answer),
                    'c2' : parseInt(submission.Community[1].answer),
                    'ser1' : parseInt(submission.Service[0].answer),
                    'ser2' : parseInt(submission.Service[1].answer),
                    'ser3' : parseInt(submission.Service[2].answer),
                    'ser4' : parseInt(submission.Service[3].answer),
                    'ser5' : parseInt(submission.Service[4].answer),
                    'sp1' : parseInt(submission.Space[0].answer),
                    'sp2' : parseInt(submission.Space[1].answer),
                    'sp3' : parseInt(submission.Space[2].answer),
                    'sp4' : parseInt(submission.Space[3].answer),
                    'sp5' : parseInt(submission.Space[4].answer),
                    'sp6' : parseInt(submission.Space[5].answer),
                    'sp7' : parseInt(submission.Space[6].answer),
                    'sp8' : parseInt(submission.Space[7].answer),
                    'sp9' : parseInt(submission.Space[8].answer),
                    'sum' : parseInt(submission.Summary[0].answer)
                }
            ]
            
            const user_email = userData.email
            const user_id = userData.user_id
    
            // create review
            async function fetchVenueFromServer() {
                const venueInstanceResponse = await fetch("http://127.0.0.1:5000/api/venues/last", {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'}
                })
    
                if (venueInstanceResponse.ok) {
                    const venueData = await venueInstanceResponse.json()
                    const reviewResponse = await fetch("http://127.0.0.1:5000/api/reviews", {
                        method: 'post',
                        body: JSON.stringify({
                        venue_name: venueData.venues[0].name,
                        answers,
                        user_email
                    }),
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('id_token')}`
                        }
                    })
    
                    if (reviewResponse.ok) {
                            const userResponse = await fetch(`http://127.0.0.1:5000/api/user`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${localStorage.getItem('id_token')}`
                            }
                        })
                        
                        if (userResponse.ok) {
                            const currentUserData = await userResponse.json()
                            const currentReviews = Array.isArray(currentUserData.reviews) ? currentUserData.reviews : []
                            const updatedReviewIds = [ ...currentReviews, venue ]
                            console.log(updatedReviewIds)
                            const updateUserResponse = await fetch(`http://127.0.0.1:5000/api/user/${user_id}`, {
                                method: 'put',
                                body: JSON.stringify({
                                    venue: updatedReviewIds
                                }),
                                headers: {
                                    'Content-Type' : 'application/json',
                                    'Authorization': `Bearer ${localStorage.getItem('id_token')}`
                                }
                            })
                            if (updateUserResponse.ok) {
                                setPage('thankYou')
                                setStep('venue')
                                setFormData({})
                            } else {
                                console.error("Error adding review to user:", updateUserResponse.statusText)
                                alert("Error adding review to user")
                            }
    
                        } else {
                            console.error("Error getting user", userResponse.statusText)
                            alert("Error getting user")
                        }
                        
                    } else {
                        console.error("Error creating review:", reviewResponse.statusText)
                        alert("Error creating review")
                    }
                } else {
                    console.error("Error fetching venue from server", venueInstanceResponse.statusText)
                    alert("Error fetching venue from server")
                    return null
                }
            }
    
            if (userAuthenticated) {
    
                try {
                    // create venue
                    const venueResponse = await fetch("http://127.0.0.1:5000/api/venues/", {
                        method: 'post',
                        body: JSON.stringify({
                            venue,
                            image,
                            location,
                            address,
                            hours,
                            rating
                        }),
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('id_token')}`
                        }
                    })
    
                    if (!venueResponse.ok) {
                        console.error("Error creating venue:", venueResponse.statusText)
                        alert("Error creating venue")
                        return
                    }
    
                    await fetchVenueFromServer()
                    
                    aggregateResults()
                    
                } catch (error) {
                    console.error("An unexpected error occurred", error)
                    alert("An unexpected error occurred")
                }
            } else {
                console.log('error')
            }

        } else {
            
            const updateReviewResponse = await fetch(`http://127.0.0.1:5000/api/reviews/${formData.review_id}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    answers: formData.answers[0]
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('id_token')}`
                }
            })
            if (updateReviewResponse.ok) {
                aggregateResults()
                setPage('thankYou')
                setStep('venue')
                setFormData({})
            } else {
                console.error("Error editing review:", updateReviewResponse.statusText)
                alert("Error editing review")
            }

            setEditReview(false)
        }
    }

     // set edit review 
     function editTheReview(data) {
        setEditReview(data)
        if (data !== false) {
            setPage('suggest')
            setStep('details')
        } else {
            setStep('venue')
        }
    }

    // useEffect(() => {
    //     console.log('edit review from useEffect on editReivew change')
    //     console.log(editReview)
    // },[editReview])

    // Photos from api
    const googlePhotos = ['Photo 1', 'Photo 2', 'Photo 3', 'Photo 4', 'Photo 5', 'Photo 6']

    // Detail Questions
    const detailQuestions = [
        {
            category: 'Productivity',
            questions: [
                {
                    question: 'Is there Wi-Fi?',
                    key: 'p1',
                    label: 'Wi-Fi',
                    icon: <FaWifi />,
                    answers: [
                        {
                            answer: 'No'
                        },
                        {
                            answer: 'Yes, but unstable'
                        },
                        {
                            answer: 'Yes and reliable'
                        }
                    ]
                },
                {
                    question: 'Are power sockets available?',
                    key: 'p2',
                    label: 'Sockets',
                    icon: <FaPlug />,
                    answers: [
                        {
                            answer: 'No (< 10% of seating have power sockets)'
                        },
                        {
                            answer: 'Limited (between 10% and 50% of seating have power sockets)'
                        },
                        {
                            answer: 'Yes (more than 50% of the seating have power sockets'
                        }
                    ]
                },
                {
                    question: 'How long can you comfortably stay and work?',
                    key: 'p3',
                    label: 'Long stays',
                    icon: <FaUserClock />,
                    answers: [
                        {
                            answer: 'While eating or drinking only'
                        },
                        {
                            answer: 'Depends on how busy it is'
                        },
                        {
                            answer: 'As long as needed'
                        }
                    ]
                },
                {
                    question: 'Are tables and chairs ideal for work?',
                    key: 'p4',
                    label: 'Tables',
                    icon: <FaSquarePen />,
                    answers: [
                        {
                            answer: 'No (or very small amount)'
                        },
                        {
                            answer: 'Somewhat'
                        },
                        {
                            answer: 'The seating area is ideal for work'
                        }
                    ]
                },
                {
                    question: 'Is it quiet?',
                    key: 'p5',
                    label: 'Quiet',
                    icon: <FaVolumeLow />,
                    answers: [
                        {
                            answer: 'No'
                        },
                        {
                            answer: 'Depends'
                        },
                        {
                            answer: 'Yes'
                        }
                    ]
                },
                {
                    question: 'Can you comfortably make audio/video calls?',
                    key: 'p6',
                    icon: <FaHeadphones />,
                    label: 'Calls',
                    answers: [
                        {
                            answer: 'No'
                        },
                        {
                            answer: 'Depends'
                        },
                        {
                            answer: 'Yes'
                        }
                    ]
                }
            ]
        },
        {
            category: 'Community',
            questions: [
                {
                    question: 'Is it common to see others working?',
                    key: 'c1',
                    label: 'Work Vibe',
                    icon: <FaLaptop />,
                    answers: [
                        {
                            answer: 'Rarely'
                        },
                        {
                            answer: 'Sometimes'
                        },
                        {
                            answer: 'Always'
                        }
                    ]
                },
                {
                    question: 'Are there group tables (for 6 or more people)?',
                    key: 'c2',
                    label: 'Groups',
                    icon: <FaUserGroup />,
                    answers: [
                        {
                            answer: 'No'
                        },
                        {
                            answer: 'Yes'
                        },
                        {
                            answer: 'Very large tables available'
                        }
                    ]
                }
            ]
        },
        {
            category: 'Service',
            questions: [
                {
                    question: 'Is coffee available?',
                    key: 'ser1',
                    label: 'Coffee',
                    icon: <FaMugHot />,
                    answers: [
                        {
                            answer: 'No'
                        },
                        {
                            answer: 'Yes, but average'
                        },
                        {
                            answer: 'Yes, with high quality'
                        }
                    ]
                },
                {
                    question: 'Is food offered?',
                    key: 'ser2',
                    label: 'Food',
                    icon: <FaUtensils />,
                    answers: [
                        {
                            answer: 'No'
                        },
                        {
                            answer: 'Only small items'
                        },
                        {
                            answer: 'Yes, full meals'
                        }
                    ]
                },
                {
                    question: 'Are there veggies options?',
                    key: 'ser3',
                    label: 'Veggie',
                    icon: <FaLeaf />,
                    answers: [
                        {
                            answer: 'No'
                        },
                        {
                            answer: 'Limited'
                        },
                        {
                            answer: 'Yes, plenty'
                        }
                    ]
                },
                {
                    question: 'Is alcohol offered?',
                    key: 'ser4',
                    label: 'Alcohol',
                    icon: <FaMartiniGlass />,
                    answers: [
                        {
                            answer: 'No'
                        },
                        {
                            answer: 'Small selection'
                        },
                        {
                            answer: 'Yes, full bar'
                        }
                    ]
                },
                {
                    question: 'Are credit cards accepted?',
                    key: 'ser5',
                    label: 'Cards',
                    icon: <FaCreditCard />,
                    answers: [
                        {
                            answer: 'No'
                        },
                        {
                            answer: 'Some'
                        },
                        {
                            answer: 'All'
                        }
                    ]
                },
            ]
        },
        {
            category: 'Space',
            questions: [
                {
                    question: 'Is the space full of natural light?',
                    key: 'sp1',
                    label: 'Light',
                    icon: <FaSun />,
                    answers: [
                        {
                            answer: 'No'
                        },
                        {
                            answer: 'Some areas'
                        },
                        {
                            answer: 'Yes'
                        }
                    ]
                },
                {
                    question: 'Is there an outdoor area?',
                    key: 'sp2',
                    label: 'Outdoor',
                    icon: <FaTree />,
                    answers: [
                        {
                            answer: 'No'
                        },
                        {
                            answer: 'Yes, but no power'
                        },
                        {
                            answer: 'Yes, with power'
                        }
                    ]
                },
                {
                    question: 'How large is the venue?',
                    key: 'sp3',
                    label: 'Spacious',
                    icon: <FaArrowsUpDownLeftRight />,
                    answers: [
                        {
                            answer: 'Small (< 10 tables)'
                        },
                        {
                            answer: 'Medium (between 10 and 30 tables)'
                        },
                        {
                            answer: 'Large (more than 30 tables)'
                        }
                    ]
                },
                {
                    question: 'Is there a restroom?',
                    key: 'sp4',
                    label: 'Restroom',
                    icon: <FaToiletPaper />,
                    answers: [
                        {
                            answer: 'No'
                        },
                        {
                            answer: 'Yes, small'
                        },
                        {
                            answer: 'Yes, large'
                        }
                    ]
                },
                {
                    question: 'Is it easily accessible with a wheelchair?',
                    key: 'sp5',
                    label: 'Accessible',
                    icon: <FaWheelchair />,
                    answers: [
                        {
                            answer: 'No'
                        },
                        {
                            answer: 'Some areas'
                        },
                        {
                            answer: 'Yes'
                        }
                    ]
                },
                {
                    question: 'Is there air conditioning?',
                    key: 'sp6',
                    label: 'A/C',
                    icon: <FaTemperatureFull />,
                    answers: [
                        {
                            answer: 'No'
                        },
                        {
                            answer: 'Indoor Only'
                        },
                        {
                            answer: 'Indoor and Patio'
                        }
                    ]
                },
                {
                    question: 'Is the venue smoke free?',
                    key: 'sp7',
                    label: 'No smoke',
                    icon: <FaBanSmoking />,
                    answers: [
                        {
                            answer: 'No'
                        },
                        {
                            answer: 'Indoor only'
                        },
                        {
                            answer: 'Indoor and outdoor'
                        }
                    ]
                },
                {
                    question: 'Is the venue pet friendly?',
                    key: 'sp8',
                    label: 'Pets',
                    icon: <FaDog />,
                    answers: [
                        {
                            answer: 'No'
                        },
                        {
                            answer: 'Service animals only'
                        },
                        {
                            answer: 'Yes'
                        }
                    ]
                },
                {
                    question: 'Are there parking spaces?',
                    key: 'sp9',
                    label: 'Parking',
                    icon: <FaCar />,
                    answers: [
                        {
                            answer: 'Only on the street'
                        },
                        {
                            answer: 'Limited'
                        },
                        {
                            answer: 'Plentiful'
                        }
                    ]
                },
            ]
        },
        {
            category: 'Summary',
            questions: [
                {
                    question: 'In general, do you like working from here?',
                    key: 'sum',
                    label: 'Summary',
                    icon: <FaStar />,
                    answers: [
                        {
                            answer: 'No'
                        },
                        {
                            answer: 'Sometimes'
                        },
                        {
                            answer: 'Yes'
                        }
                    ]
                }
            ]
        }
    ]

    return <AddFormContext.Provider value = 
    {
        {
            step, currentStep, formData, updateFormData, googlePhotos, detailQuestions, sendToDataBase, editReview, editTheReview
        }
    }>
        {children}
    </AddFormContext.Provider>
};

const useAddForm = () => {
    const addContext = useContext(AddFormContext)
    if (!addContext) {
        throw new Error('useAddForm must be used within a AddFormProvider')
    }
    return addContext
}

export { AddFormProvider, useAddForm}