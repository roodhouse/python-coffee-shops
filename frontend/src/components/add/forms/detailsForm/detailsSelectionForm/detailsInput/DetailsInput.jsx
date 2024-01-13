import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAddForm } from '../../../../../../context/addFormContext'

function DetailsInput() {

    // how to send currentAnswers upon submit?
    // style form
    // add back and next buttons

    const { register, handleSubmit, formState: {errors} } = useForm()
    const { currentStep, updateFormData, detailQuestions } = useAddForm()
    const [ currentAnswers, setCurrentAnswers ] = useState({})

    const onSubmit = (data) => {
        updateFormData(data)
        currentStep('summary')
    }

    const onError = () => {
        console.log('error in details')
    }

    const handleClick = (e) => {
        const chosenAnswer = 'chosenAnswer'
        const newValue = e.target.textContent
        const questionElement = e.target.parentElement.parentElement.firstChild.textContent
        const clickedId = e.target.parentElement.parentElement.id
        const parentEl = e.target.parentElement.parentElement

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
            // clicking right outside of the element highlights the entire dive
    
            element.classList.add(chosenAnswer)
        }

        addClass(e.target.parentElement)


    
        setCurrentAnswers((prevStates) => ({
            ...prevStates,
            [clickedId] : {
                question: questionElement,
                answer: newValue
            }
        }))
    }

    console.log(currentAnswers)


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
                                        <p>{answer.answer}</p>
                                    </div>
                                ))}
                                </div>
                                <input className='inputValue' type="hidden" value='' {...register(`${category.category}-${qIndex}`)} />
                            </div>
                        ))}
                    </div>
                ))}
            </form>
        </div>
    </>
  )
}

export default DetailsInput