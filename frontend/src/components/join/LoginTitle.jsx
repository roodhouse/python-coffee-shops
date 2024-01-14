import React from 'react'

function LoginTitle({ title }) {
  return (
    <>
      <div id="loginTitleContainer" className='text-4xl uppercase font-bold tracking-wider text-center'>
        <h2>{title}</h2>
      </div>
    </>
  )
}

export default LoginTitle