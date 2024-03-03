import React from 'react'
import StoreHero from './store/StoreHero'
import StoreStats from './store/StoreStats'
import StoreSummary from './store/StoreSummary'
import StoreDetails from './store/StoreDetails'
import StoreFooter from './store/StoreFooter'
import { useMain } from '../context/main'

function Store() {

    const { currentVenueData } = useMain()



  return (
    <>
        <div id="storeContainer">
            {/* <div id="storeHeroWrapper" className='bg-[url("assets/perkyBeans.jpeg")] bg-[rgba(0,0,0,0.5)] bg-blend-overlay h-96 bg-cover bg-no-repeat flex items-end mb-9'> */}
            <div id="storeHeroWrapper" style={{ backgroundImage: currentVenueData && currentVenueData.image ? `url(${currentVenueData.image})` : 'none' }} className='bg-[rgba(0,0,0,0.5)] bg-blend-overlay h-96 bg-cover bg-no-repeat flex items-end mb-9'>
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
                <div id="storeFooterWrapper" className='mb-9'>
                    <StoreFooter />
                </div>
            </div>
        </div>
    </>
  )
}

export default Store