import React from 'react'
import { useAddForm } from '../../../../../../context/addFormContext'
import GMap from '../../../../../GMap'

function ConfirmMap() { 

  const { formData } = useAddForm() 

 let longitude = -97.85050201416016; 
 let latitude = 30.627946853637695;

 if (formData && formData.geometry && formData.geometry.viewport) {
  longitude = formData.geometry.viewport.Jh.hi
  latitude = formData.geometry.viewport.Zh.hi
 }

  
  return (
    <>
        <div id="confirmMapContainer">
            <GMap longitude={longitude} latitude={latitude} type={'small'} />
        </div>
    </>
  )
}

export default ConfirmMap