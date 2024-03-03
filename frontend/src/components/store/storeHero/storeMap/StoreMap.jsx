import React from 'react'
import { FaMap } from "react-icons/fa6";
import { useMain } from '../../../../context/main'

function StoreMap() {

  return (
    <>
        <div id="storeMapContainer" className='text-white text-4xl'>
            <a href="https://google.com/maps" target="_blank" rel="noreferrer">
                <FaMap />
            </a>
        </div>
    </>
  )
}

export default StoreMap