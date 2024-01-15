import React from 'react'
import Item from '../statsShared/Item'

function CommunityResults() {
  return (
    <>
        <div id="communityResultsContainer" className='flex flex-wrap justify-around items-center font-["PT_SERIF"]'>
            <div id="communityPeopleWrapper" className='w-[50%]'>
                <Item type={'people'} name={'People Working'} rating={'green'} width={'90%'}/>
            </div>
            <div id="communityGroupsWrapper" className='w-[50%]'>
                <Item type={'groups'} name={'Group tables'} rating={'#F6D95E'} width={'45%'}/>
            </div>
        </div>
    </>
  )
}

export default CommunityResults