import React from 'react'
import HeroIcons from './heroIcons/HeroIcons'
import HeroTitle from './heroTitle/HeroTitle'

function TitleIcons() {
  return (
    <>
        <div id="titleIconsContainer">
            <div id="titleWrapper">
                <HeroTitle />
            </div>
            <div id="iconsWrapper">
                <HeroIcons />
            </div>
        </div>
    </>
  )
}

export default TitleIcons