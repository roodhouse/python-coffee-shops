import React from 'react'

function Divider({marginTop}) {
  return (
    <>
        <div id="dividerContainer">
            <div id="divider" className={`w-full h-[1px] bg-[#ddd] my-9 mt-${marginTop}`}/>
        </div>
    </>
  )
}

export default Divider