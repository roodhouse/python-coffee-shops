import React from 'react'
import Hero from './home/Hero'
import Places from './home/Places'
import { AddFormProvider } from '../context/addFormContext'

function Home() {

  return (
    <>
        <div id="homeContainer">
          <div id="heroWrapper" className='mb-[2rem]'>
            <AddFormProvider>
              <Hero />
            </AddFormProvider>
          </div>
          <div id="placesWrapper">
            <Places />
          </div>
        </div>
    </>
  )
}

export default Home