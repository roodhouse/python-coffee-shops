import React from 'react'
import AddTitle from './addCopy/AddTitle'
import AddText from './addCopy/AddText'
import { useAddForm } from '../../context/addFormContext'

function AddCopy() {

  const { editReview } = useAddForm() 

  return (
    <>
        <div id="addCopyContainer">
            <div id="addTitleWrapper" className='mb-8'>
                <AddTitle copy={editReview === false ? 'Add New Venue' : `Edit Review for ${editReview.venue}`} />
            </div>
            <div id="addTextWrapper">
                <AddText />
            </div>
        </div>
    </>
  )
}

export default AddCopy