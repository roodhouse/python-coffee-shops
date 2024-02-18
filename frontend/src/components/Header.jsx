import React from 'react'
import LogoTitle from './header/LogoTitle'
import NavLinks from './header/NavLinks'
import { useMain } from '../context/main'
import { useAddForm } from '../context/addFormContext'

function Header() {

  const { setPage, clearVenue, clearCurrentVenueData } = useMain()
  const { editTheReview } = useAddForm()

  const handleClick = () => {
      setPage('home')
      editTheReview(false)
      clearVenue()
      clearCurrentVenueData()
  }
  return (
    <>
        <div id="headerContainer" className='flex justify-between'>
            <div id="logoTitleWrapper" className='cursor-pointer' onClick={handleClick}>
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