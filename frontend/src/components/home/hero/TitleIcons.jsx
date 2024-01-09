import React from 'react'
import HeroIcons from './heroIcons/HeroIcons'
import HeroTitle from './heroTitle/HeroTitle'

function TitleIcons() {
  return (
    <>
        <div id="titleIconsContainer" className='flex justify-between'>
            <div id="heroTitleWrapper">
                <HeroTitle />
            </div>
            <div id="heroIconsWrapper">
                <HeroIcons />
            </div>
        </div>
    </>
  )
}

export default TitleIcons