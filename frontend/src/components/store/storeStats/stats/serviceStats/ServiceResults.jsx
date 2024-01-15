import React from 'react'
import Item from '../statsShared/Item'

function ServiceResults() {
  return (
    <>
        <div id="serviceResultsContainer" className='flex flex-wrap justify-around items-center font-["PT_SERIF"]'>
            <div id="serviceWiFiWrapper" className='w-[50%] mb-8'>
                <Item type={'coffee'} name={'Coffee'} rating={'green'} width={'90%'}/>
            </div>
            <div id="servicePowerWrapper" className='w-[50%] mb-8'>
                <Item type={'food'} name={'Food'} rating={'#F6D95E'} width={'45%'}/>
            </div>
            <div id="serviceStayWrapper" className='w-[50%] mb-8'>
                <Item type={'veggie'} name={'Veggie'} rating={'#F6D95E'} width={'45%'} />
            </div>
            <div id="serviceTablesWrapper" className='w-[50%] mb-8'>
                <Item type={'alcohol'} name={'Alcohol'} rating={'#F6D95E'} width={'45%'}/>
            </div>
            <div id="serviceQuietWrapper" className='w-full self-start'>
                <Item type={'credit'} name={'Credit cards'} rating={'red'} width={'12.5%'}/>
            </div>
        </div>
    </>
  )
}

export default ServiceResults