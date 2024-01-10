import React from 'react'
import { useForm } from 'react-hook-form'

// read article on multi step form
// search for venue
// confirm with map
// choose picture
// clear button
// next button

// confirm screen

function AddForm() {

    const { register, handleSubmit, formState: {errors} } = useForm()

    const onSubmit = () => {
        console.log('submit')
    }

    const onError = () => {
        console.log('error')
    }

  return (
    <>
        <div id="addFormContainer">
            <form noValidate onSubmit={handleSubmit(onSubmit, onError)}>

            </form>
        </div>
    </>
  )
}

export default AddForm