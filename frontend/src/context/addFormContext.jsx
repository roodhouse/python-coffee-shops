import React, { useContext, createContext, useState } from "react";
import { useMain } from "./main";
import { FaWifi, FaPlug, FaUserClock, FaSquarePen, FaVolumeLow, FaHeadphones, FaLaptop, FaUserGroup, 
    FaMugHot, FaUtensils, FaLeaf, FaMartiniGlass, FaCreditCard, FaSun, FaTree, FaArrowsUpDownLeftRight, FaToiletPaper, FaWheelchair, FaTemperatureFull,
    FaBanSmoking, FaDog, FaCar, FaStar } from "react-icons/fa6";


const AddFormContext = createContext();

const AddFormProvider = ({ children }) => {

    const { setPage, userAuthenticated, userData  } = useMain()
    const [ step, setStep ] = useState('venue')
    const [ formData, setFormData ] = useState({})

    // select step
    function currentStep(sentStep) {
        setStep(sentStep)
    }

    // update data from forms
    function updateFormData(sentData) {
        setFormData({...formData, ...sentData})
    }

    async function aggregateResults() {
        // fetch all the reviews first
        const allReviewsRequest = await fetch("http://127.0.0.1:5000/api/reviews", {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })

        if ( allReviewsRequest.ok ) {
            const allReviews = await allReviewsRequest.json()
            console.log(allReviews)

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

            for (let [venue, count] of Object.entries(venueCount)) {
                if (count > 1) {
                    console.log(`need to aggregate data for: ${venue}`)
                    const allReviewsForVenue = []
                    allReviewsForVenue.push(allReviews.reviews.filter(review => review.venue === venue))
                    console.log(allReviewsForVenue)
                    // answer * 100, sum all answers, divide by length of array, divide again by 100
                    // (200+200+200+200+200+100)/6/(100) = 1.83
                    let c1 = []
                    allReviewsForVenue[0].forEach(review => {
                        console.log(review.answers)
                        review.answers[0].forEach(answer => {
                            // trying to pop each answer into an array containing all the answers for that question...
                        })
                        
                    });
                } else {
                    const reviewForVenue = allReviews.reviews.find(review => review.venue === venue)
                    try {
                        await fetch('http://127.0.0.1:5000/api/aggregate', {
                            method: 'POST',
                            body: JSON.stringify({
                                venue_name: venue,
                                c1: reviewForVenue.answers[0].c1,
                                c2: reviewForVenue.answers[0].c2,
                                p1: reviewForVenue.answers[0].p1,
                                p2: reviewForVenue.answers[0].p2,
                                p3: reviewForVenue.answers[0].p3,
                                p4: reviewForVenue.answers[0].p4,
                                p5: reviewForVenue.answers[0].p5,
                                p6: reviewForVenue.answers[0].p6,
                                ser1: reviewForVenue.answers[0].ser1,
                                ser2: reviewForVenue.answers[0].ser2,
                                ser3: reviewForVenue.answers[0].ser3,
                                ser4: reviewForVenue.answers[0].ser4,
                                ser5: reviewForVenue.answers[0].ser5,
                                sp1: reviewForVenue.answers[0].sp1,
                                sp2: reviewForVenue.answers[0].sp2,
                                sp3: reviewForVenue.answers[0].sp3,
                                sp4: reviewForVenue.answers[0].sp4,
                                sp5: reviewForVenue.answers[0].sp5,
                                sp6: reviewForVenue.answers[0].sp6,
                                sp7: reviewForVenue.answers[0].sp7,
                                sp8: reviewForVenue.answers[0].sp8,
                                sp9: reviewForVenue.answers[0].sp9,
                                sum: reviewForVenue.answers[0].sum
                            }),
                            headers: {'Content-Type': 'application/json'}
                        })
                    }
                    catch (error) {
                        console.error("An unexpected error occurred", error)
                        alert("An unexpected error occurred")
                    }
                        
                }
            }

        } else {
            console.error("Error fetching all reviews from server", allReviewsRequest.statusText)
            alert("Error fetching all reviews from server")
            return null
        }
    }

    // ready to test !
    const sendToDataBase = async (submission) => {
        const venue = submission.venue
        const image = submission.image
        const location = submission.location
        const address = submission.address
        const hours = submission.hours
        // rating should actually come from an aggregate off all reviews
        const rating = submission.Summary
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
                'sum' : submission.Summary
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
                    headers: {'Content-Type': 'application/json'}
                })

                if (reviewResponse.ok) {
                        const userResponse = await fetch(`http://127.0.0.1:5000/api/user`, {
                        method: 'GET',
                        headers: {'Content-Type': 'application/json'}
                    })
                    
                    if (userResponse.ok) {
                        const currentUserData = await userResponse.json()
                        const currentReviews = Array.isArray(currentUserData.reviews) ? currentUserData.reviews : []
                        const updatedReviewIds = [ ...currentReviews, venue ]
                        const updateUserResponse = await fetch(`http://127.0.0.1:5000/api/user/${user_id}`, {
                            method: 'put',
                            body: JSON.stringify({
                                venue: updatedReviewIds
                            }),
                            headers: {'Content-Type' : 'application/json'}
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
                    headers: {'Content-Type': 'application/json'}
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
    }

    // Photos from api
    const googlePhotos = ['Photo 1', 'Photo 2', 'Photo 3', 'Photo 4', 'Photo 5', 'Photo 6']

    // Detail Questions
    const detailQuestions = [
        {
            category: 'Productivity',
            questions: [
                {
                    question: 'Is there Wi-Fi?',
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
                    question: 'Is it common to see others working?' ,
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
            step, currentStep, formData, updateFormData, googlePhotos, detailQuestions, sendToDataBase
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