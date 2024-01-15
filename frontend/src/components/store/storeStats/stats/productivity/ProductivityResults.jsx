import React from 'react'
import Item from '../statsShared/Item'

// need a for loop that goes through the category aggregate results and prints the icon and relative info
// change the rating and width accordingly

function ProductivityResults() {
  return (
    <>
        <div id="productivityResultsContainer" className='flex flex-wrap justify-around items-center font-["PT_SERIF"]'>
            <div id="productivityWiFiWrapper" className='w-[50%] mb-8'>
                <Item type={'wifi'} name={'Stable Wi-Fi'} rating={'green'} width={'90%'}/>
            </div>
            <div id="productivityPowerWrapper" className='w-[50%] mb-8'>
                <Item type={'power'} name={'Power Sockets'} rating={'#F6D95E'} width={'45%'}/>
            </div>
            <div id="productivityStayWrapper" className='w-[50%] mb-8'>
                <Item type={'stay'} name={'Long Stays'} rating={'#F6D95E'} width={'45%'} />
            </div>
            <div id="productivityTablesWrapper" className='w-[50%] mb-8'>
                <Item type={'tables'} name={'Work-friendly tables'} rating={'#F6D95E'} width={'45%'}/>
            </div>
            <div id="productivityQuietWrapper" className='w-[50%]'>
                <Item type={'quiet'} name={'Quiet'} rating={'red'} width={'25%'}/>
            </div>
            <div id="productivityCallsWrapper" className='w-[50%]'>
                <Item type={'unknown'} name={'Audio/Video Calls'} rating={'#ddd'} width={'25%'}/>
            </div>
        </div>
    </>
  )
}

export default ProductivityResults