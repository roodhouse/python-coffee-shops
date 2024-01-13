import React from 'react'
import AddCopy from './add/AddCopy'
import AddForm from './add/AddForm'
import { useAddForm } from '../context/addFormContext'

function Add() {

  const { step } = useAddForm()

  return (
    <>
        <div id="addContainer">
            <div id="addCopyWrapper" className='mb-8'>
                <AddCopy />
            </div>
            <div id="addFormWrapper" style={ step === 'details' || step === 'summary' ? {marginBottom: 0} : {marginBottom: '253px'}}>
                <AddForm />
            </div>
        </div>
    </>
  )
}

export default Add