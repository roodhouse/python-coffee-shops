import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useAddForm } from '../../../../../../context/addFormContext'
import BackButton from '../../../back/BackButton'
import NextButton from '../../../next/NextButton'

function DetailsInput() { 

    const { register, handleSubmit, formState: {errors} } = useForm()
    const { currentStep, updateFormData, detailQuestions, editReview, editTheReview } = useAddForm()
    const [ currentAnswers, setCurrentAnswers ] = useState({})

    const onSubmit = () => {
        
        // do i need this? make sure it still runs without it
        // if (currentAnswers.Summary[0].answer === 'No') {
        //     currentAnswers.Summary = 0
        // } else if (currentAnswers.Summary[0].answer === 'Sometimes') {
        //     currentAnswers.Summary = 1
        // } else {
        //     currentAnswers.Summary = 2
        // }
        
        currentStep('summary')
        updateFormData(currentAnswers)
    }

    const onError = () => {
        console.log('error in details')
    }

    const handleClick = (e, questionKey, answerIndex) => {
       
        if (e.target.tagName === 'P') {
            const chosenAnswer = 'chosenAnswer' 
            const newValue = e.target.id
            
            const questionElement = e.target.parentElement.parentElement.firstChild.textContent
            const clickedId = e.target.parentElement.parentElement.id
            
            const parentEl = e.target.parentElement.parentElement

            let categoryName = clickedId.split('Q')
            categoryName = categoryName[0]
    
            function removeClass(parentElement, chosenAnswer) {
                const children = parentElement.children
    
                for (let i = 0; i < children.length; i++) {
                    const child = children[i]
                    if (child.classList.contains(chosenAnswer)) {
                        child.classList.remove(chosenAnswer)
                    }
                }
            }
    
            removeClass(parentEl, chosenAnswer)
    
            function addClass(element) {
                element.classList.add(chosenAnswer)
            }
    
            addClass(e.target.parentElement)


            if (!editReview) {
                setCurrentAnswers((prevStates) => ({
                    ...prevStates,
                    [categoryName] : [
                        ...(prevStates[categoryName] || []),
                        {
                            question: questionElement,
                            answer: newValue
                        },
                    ]
                }))
            } else {
                if (questionKey in currentAnswers.answers[0]) {
                    currentAnswers.answers[0][questionKey] = answerIndex
                } else {
                    console.log('nothing to do')
                }
            }

        } else {
            console.log('div click')
        }
    }

    // if edit review is true then set the currentAnswers to the answers in the db
    useEffect(() => {
        if (editReview) {
            setCurrentAnswers(editReview)
        }
    },[editReview])

  return (
    <>
        <div id="detailsInputContainer">
            <form noValidate onSubmit={handleSubmit(onSubmit, onError)}>
                {detailQuestions.map((category, catIndex) => (
                    <div key={catIndex} id={category.category+'Container'} className='mb-2'>
                        <div id={category.category+'HeadingContainer'} className='text-xl font-bold mb-2'>
                            <h2>{category.category}</h2>
                        </div>
                        {category.questions.map((question, qIndex) => (
                            <div key={qIndex} id={'questionIcon'+qIndex+'container'} className='flex items-center w-full mb-8'>
                                <div id={category.category+'Question'+qIndex} className='w-full'>
                                    <p className='flex items-center mb-2 font-["PT_SERIF"]'><span className='mr-3'>{question.icon}</span> <span>{question.question}</span></p>
                                {question.answers.map((answer, aIndex) => (
                                    <div className={`mb-2 ml-7 font-["PT_SERIF"] bg-[#f5f5f5] rounded p-3 ${editReview ? (editReview.answers[0][question.key] === aIndex ? 'chosenAnswer' : '') : '' }`} data-question-key={editReview ? question.key : ''} key={aIndex} id={category.category+'Question'+qIndex+'Answer'+aIndex} onClick={(e) => handleClick(e, question.key, aIndex)}>
                                        <p id={aIndex}>{answer.answer}</p>
                                    </div>
                                ))}
                                </div>
                                <input className='inputValue' type="hidden" value='' {...register(`${category.category}-${qIndex}`)} />
                            </div>
                        ))}
                    </div>
                ))}
                <div id="detailInputButtonContainer" className='flex justify-between'>
                    <div id="detailInputBackButtonWrapper">
                        <BackButton back={'image'} />
                    </div>
                    <div id="detailSubmitWrapper" className='bg-blue rounded py-4 px-16 flex justify-center cursor-pointer text-center text-white border border-blue hover:bg-white hover:text-black'>
                        <NextButton name={'detailSubmitButton'} id={'detailSubmitButton'} />
                    </div>
                </div>
            </form>
        </div>
    </>
  )
}

export default DetailsInput