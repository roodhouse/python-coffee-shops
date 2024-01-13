import React from 'react'

function NextButton({ name, id }) {
  return (
    <>
        <button
                type='submit'
                id={id}
                name={name}
            >
                Next
        </button>
    </>
  )
}

export default NextButton