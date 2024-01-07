import React from 'react'
import { FaUsers } from "react-icons/fa";

function Join() {
  return (
    <>
        <div id="joinContainer">
            <div id="joinIcon" className='text-[1.4em] text-white'>
                <FaUsers />
            </div>
            <div id="joinName" className='hidden'>
                <p>Join Community</p>
            </div>
        </div>
    </>
  )
}

export default Join