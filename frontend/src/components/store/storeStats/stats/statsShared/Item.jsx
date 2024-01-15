import React from 'react'
import { FaWifi, FaPlug, FaUserClock, FaSquarePen, FaVolumeLow, FaHeadphones, FaLaptop, FaUserGroup, 
    FaMugHot, FaUtensils, FaLeaf, FaMartiniGlass, FaCreditCard, FaSun, FaTree, FaArrowsUpDownLeftRight, FaToiletPaper, FaWheelchair, FaTemperatureFull,
    FaBanSmoking, FaDog, FaCar, FaStar, FaQuestion } from "react-icons/fa6";

function Item({ type, name, rating, width }) {
  return (
    <>
        <div id={`itemContainer${type}`}>
                <div id={`${type}Container`} className={type === 'unknown' ? (
                    "text-[#ddd]"
                ): null }>
                    <div id={`${type}IconNameContainer`} className='flex items-center mb-2'>
                        <div id={`${type}IconContainer`} className='mr-3'>
                            { type === 'wifi' ? (
                                <FaWifi />
                            ) : type === 'power' ? (
                                <FaPlug />
                            ) : type === 'stay' ? (
                                <FaUserClock />
                            ) : type === 'tables' ? (
                                <FaSquarePen />
                            ) : type === 'quiet' ? (
                                <FaVolumeLow />
                            ) : type === 'calls' ? (
                                <FaHeadphones />
                            ) : type === 'unknown' ? (
                                <FaQuestion />  
                            ) : null }
                        </div>
                        <div id={`${type}NameContainer`}>
                            <p className={ rating === 'red' ? (
                                "line-through"
                            ) : "no-underline" }>
                                {name}
                            </p>
                        </div>
                    </div>
                    <div id={`${type}ResultsContainer`}>
                        <div id={`${type}Result`} style={{backgroundColor: rating, width: width}} className={`h-[2px]`} />
                    </div>
                </div>
        </div>
    </>
  )
}

export default Item

// function Item({ type, name }) {
//     return (
//       <>
//           <div id={`itemContainer${type}`}>
//               {type === 'wifi' ? (
//                   <div id={`${type}Container`}>
//                       <div id={`${type}IconNameContainer`}>
//                           <div id={`${type}IconContainer`}>
//                               <FaWifi />
//                           </div>
//                           <div id={`${type}NameContainer`}>
//                               <p>{name}</p>
//                           </div>
//                       </div>
//                       <div id={`${type}ResultsContainer`}>
//                           <div id={`${type}Result`} className='h-[2px] w-[full] border border-red' />
//                       </div>
//                   </div>
//               ): type === 'power' ? (
//                   <div id={`${type}IconNameContainer`}>
//                       <div id={`${type}Container`}>
//                           <div id={`${type}IconContainer`}>
//                               <FaPlug />
//                           </div>
//                           <div id={`${name}NameContainer`}>
//                               <p>{name}</p>
//                           </div>
//                       </div>
//                   </div>
//               ) : (
//                   null
//               )}
  
//           </div>
//       </>
//     )
//   }