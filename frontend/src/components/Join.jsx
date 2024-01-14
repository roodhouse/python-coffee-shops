import React from 'react'
import LoginTitle from './join/LoginTitle'
import LoginForm from './join/LoginForm'
// join form
// register link

function Join() {
  return (
    <>
        <div id="joinContainer" className='flex flex-col'>
            <div id="loginTitleWrapper" className='mb-8'>
                <LoginTitle />
            </div>
            <div id="loginFormWrapper">
                <LoginForm />
            </div>
        </div>
    </>
  )
}

export default Join