import React from 'react'
import { FaWifi, FaPlug, FaUserClock, FaSquarePen, FaVolumeLow, FaHeadphones, FaLaptop, FaUserGroup, 
    FaMugHot, FaUtensils, FaLeaf, FaMartiniGlass, FaCreditCard, FaSun, FaTree, FaArrowsUpDownLeftRight, FaToiletPaper, FaWheelchair, FaTemperatureFull,
    FaBanSmoking, FaDog, FaCar, FaStar } from "react-icons/fa6";

function Item({ type, name }) {
  return (
    <>
        <div id={`itemContainer${type}`}>
            {type === 'wifi' ? (
                <div id={`${type}Container`}>
                    <div id={`${type}IconNameContainer`}>
                        <div id={`${name}IconContainer`}>
                            <FaWifi />
                        </div>
                        <div id={`${name}NameContainer`}>
                            <p>{name}</p>
                        </div>
                    </div>
                    <div id={`${type}ResultsContainer`}>
                        <div id={`${type}Result`} className='h-[2px] w-[full] border border-red' />
                    </div>
                </div>
            ): type === 'power' ? (
                <div id={`${type}IconNameContainer`}>
                    <div id={`${type}Container`}>
                        <div id={`${type}IconContainer`}>
                            <FaPlug />
                        </div>
                        <div id={`${name}NameContainer`}>
                            <p>{name}</p>
                        </div>
                    </div>
                </div>
            ) : (
                null
            )}

        </div>
    </>
  )
}

export default Item