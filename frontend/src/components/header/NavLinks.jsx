import React from 'react'
import AllCities from './navLinks/AllCities'
import Suggest from './navLinks/Suggest'
import Join from './navLinks/Join'

function NavLinks() {
  return (
    <>
        <div id="navLinksContainer">
            <div id="allCitiesWrapper">
                <AllCities />
            </div>
            <div id="suggestWrapper">
                <Suggest />
            </div>
            <div id="joinWrapper">
                <Join />
            </div>
        </div>
    </>
  )
}

export default NavLinks