import React from 'react'
import Item from '../statsShared/Item'

function SpaceResults() {
  return (
    <>
        <div id="spaceResultsContainer" className='flex flex-wrap justify-around items-center font-["PT_SERIF"]'>
            <div id="spaceLightWrapper" className='w-[50%] mb-8'>
                <Item type={'light'} name={'Natural Light'} rating={'green'} width={'90%'}/>
            </div>
            <div id="spaceOutdoorWrapper" className='w-[50%] mb-8'>
                <Item type={'outdoor'} name={'Outdoor area'} rating={'#F6D95E'} width={'45%'}/>
            </div>
            <div id="spaceSpaciousWrapper" className='w-[50%] mb-8'>
                <Item type={'spacious'} name={'Spacious'} rating={'#F6D95E'} width={'45%'} />
            </div>
            <div id="spaceRestRoomWrapper" className='w-[50%] mb-8'>
                <Item type={'restroom'} name={'Restroom'} rating={'#F6D95E'} width={'45%'}/>
            </div>
            <div id="spaceAccessibleWrapper" className='w-[50%] mb-8'>
                <Item type={'accessible'} name={'Accessible'} rating={'red'} width={'25%'}/>
            </div>
            <div id="spaceAirWrapper" className='w-[50%] mb-8'>
                <Item type={'air'} name={'Air conditioned'} rating={'red'} width={'25%'}/>
            </div>
            <div id="spaceSmokeWrapper" className='w-[50%] mb-8'>
                <Item type={'smoke'} name={'Smoke Free'} rating={'green'} width={'25%'}/>
            </div>
            <div id="spacePetWrapper" className='w-[50%] mb-8'>
                <Item type={'pet'} name={'Pet Friendly'} rating={'#F6D95E'} width={'25%'}/>
            </div>
            <div id="spaceParkingWrapper" className='w-full'>
                <Item type={'parking'} name={'Parking'} rating={'red'} width={'12.5%'}/>
            </div>
        </div>
    </>
  )
}

export default SpaceResults