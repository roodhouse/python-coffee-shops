import React from 'react'
import TitleIcons from './header/home/TitleIcons'
import Copy from './header/home/Copy'

// title
// 2 icons
// text

function Home() {
  return (
    <>
        <div id="homeContainer">
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

export default Home