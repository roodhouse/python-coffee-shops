import React from 'react'
import LogoIcon from '../../../assets/logo.png'

function Logo() {
  return (
    <>
        <div id="logoContainer" className='w-6'>
            <img src={LogoIcon} alt="Remote Friendly" />
        </div>
    </>
  )
}

export default Logo