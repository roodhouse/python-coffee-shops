import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAddForm } from '../../../../../../context/addFormContext'
import BackButton from '../../../back/BackButton'
import NextButton from '../../../next/NextButton'

function DetailsInput() {

    const { register, handleSubmit, formState: {errors} } = useForm()
    const { currentStep, updateFormData, detailQuestions } = useAddForm()
    const [ currentAnswers, setCurrentAnswers ] = useState({})

    const onSubmit = () => {
        console.log(currentAnswers)
        if (currentAnswers.Summary[0].answer === 'No') {
            currentAnswers.Summary = 1
        } else if (currentAnswers.Summary[0].answer === 'Sometimes') {
            currentAnswers.Summary = 2
        } else {
            currentAnswers.Summary = 3
        }
        console.log(`after conversion`)
        console.log(currentAnswers)
        currentStep('summary')
        updateFormData(currentAnswers)
    }

    const onError = () => {
        console.log('error in details')
    }

    const handleClick = (e) => {
       
        if (e.target.tagName === 'P') {
            const chosenAnswer = 'chosenAnswer' 
            const newValue = e.target.id
            console.log(newValue)
            const questionElement = e.target.parentElement.parentElement.firstChild.textContent
            const clickedId = e.target.parentElement.parentElement.id
            console.log(clickedId)
            const parentEl = e.target.parentElement.parentElement

            console.log(typeof clickedId)
            let categoryName = clickedId.split('Q')
            categoryName = categoryName[0]

            console.log(categoryName)
    
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
            console.log('div click')
        }
    }

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
                                    <div className='mb-2 ml-7 font-["PT_SERIF"] bg-[#f5f5f5] rounded p-3' key={aIndex} id={category.category+'Question'+qIndex+'Answer'+aIndex} onClick={handleClick}>
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