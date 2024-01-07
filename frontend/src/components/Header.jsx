import React from 'react'
import LogoTitle from './header/LogoTitle'


// add nav links wrapper

function Header() {
  return (
    <>
        <div id="headerContainer" className='flex'>
            <div id="logoTitleWrapper" className='cursor-pointer'>
                <LogoTitle />
            </div>

        </div>
    </>
  )
}

export default Header