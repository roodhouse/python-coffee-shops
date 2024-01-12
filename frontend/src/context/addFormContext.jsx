import React, { useContext, createContext, useState } from "react";
import { FaWifi, FaPlug, FaUserClock, FaSquarePen, FaVolumeLow, FaHeadphones, FaLaptop, FaUserGroup, 
    FaMugHot, FaUtensils, FaLeaf, FaMartiniGlass, FaCreditCard, FaSun, FaTree, FaArrowsUpDownLeftRight, FaToiletPaper, FaWheelchair, FaTemperatureFull,
    FaBanSmoking, FaDog, FaCar, FaStar } from "react-icons/fa6";


const AddFormContext = createContext();

const AddFormProvider = ({ children }) => {
    const [ step, setStep ] = useState('venue')
    const [ formData, setFormData ] = useState({})

    // select step
    function currentStep(sentStep) {
        setStep(sentStep)
    }

    // update data from forms
    function updateFormData(sentData) {
        console.log(sentData)
        setFormData({...formData, ...sentData})
        console.log('form data is...')
    }

    console.log(formData)

    // Photos from api
    const googlePhotos = ['Photo 1', 'Photo 2', 'Photo 3', 'Photo 4', 'Photo 5', 'Photo 6']

    // Detail Questions
    const detailQuestions = [
        {
            category: 'Productivity',
            questions: [
                {
                    question: 'Is there Wi-Fi?',
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
            step, currentStep, formData, updateFormData, googlePhotos, detailQuestions
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