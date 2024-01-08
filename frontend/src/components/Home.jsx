import React from 'react'
import Hero from './home/Hero'
import Places from './home/Places'

function Home() {
  return (
    <>
        <div id="homeContainer">
          <div id="heroWrapper" className='mb-[2rem]'>
            <Hero />
          </div>
          <div id="placesWrapper">
            <Places />
          </div>
        </div>
    </>
  )
}

export default Home