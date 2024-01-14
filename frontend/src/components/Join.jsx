import React from 'react'
import LoginTitle from './join/LoginTitle'
import LoginForm from './join/LoginForm'
import { useMain } from '../context/main'
// join form
// register link

function Join() {

    const { setPage } = useMain()

    const handleClick = () => {
        console.log('click')
        setPage('register')
    }

  return (
    <>
        <div id="joinContainer" className='flex flex-col'>
            <div id="loginTitleWrapper" className='mb-8'>
                <LoginTitle title={'Login'} />
            </div>
            <div id="loginFormWrapper" className='mb-4'>
                <LoginForm />
            </div>
            <div id="registerLinkWrapper" className='text-center text-sm text-blue cursor-pointer hover:text-red' onClick={handleClick}>
                <p>Register</p>
            </div>
        </div>
    </>
  )
}

export default Join