import React from 'react'

function JoinButton({ name, type }) {
  return (
    <>
        <div id="joinButtonContainer" className='flex justify-center bg-blue rounded py-4 px-16 flex justify-center cursor-pointer text-center text-white border border-blue hover:bg-white hover:text-black'>
            <button type={type}>
                {name}
            </button>
        </div>
    </>
  )
}

export default JoinButton