import React from 'react'
import { useMain } from '../../../context/main'

function DashTableCopy() {

  const { userData } = useMain()

  return (
    <>
        <div id="dashTableCopyContainer" className='font-["PT_SERIF"]'>
            {
              userData && userData.review_content ? (
                userData.review_content.length > 0 ? (
                  <p>Below are the venues you have reviewed.</p>
                ) : (
                  <p>You have yet to review any venues.</p>
                )
              ) : ''
            }
        </div>
    </>
  )
}

export default DashTableCopy