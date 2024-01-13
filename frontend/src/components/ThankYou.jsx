import React from 'react'
import AddFormTitle from './add/forms/title/AddFormTitle'

function ThankYou() {
  return (
    <>
        <div id="thankYouContainer" className='mb-[295px] mt-[300px]'>
            <div id="thankyouTitleWrapper" className='text-center mb-[20px]'>
                <AddFormTitle section={'Thank You!'} />
            </div>
            <div id="thankYouCopyContainer" className='text-center'>
                <p>Your submission has been sent</p>
            </div>
        </div>
    </>
  )
}

export default ThankYou