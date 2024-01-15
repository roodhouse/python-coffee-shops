import React from 'react'
import { useMain } from '../../context/main'

function StoreFooter() {

  const { currentCity, setPage } = useMain()

  const handleClick = () => {
    setPage('home')
  }

  return (
    <>
      <div id="storeFooterContainer">
        <div id="backWrapper" onClick={handleClick} className='underline font-["PT_SERIF"] text-center'>
          <p>Explore more remote friendly venues in {currentCity}</p>
        </div>
      </div>
    </>
  )
}

export default StoreFooter