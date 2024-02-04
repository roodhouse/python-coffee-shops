import React from 'react'
import Item from '../statsShared/Item'
import { useMain } from '../../../../../context/main'

function ProductivityResults() {

    const { currentVenueAgg } = useMain()

    let p1, p2, p3, p4, p5, p6 = 0

    if (currentVenueAgg) {
        // going to need to add a condition for null
        p1 = (currentVenueAgg.p1/2) * 100
        p2 = (currentVenueAgg.p2/2) * 100
        p3 = (currentVenueAgg.p3/2) * 100
        p4 = (currentVenueAgg.p4/2) * 100
        p5 = (currentVenueAgg.p5/2) * 100
        p6 = (currentVenueAgg.p6/2) * 100
    } 
    
  return (
    <>
        <div id="productivityResultsContainer" className='flex flex-wrap justify-around items-center font-["PT_SERIF"]'>
            <div id="productivityWiFiWrapper" className='w-[45%] mb-8'>
                <Item type={'wifi'} name={'Stable Wi-Fi'} rating={p1 <= 25 ? 'red' : p1 >= 26 && p1 <= 50 ? '#E0531F' : p1 >= 51 && p1 <= 75 ? '#F6D95E' : 'green' } width={p1 <= 25 ? '20%' : p1 >= 26 && p1 <= 50 ? '45%' : p1 >= 51 && p1 <= 75 ? '70%' : '95%' }/>
            </div>
            <div id="productivityPowerWrapper" className='w-[45%] mb-8'>
                <Item type={'power'} name={'Power Sockets'} rating={p2 <= 25 ? 'red' : p2 >= 26 && p2 <= 50 ? '#E0531F' : p2 >= 51 && p2 <= 75 ? '#F6D95E' : 'green' } width={p2 <= 25 ? '20%' : p2 >= 26 && p2 <= 50 ? '45%' : p2 >= 51 && p2 <= 75 ? '70%' : '95%' }/>
            </div>
            <div id="productivityStayWrapper" className='w-[45%] mb-8'>
                <Item type={'stay'} name={'Long Stays'} rating={p3 <= 25 ? 'red' : p3 >= 26 && p3 <= 50 ? '#E0531F' : p3 >= 51 && p3 <= 75 ? '#F6D95E' : 'green' } width={p3 <= 25 ? '20%' : p3 >= 26 && p3 <= 50 ? '45%' : p3 >= 51 && p3 <= 75 ? '70%' : '95%' } />
            </div>
            <div id="productivityTablesWrapper" className='w-[45%] mb-8'>
                <Item type={'tables'} name={'Work-friendly tables'} rating={p4 <= 25 ? 'red' : p4 >= 26 && p4 <= 50 ? '#E0531F' : p4 >= 51 && p4 <= 75 ? '#F6D95E' : 'green' } width={p4 <= 25 ? '20%' : p4 >= 26 && p4 <= 50 ? '45%' : p4 >= 51 && p4 <= 75 ? '70%' : '95%' }/>
            </div>
            <div id="productivityQuietWrapper" className='w-[45%]'>
                <Item type={'quiet'} name={'Quiet'} rating={p5 <= 25 ? 'red' : p5 >= 26 && p5 <= 50 ? '#E0531F' : p5 >= 51 && p5 <= 75 ? '#F6D95E' : 'green' } width={p5 <= 25 ? '20%' : p5 >= 26 && p5 <= 50 ? '45%' : p5 >= 51 && p5 <= 75 ? '70%' : '95%' }/>
            </div>
            <div id="productivityCallsWrapper" className='w-[45%]'>
                <Item type={'unknown'} name={'Audio/Video Calls'} rating={p6 <= 25 ? 'red' : p6 >= 26 && p6 <= 50 ? '#E0531F' : p6 >= 51 && p6 <= 75 ? '#F6D95E' : 'green' } width={p6 <= 25 ? '20%' : p6 >= 26 && p6 <= 50 ? '45%' : p6 >= 51 && p6 <= 75 ? '70%' : '95%' }/>
            </div>
        </div>
    </>
  )
}

export default ProductivityResults