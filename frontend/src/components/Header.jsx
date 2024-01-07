import React from 'react'
import LogoTitle from './header/LogoTitle'
import NavLinks from './header/NavLinks'


// bring in icons for the links

function Header() {
  return (
    <>
        <div id="headerContainer" className='flex'>
            <div id="logoTitleWrapper" className='cursor-pointer'>
                <LogoTitle />
            </div>
            <div id="navLinksWrapper">
                <NavLinks />
            </div>
        </div>
    </>
  )
}

export default Header