import React, { useState, useEffect, useRef } from 'react'
import SimpleRate from '../../../../add/forms/SimpleRate';
import { FaWifi, FaPlug, FaUserClock, FaSquarePen, FaVolumeLow, FaHeadphones, FaLaptop, FaUserGroup, 
    FaMugHot, FaUtensils, FaLeaf, FaMartiniGlass, FaCreditCard, FaSun, FaTree, FaArrowsUpDownLeftRight, FaToiletPaper, FaWheelchair, FaTemperatureFull,
    FaBanSmoking, FaDog, FaCar, FaQuestion } from "react-icons/fa6";

function Item({ page, type, current, name, rating, width, data, reviewId }) {
    const [ isToggled, setIsToggled ] = useState(false)
    const wrapperRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsToggled(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleClick = () => {
        setIsToggled(!isToggled)
    }

    const changeToggle = (style) => {
        setIsToggled(style)
    }

    let code = null 
    switch (type) {
        case 'wifi':
            code = 'p1'
            break;
        case 'power':
            code = 'p2'
            break;
        case 'stay':
            code = 'p3'
            break;
        case 'tables':
            code = 'p4'
            break;
        case 'quiet':
            code = 'p5'
            break;
         case 'calls':
            code = 'p6'
            break;
        case 'people':
            code = 'c1'
            break;
        case 'groups':
            code = 'c2'
            break;
        case 'coffee':
            code = 'ser1'
            break;
        case 'food':
            code = 'ser2'
            break;
        case 'veggie':
            code = 'ser3'
            break;
        case 'alcohol':
            code = 'ser4'
            break;
        case 'credit':
            code = 'ser5'
            break;
        case 'light':
            code = 'sp1'
            break;
        case 'outdoor':
            code = 'sp2'
            break;
        case 'spacious':
            code = 'sp3'
            break;
        case 'restroom':
            code = 'sp4'
            break;
        case 'accessible':
            code = 'sp5'
            break;
        case 'air':
            code = 'sp6'
            break;
        case 'smoke':
            code = 'sp7'
            break;
        case 'pet':
            code = 'sp8'
            break;
        case 'parking':
            code = 'sp9'
            break;
        default:
            console.log('sorry no more cases')

    }

  return (
    <>
        <div id={`${type}-${page}-itemContainer`} onClick={handleClick} className={isToggled ? 'mb-0' : 'mb-16'}>
                <div id={`${type}-${page}-Container`} className={type === 'unknown' ? (
                    "text-[#ddd]"
                ): null } ref={wrapperRef}>
                    <div id={`${type}-${page}-IconNameContainer`} className='flex flex-wrap items-center mb-2 mb-'>
                        <div id={`${type}-${page}-IconContainer`} className='mr-3'>
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
                        <div id={`${type}-${page}-NameContainer`}>
                            <p className={ rating === 'red' ? (
                                "line-through"
                            ) : "no-underline" }>
                                {name}
                            </p>
                        </div>
                    </div>
                    <div id={`${type}-${page}-ResultsContainer`}>
                        <div id={`${type}-${page}-Result`} style={{backgroundColor: rating, width: width}} className={`h-[2px]`} />
                    </div>
                    <div id={`${type}-${page}-simpleRateWrapper`} className={isToggled ? 'flex' : 'hidden'}>
                            <SimpleRate page={page} type={type} current={current} code={code} toggle={changeToggle} data={data} reviewId={reviewId} />
                    </div>
                </div>
        </div>
    </>
  )
}

export default Item