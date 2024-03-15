import React, { useState, useEffect } from 'react'
import Uppy from '@uppy/core'
import { DragDrop } from '@uppy/react'
import XHR from '@uppy/xhr-upload'

import '@uppy/core/dist/style.min.css'
import '@uppy/drag-drop/dist/style.min.css'

function ModCustomImage({user}) {

  const [ uppy, setUppy ] = useState(() => {
    const up = new Uppy({
      debug: true,
      autoProceed: true,
      restrictions: {
        maxNumberOfFiles: 1,
        maxFileSize: 100 * 1024 * 1024,
        allowedFileTypes: ['image/*'],
      },
    })
    .use(XHR, {
      endpoint: `http://127.0.0.1:5000/api/user/${user}`,
      method: 'PATCH',
      headers: {
        'Authorization' : `Bearer ${localStorage.getItem('id_token')}`
      }
    })

    // listen for upload success event
    up.on('upload-success', (file, response) => {
      console.log('Upload Successful: ', file, response)
    })

    // listen for upload error event
    up.on('upload-error', (file, error, response) => {
      console.error('Upload error: ', file, error, response)
    })

    return up
  })

  useEffect(() => {
    // cleanup on component unmount
    return () => uppy.close()
  }, [uppy])
  
  const handleDragOver = () => {
    console.log('over')
  }

  const handleDragLeave = () => {
    console.log('leave')
  }

  const handleDrop = () => {
    console.log('drop')
  }

  console.log(uppy)
  console.log(user)

  return (
    <>
        <div id="modCustomUserContainer">
            <DragDrop
              uppy={uppy} 
              note={'Images only'} 
              locale={{strings: {dropHereOr: 'drop it like it is hot'}}}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            />
        </div>
    </>
  )
}

export default ModCustomImage