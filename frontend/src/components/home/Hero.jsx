import React from 'react'
import TitleIcons from './hero/TitleIcons'
import Copy from './hero/Copy'

function Hero() {
  return (
    <>
        <div id="heroContainer">
            <div id="titleIconsWrapper" className='mb-[2rem]'>
                <TitleIcons />
            </div>
            <div id="copyWrapper">
                <Copy />
            </div>
        </div>
    </>
  )
}

export default Hero