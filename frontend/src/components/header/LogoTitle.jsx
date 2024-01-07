import React from 'react'
import Logo from './logoTitle/Logo'
import Title from './logoTitle/Title'

function LogoTitle() {
  return (
    <>
        <div id="logoTitleContainer" className='flex'>
            <div id="logoWrapper">
                <Logo />
            </div>
            <div id="titleWrapper">
                <Title />
            </div>
        </div>
    </>
  )
}

export default LogoTitle