import React from 'react'
import { CiHeart } from "react-icons/ci";


function HeartIcon({ heart }) {
  return (
    <>
        <div id="heartIconContainer" className={`${heart} text-xl`}>
            <CiHeart />
        </div>
    </>
  )
}

export default HeartIcon