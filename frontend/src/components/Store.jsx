import React from 'react'
import { useMain } from '../context/main'
import StoreHero from './store/StoreHero'
import StoreStats from './store/StoreStats'
import StoreSummary from './store/StoreSummary'
import StoreDetails from './store/StoreDetails'
import StoreFooter from './store/StoreFooter'

// need to retrieve data from database and replace all info below with it
// hero
    // background image is chosen image
    // rating box
    // store name 
    // map icon
// store stats
    // been here
        // list of avatars that have reviewed or selected hearts
    // review
        // reviews of the store
    // aggregates
        // Productivity 
        // Community
        // Service
        // Space
// Summary
    // hearts filled in our not based on user selections of summary
// Store details
    // hours
    // address link
// Store Footer
    // update page link if logged in
    // back to city link


function Store() {

    const { currentVenue } = useMain()

  return (
    <>
        <div id="storeContainer">
            <div id="storeHeroWrapper">
                <StoreHero />
            </div>
            <div id="storeMainContainer" className='px-[.75rem]'>
                <div id="storeStatsWrapper">
                    <StoreStats />
                </div>
                <div id="storeSummaryWrapper">
                    <StoreSummary />
                </div>
                <div id="storeDetailsWrapper">
                    <StoreDetails />
                </div>
                <div id="storeFooterWrapper">
                    <StoreFooter />
                </div>
            </div>
        </div>
    </>
  )
}

export default Store