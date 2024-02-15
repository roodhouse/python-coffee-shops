import React from 'react'
import Item from '../statsShared/Item'
import { useMain } from '../../../../../context/main'

function SpaceResults() {

    const { currentVenueAgg } = useMain()

    let sp1, sp2, sp3, sp4, sp5, sp6, sp7, sp8, sp9 = 0

    if (currentVenueAgg) {
        sp1 = currentVenueAgg.sp1 === null ? null : (currentVenueAgg.sp1/2) * 100
        sp2 = currentVenueAgg.sp2 === null ? null : (currentVenueAgg.sp2/2) * 100
        sp3 = currentVenueAgg.sp3 === null ? null : (currentVenueAgg.sp3/2) * 100
        sp4 = currentVenueAgg.sp4 === null ? null : (currentVenueAgg.sp4/2) * 100
        sp5 = currentVenueAgg.sp5 === null ? null : (currentVenueAgg.sp5/2) * 100
        sp6 = currentVenueAgg.sp6 === null ? null : (currentVenueAgg.sp6/2) * 100
        sp7 = currentVenueAgg.sp7 === null ? null : (currentVenueAgg.sp7/2) * 100
        sp8 = currentVenueAgg.sp8 === null ? null : (currentVenueAgg.sp8/2) * 100
        sp9 = currentVenueAgg.sp9 === null ? null : (currentVenueAgg.sp9/2) * 100
    } 

  return (
    <>
        <div id="spaceResultsContainer" className='flex flex-wrap justify-around items-center font-["PT_SERIF"]'>
            <div id="spaceLightWrapper" className='w-[50%] mb-8'>
                <Item type={sp1 === null ? 'unknown' : 'light'} name={'Natural Light'} rating={sp1 === null ? '#ddd' : sp1 <= 25 ? 'red' : sp1 >= 26 && sp1 <= 50 ? '#E0531F' : sp1 >= 51 && sp1 <= 75 ? '#F6D95E' : 'green' } width={sp1 <= 25 ? '20%' : sp1 >= 26 && sp1 <= 50 ? '45%' : sp1 >= 51 && sp1 <= 75 ? '70%' : '95%' }/>
            </div>
            <div id="spaceOutdoorWrapper" className='w-[50%] mb-8'>
                <Item type={sp2 === null ? 'unknown' : 'outdoor'} name={'Outdoor area'} rating={sp2 === null ? '#ddd' : sp2 <= 25 ? 'red' : sp2 >= 26 && sp2 <= 50 ? '#E0531F' : sp2 >= 51 && sp2 <= 75 ? '#F6D95E' : 'green' } width={sp2 <= 25 ? '20%' : sp2 >= 26 && sp2 <= 50 ? '45%' : sp2 >= 51 && sp2 <= 75 ? '70%' : '95%' }/>
            </div>
            <div id="spaceSpaciousWrapper" className='w-[50%] mb-8'>
                <Item type={sp3 === null ? 'unknown' : 'spacious'} name={'Spacious'} rating={sp3 === null ? '#ddd' : sp3 <= 25 ? 'red' : sp3 >= 26 && sp3 <= 50 ? '#E0531F' : sp3 >= 51 && sp3 <= 75 ? '#F6D95E' : 'green' } width={sp3 <= 25 ? '20%' : sp3 >= 26 && sp3 <= 50 ? '45%' : sp3 >= 51 && sp3 <= 75 ? '70%' : '95%' } />
            </div>
            <div id="spaceRestRoomWrapper" className='w-[50%] mb-8'>
                <Item type={sp4 === null ? 'unknown' : 'restroom'} name={'Restroom'} rating={sp4 === null ? '#ddd' : sp4 <= 25 ? 'red' : sp4 >= 26 && sp4 <= 50 ? '#E0531F' : sp4 >= 51 && sp4 <= 75 ? '#F6D95E' : 'green' } width={sp4 <= 25 ? '20%' : sp4 >= 26 && sp4 <= 50 ? '45%' : sp4 >= 51 && sp4 <= 75 ? '70%' : '95%' } />
            </div>
            <div id="spaceAccessibleWrapper" className='w-[50%] mb-8'>
                <Item type={sp5 === null ? 'unknown' : 'accessible'} name={'Accessible'} rating={sp5 === null ? '#ddd' : sp5 <= 25 ? 'red' : sp5 >= 26 && sp5 <= 50 ? '#E0531F' : sp5 >= 51 && sp5 <= 75 ? '#F6D95E' : 'green' } width={sp5 <= 25 ? '20%' : sp5 >= 26 && sp5 <= 50 ? '45%' : sp5 >= 51 && sp5 <= 75 ? '70%' : '95%' }/>
            </div>
            <div id="spaceAirWrapper" className='w-[50%] mb-8'>
                <Item type={sp6 === null ? 'unknown' : 'air'} name={'Air conditioned'} rating={sp6 === null ? '#ddd' : sp6 <= 25 ? 'red' : sp6 >= 26 && sp6 <= 50 ? '#E0531F' : sp6 >= 51 && sp6 <= 75 ? '#F6D95E' : 'green' } width={sp6 <= 25 ? '20%' : sp6 >= 26 && sp6 <= 50 ? '45%' : sp6 >= 51 && sp6 <= 75 ? '70%' : '95%' }/>
            </div>
            <div id="spaceSmokeWrapper" className='w-[50%] mb-8'>
                <Item type={sp7 === null ? 'unknown' : 'smoke'} name={'Smoke Free'} rating={sp7 === null ? '#ddd' : sp7 <= 25 ? 'red' : sp7 >= 26 && sp7 <= 50 ? '#E0531F' : sp7 >= 51 && sp7 <= 75 ? '#F6D95E' : 'green' } width={sp7 <= 25 ? '20%' : sp7 >= 26 && sp7 <= 50 ? '45%' : sp7 >= 51 && sp7 <= 75 ? '70%' : '95%' }/>
            </div>
            <div id="spacePetWrapper" className='w-[50%] mb-8'>
                <Item type={sp8 === null ? 'unknown' : 'pet'} name={'Pet Friendly'} rating={sp8 === null ? '#ddd' : sp8 <= 25 ? 'red' : sp8 >= 26 && sp8 <= 50 ? '#E0531F' : sp8 >= 51 && sp8 <= 75 ? '#F6D95E' : 'green' } width={sp8 <= 25 ? '20%' : sp8 >= 26 && sp8 <= 50 ? '45%' : sp8 >= 51 && sp8 <= 75 ? '70%' : '95%' }/>
            </div>
            <div id="spaceParkingWrapper" className='w-full'>
                <Item type={sp9 === null ? 'unknown' : 'parking'} name={'Parking'} rating={sp9 === null ? '#ddd' : sp9 <= 25 ? 'red' : sp9 >= 26 && sp9 <= 50 ? '#E0531F' : sp9 >= 51 && sp9 <= 75 ? '#F6D95E' : 'green' } width={sp9 <= 25 ? '10%' : sp9 >= 26 && sp9 <= 50 ? '22.5%' : sp9 >= 51 && sp9 <= 75 ? '35%' : '47.5%' }/>
            </div>
        </div>
    </>
  )
}

export default SpaceResults