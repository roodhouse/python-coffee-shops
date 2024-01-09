import React from 'react'
import FooterGitHub from './footerIcons/FooterGitHub'
import FooterPortfolio from './footerIcons/FooterPortfolio'
import FooterLinkedIn from './footerIcons/FooterLinkedIn'

function FooterIcons() {
  return (
    <>
        <div id="footIconsContainer" className='flex justify-between'>
            <div id="footerGitHubIconWrapper">
                <FooterGitHub />
            </div>
            <div id="footerPortfolioIconWrapper">
                <FooterPortfolio />
            </div>
            <div id="footerLinkedInIconWrapper">
                <FooterLinkedIn />
            </div>
        </div>
    </>
  )
}

export default FooterIcons