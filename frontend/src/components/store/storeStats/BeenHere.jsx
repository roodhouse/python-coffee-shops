import React from 'react'
import StoreHeading from '../storeShared/StoreHeading'
import Avatar from '../../shared/avatar/Avatar'
import Divider from '../../shared/divider/Divider'

function BeenHere() {
  return (
    <>
        <div id="beenHereContainer">
            <div id="beenHereWrapper">
                <StoreHeading heading={'Been Here'} />
            </div>
            <div id="beenHereAvatarWrapper">
                <Avatar />
            </div>
            <div id="beenHereDividerWrapper">
                <Divider />
            </div>
        </div>
    </>
  )
}

export default BeenHere