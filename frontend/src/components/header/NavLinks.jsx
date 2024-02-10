import React from 'react'
import AllCities from './navLinks/AllCities'
import Suggest from './navLinks/Suggest'
import Join from './navLinks/Join'
import { useMain } from '../../context/main'
import { useAddForm } from '../../context/addFormContext'

function NavLinks() {

    const { setPage, loggedIn, clearVenue } = useMain()
    const { editTheReview } = useAddForm()

    const handleClick = (e) => {
        const newPage = e.currentTarget.getAttribute('data-name')
        setPage(newPage)
        clearVenue()
        editTheReview(false)
    }

  return (
    <>
        <div id="navLinksContainer" className='flex justify-between'>
            <div id="allCitiesWrapper" data-name='cities' className='cursor-pointer' onClick={handleClick}>
                <AllCities />
            </div>
            <div id="suggestWrapper" data-name={loggedIn ? 'suggest' : 'join' } className='cursor-pointer' onClick={handleClick}>
                <Suggest />
            </div>
            <div id="joinWrapper" data-name={loggedIn ? 'dash' : 'join'} className='cursor-pointer' onClick={handleClick}>
                <Join />
            </div>
        </div>
    </>
  )
}

export default NavLinks