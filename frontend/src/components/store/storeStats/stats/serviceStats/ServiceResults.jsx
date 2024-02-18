import React from 'react'
import Item from '../statsShared/Item'
import { useMain } from '../../../../../context/main'

function ServiceResults() {


    const { currentVenueAgg } = useMain()

    let ser1, ser2, ser3, ser4, ser5 = 0

    if (currentVenueAgg) {
        ser1 = currentVenueAgg.ser1 === null ? null : (currentVenueAgg.ser1/2) * 100
        ser2 = currentVenueAgg.ser2 === null ? null : (currentVenueAgg.ser2/2) * 100
        ser3 = currentVenueAgg.ser3 === null ? null : (currentVenueAgg.ser3/2) * 100
        ser4 = currentVenueAgg.ser4 === null ? null : (currentVenueAgg.ser4/2) * 100
        ser5 = currentVenueAgg.ser5 === null ? null : (currentVenueAgg.ser5/2) * 100
    } 

  return (
    <>
        <div id="serviceResultsContainer" className='flex flex-wrap justify-around items-center font-["PT_SERIF"]'>
            <div id="serviceWiFiWrapper" className='w-[50%] mb-8'>
                <Item type={ser1 === null ? 'unknown' : 'coffee'} name={'Coffee'} rating={ser1 === null ? '#ddd' : ser1 <= 25 ? 'red' : ser1 >= 26 && ser1 <= 50 ? '#E0531F' : ser1 >= 51 && ser1 <= 75 ? '#F6D95E' : 'green' } width={ser1 <= 25 ? '20%' : ser1 >= 26 && ser1 <= 50 ? '45%' : ser1 >= 51 && ser1 <= 75 ? '70%' : '95%' }/>
            </div>
            <div id="servicePowerWrapper" className='w-[50%] mb-8'>
                <Item type={ser2 === null ? 'unknown' : 'food'} name={'Food'} rating={ser2 === null ? '#ddd' : ser2 <= 25 ? 'red' : ser2 >= 26 && ser2 <= 50 ? '#E0531F' : ser2 >= 51 && ser2 <= 75 ? '#F6D95E' : 'green' } width={ser2 <= 25 ? '20%' : ser2 >= 26 && ser2 <= 50 ? '45%' : ser2 >= 51 && ser2 <= 75 ? '70%' : '95%' }/>
            </div>
            <div id="serviceStayWrapper" className='w-[50%] mb-8'>
                <Item type={ser3 === null ? 'unknown' : 'veggie'} name={'Veggie'} rating={ser3 === null ? '#ddd' : ser3 <= 25 ? 'red' : ser3 >= 26 && ser3 <= 50 ? '#E0531F' : ser3 >= 51 && ser3 <= 75 ? '#F6D95E' : 'green' } width={ser3 <= 25 ? '20%' : ser3 >= 26 && ser3 <= 50 ? '45%' : ser3 >= 51 && ser3 <= 75 ? '70%' : '95%' }/>
            </div>
            <div id="serviceTablesWrapper" className='w-[50%] mb-8'>
                <Item type={ser4 === null ? 'unknown' : 'alcohol'} name={'Alcohol'} rating={ser4 === null ? '#ddd' : ser4 <= 25 ? 'red' : ser4 >= 26 && ser4 <= 50 ? '#E0531F' : ser4 >= 51 && ser4 <= 75 ? '#F6D95E' : 'green' } width={ser4 <= 25 ? '20%' : ser4 >= 26 && ser4 <= 50 ? '45%' : ser4 >= 51 && ser4 <= 75 ? '70%' : '95%' }/>
            </div>
            <div id="serviceQuietWrapper" className='w-full self-start'>
                <Item type={ser5 === null ? 'unknown' : 'credit'} name={'Credit cards'} rating={ser5 === null ? '#ddd' : ser5 <= 25 ? 'red' : ser5 >= 26 && ser5 <= 50 ? '#E0531F' : ser5 >= 51 && ser5 <= 75 ? '#F6D95E' : 'green' } width={ser5 <= 25 ? '10%' : ser5 >= 26 && ser5 <= 50 ? '22.5%' : ser5 >= 51 && ser5 <= 75 ? '35%' : '47.5%' }/>
            </div>
        </div>
    </>
  )
}

export default ServiceResults