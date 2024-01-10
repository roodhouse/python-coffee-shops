import React from 'react'
import AllCities from './navLinks/AllCities'
import Suggest from './navLinks/Suggest'
import Join from './navLinks/Join'
import { useMain } from '../../context/main'

function NavLinks() {

    const { setPage } = useMain()

    const handleClick = (e) => {
        const newPage = e.currentTarget.getAttribute('data-name')
        console.log(newPage)
        setPage(newPage)
    }

  return (
    <>
        <div id="navLinksContainer" className='flex justify-between'>
            <div id="allCitiesWrapper" data-name='cities' className='cursor-pointer' onClick={handleClick}>
                <AllCities />
            </div>
            <div id="suggestWrapper" data-name='suggest' className='cursor-pointer' onClick={handleClick}>
                <Suggest />
            </div>
            <div id="joinWrapper" data-name='join' className='cursor-pointer' onClick={handleClick}>
                <Join />
            </div>
        </div>
    </>
  )
}

export default NavLinks