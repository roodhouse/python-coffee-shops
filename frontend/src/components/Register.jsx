import React from 'react'
import LoginTitle from './join/LoginTitle'
import RegisterForm from './register/RegisterForm'
import { useMain } from '../context/main'


function Register() {

    const { setPage } = useMain()

    const handleClick = () => {
        console.log('click')
        setPage('join')
    }


  return (
    <>
        <div id="registerContainer" className='flex flex-col'>
            <div id="registerTitleWrapper" className='mb-8'>
                <LoginTitle title={'Register'} />
            </div>
            <div id="registerFormWrapper" className='mb-4'>
                <RegisterForm />
            </div>
            <div id="logInLinkWrapper" className='text-center text-sm text-blue cursor-pointer hover:text-red' onClick={handleClick}>
                <p>Already registered? Login here.</p>
            </div>
        </div>
    </>
  )
}

export default Register