import React from 'react'
import LogoTitle from './header/LogoTitle'
import NavLinks from './header/NavLinks'


// bring in icons for the links

function Header() {
  return (
    <>
        <div id="headerContainer" className='flex justify-between'>
            <div id="logoTitleWrapper" className='cursor-pointer'>
                <LogoTitle />
            </div>
            <div id="navLinksWrapper" className='w-[30%]'>
                <NavLinks />
            </div>
        </div>
    </>
  )
}

export default Header