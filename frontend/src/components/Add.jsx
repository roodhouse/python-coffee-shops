import React from 'react'
import AddCopy from './add/AddCopy'
import AddForm from './add/AddForm'

function Add() {
  return (
    <>
        <div id="addContainer">
            <div id="addCopyWrapper" className='mb-8'>
                <AddCopy />
            </div>
            <div id="addFormWrapper">
                <AddForm />
            </div>
        </div>
    </>
  )
}

export default Add