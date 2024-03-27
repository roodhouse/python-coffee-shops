import React, { useContext, createContext, useState, useEffect } from "react";
import { useMain } from "./main";
import { sendToDatabase } from "../utils/sendToDatabase/sendToDatabase";
import { aggregateResults } from "../utils/aggregateResults/aggregateResults";
import { FaWifi, FaPlug, FaUserClock, FaSquarePen, FaVolumeLow, FaHeadphones, FaLaptop, FaUserGroup, 
    FaMugHot, FaUtensils, FaLeaf, FaMartiniGlass, FaCreditCard, FaSun, FaTree, FaArrowsUpDownLeftRight, FaToiletPaper, FaWheelchair, FaTemperatureFull,
    FaBanSmoking, FaDog, FaCar, FaStar } from "react-icons/fa6";


const AddFormContext = createContext();

const AddFormProvider = ({ children }) => {

    const { setPage, userAuthenticated, userData, aggDataUpdated, currentVenue, review, currentPlaceId  } = useMain()
    const [ step, setStep ] = useState('venue')
    const [ formData, setFormData ] = useState({})
    const [ editReview, setEditReview ] = useState(false)
    const [ newReviewExistVenue, setNewReviewExistVenue ] = useState(false)
    const [ userSelectedLocation, setUserSelectedLocation ] = useState(null)

    // scroll to top while filling out form
    useEffect(() => {
        window.scrollTo(0,0)
    },[step])

    // select user location
    const onLocationSelect = (place) => {
        setUserSelectedLocation(place)
    }

    // select step
    function currentStep(sentStep) {
        setStep(sentStep)
    }


    // update data from forms
    function updateFormData(sentData) {
        setFormData({...formData, ...sentData})
    }

    // clean up formData at summary
    useEffect(() => {
        if (step === 'summary') {
            delete formData.address_components
            delete formData.formatted_address
            delete formData.geometry
            delete formData.html_attributions
            delete formData.opening_hours
            delete formData.url
            delete formData.photos
        }
    },[formData, step])

    const sendResults = async (submission, category, id) => {
        let simpleRate = false
        let reviewId;
        if (category === 'new') {
            reviewId = ''
        } else if (category === 'simpleRateNew') {
            simpleRate = true
            category = 'new'
            reviewId = ''
            setNewReviewExistVenue(true)
        } else if (category === 'singleDash') {
            simpleRate = true
            reviewId = id
        } else {
            reviewId = review.review_id
        }
        
        const submissionResults = await sendToDatabase(submission, category, editReview, userData, userAuthenticated, reviewId, newReviewExistVenue, currentVenue, simpleRate, currentPlaceId)
        if (submissionResults) {
            const aggSubmission = await aggregateResults()
            if (aggSubmission) {
                if ((category === 'full') || (category === 'new' && simpleRate === false)) {
                    setPage('thankYou')
                    // localStorage.setItem("recentCity", submission.city)
                    // setTimeout(() => {
                    //     // force refresh of app
                    //     window.location.reload()
                    // }, 1000)
                }
                // setStep('venue')
                setFormData({})
                setEditReview(false)
                aggDataUpdated(true) 
                setNewReviewExistVenue(false)
                
                
            } else {
                console.error('Error in sendResults: aggSubmission')
            }
        } else {
            console.error('Error in sendResults: submissionResults')
        }
    }
 
     // set edit review 
     function editTheReview(data) {
        setEditReview(data)
        if (data !== false) {
            setPage('suggest')
            setStep('details')
        } else {
            // setStep('venue')
        }
    }

    function newReviewExistingVenue(){
        setEditReview(false)
        setPage('newReview')
        setStep('details')
        setNewReviewExistVenue(true)
    }

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
            step, currentStep, formData, updateFormData, detailQuestions, editReview, editTheReview, sendResults, newReviewExistingVenue, newReviewExistVenue, onLocationSelect, userSelectedLocation
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

export { AddFormProvider, useAddForm }