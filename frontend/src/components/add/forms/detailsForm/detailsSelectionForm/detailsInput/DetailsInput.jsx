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
        const newValue = e.target.textContent
        const questionElement = e.target.parentElement.parentElement.firstChild.textContent
        const clickedId = e.target.parentElement.parentElement.id
    
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
                    <div key={catIndex} id={category.category+'Container'} className='mb-2 text-xl'>
                        <div id={category.category+'HeadingContainer'}>
                            <h2>{category.category}</h2>
                        </div>
                        {category.questions.map((question, qIndex) => (
                            <div key={qIndex} id={'questionIcon'+qIndex+'container'}>
                                <div id={qIndex+'Icon'}>
                                    {question.icon}
                                </div>
                                <div id={category.category+'Question'+qIndex}>
                                    <p>{question.question}</p>
                                {question.answers.map((answer, aIndex) => (
                                    <div key={aIndex} id={category.category+'Question'+qIndex+'Answer'+aIndex} onClick={handleClick}>
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