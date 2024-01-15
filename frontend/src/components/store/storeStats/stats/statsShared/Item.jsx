import React from 'react'
import { FaWifi, FaPlug, FaUserClock, FaSquarePen, FaVolumeLow, FaHeadphones, FaLaptop, FaUserGroup, 
    FaMugHot, FaUtensils, FaLeaf, FaMartiniGlass, FaCreditCard, FaSun, FaTree, FaArrowsUpDownLeftRight, FaToiletPaper, FaWheelchair, FaTemperatureFull,
    FaBanSmoking, FaDog, FaCar, FaQuestion } from "react-icons/fa6";

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
                            ) : type === 'people' ? (
                                <FaLaptop />  
                            ) : type === 'groups' ? (
                                <FaUserGroup />
                            ) : type === 'coffee' ? (
                                <FaMugHot />
                            ) : type === 'food' ? (
                                <FaUtensils />
                            ) : type === 'veggie' ? (
                                <FaLeaf />
                            ) : type === 'alcohol' ? (
                                <FaMartiniGlass />
                            ) : type === 'credit' ? (
                                <FaCreditCard />
                            ) : type === 'light' ? (
                                <FaSun />
                            ) : type === 'outdoor' ? (
                                <FaTree />
                            ) : type === 'spacious' ? (
                                <FaArrowsUpDownLeftRight />
                            ) : type === 'restroom' ? (
                                <FaToiletPaper />
                            ) : type === 'accessible' ? (
                                <FaWheelchair />
                            ) : type === 'air' ? (
                                <FaTemperatureFull />
                            ) : type === 'smoke' ? (
                                <FaBanSmoking />
                            ) : type === 'pet' ? (
                                <FaDog />
                            ) : type === 'parking' ? (
                                <FaCar />
                            ) : <FaQuestion />   }
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