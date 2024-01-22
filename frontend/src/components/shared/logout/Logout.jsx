import React from 'react'
import { useMain } from '../../../context/main'

function Logout({ name, type }) {

    const { logout } = useMain()

    const handleClick = () => {
        logout()
    }
  return (
    <>
        <div id="logoutButtonContainer"  onClick={handleClick} className='flex justify-center bg-red rounded py-4 px-16 cursor-pointer text-center text-white border border-red hover:bg-white hover:text-black'>
            <button type={type}>
                {name}
            </button>
        </div>
    </>
  )
}

export default Logout