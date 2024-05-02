import React from 'react'
import { FaRegFaceSmile, FaRegFaceMeh, FaRegFaceFrown } from "react-icons/fa6";


function HeartIcon({ heart, rating }) { 
  return (
    <>
        <div id="heartIconContainer" className={`${heart} text-xl text-lg`}>
          { rating > 89 ? (
            <FaRegFaceSmile />
          ) : rating <= 89 && rating >= 70 ? (
            <FaRegFaceMeh />
          ) : (
            <FaRegFaceFrown />
          )}
        </div>
    </>
  )
}

export default HeartIcon