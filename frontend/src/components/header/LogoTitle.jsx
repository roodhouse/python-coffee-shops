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
            <div id="titleWrapper" className='ml-[10px]'>
                <Title />
            </div>
        </div>
    </>
  )
}

export default LogoTitle