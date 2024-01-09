import React from 'react'
import FooterTitle from './footer/FooterTitle'
import FooterIcons from './footer/FooterIcons'
import FooterText from './footer/FooterText'

function Footer() {
  return (
    <>
        <div id="footerContainer" className='py-8'>
            <div id="footerTitleWrapper" className='pb-4'>
                <FooterTitle />
            </div>
            <div id="footerIconsWrapper" className='text-3xl pb-4 text-white'>
                <FooterIcons />
            </div>
            <div id="footerTextWrapper">
                <FooterText />
            </div>
        </div>
    </>
  )
}

export default Footer