import React from 'react'
import Item from '../statsShared/Item'
import { useMain } from '../../../../../context/main'

function CommunityResults() {

  const { currentVenueAgg } = useMain()

    let c1, c2 = 0

    if (currentVenueAgg) {
        c1 = currentVenueAgg.c1 === null ? null : (currentVenueAgg.c1/2) * 100
        c2 = currentVenueAgg.c2 === null ? null : (currentVenueAgg.c2/2) * 100
    } 

  return (
    <>
        <div id="communityResultsContainer" className='flex flex-wrap justify-around items-center font-["PT_SERIF"]'>
            <div id="communityPeopleWrapper" className='w-[50%]'>
                <Item type={c1 === null ? 'unknown' : 'people'} name={'People Working'} rating={c1 === null ? '#ddd' : c1 <= 25 ? 'red' : c1 >= 26 && c1 <= 50 ? '#E0531F' : c1 >= 51 && c1 <= 75 ? '#F6D95E' : 'green' } width={c1 <= 25 ? '20%' : c1 >= 26 && c1 <= 50 ? '45%' : c1 >= 51 && c1 <= 75 ? '70%' : '95%' }/>
            </div>
            <div id="communityGroupsWrapper" className='w-[50%]'>
                <Item type={c2 === null ? 'unknown' : 'groups'} name={'Group tables'} rating={c2 === null ? '#ddd' : c2 <= 25 ? 'red' : c2 >= 26 && c2 <= 50 ? '#E0531F' : c2 >= 51 && c2 <= 75 ? '#F6D95E' : 'green' } width={c2 <= 25 ? '20%' : c2 >= 26 && c2 <= 50 ? '45%' : c2 >= 51 && c2 <= 75 ? '70%' : '95%' }/>
            </div>
        </div>
    </>
  )
}

export default CommunityResults