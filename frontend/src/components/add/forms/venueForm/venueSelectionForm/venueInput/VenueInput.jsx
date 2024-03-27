import React, { useState, useEffect } from 'react'
import { initMap } from '../../../../../../utils/mapFunctions/initMap'
import { useMain } from '../../../../../../context/main'
import { useAddForm } from '../../../../../../context/addFormContext'

function VenueInput({ register, errors, reset, watch, onSubmitCallback }) {

    const { home } = useMain()
    const { step, onLocationSelect, formData } = useAddForm()

    const selectedLocation = watch('venue')

    useEffect(() => {

        let longitude;
        let latitude;
        if (formData && formData.geometry && formData.geometry.viewport) {
          
          longitude = formData.geometry.viewport.Jh.hi
          latitude = formData.geometry.viewport.Zh.hi
        } else {
          longitude = -97.85050201416016
          latitude = 30.627946853637695
        }

        const fetchData = async () => {
            if (home === 'suggest' && step === 'venue') { 
                try {
                    const place = await initMap(longitude, latitude, onSubmitCallback)
                    onLocationSelect(place)
                } catch (error) {
                    console.error(error)
                }

              } else if (home !== 'suggest') {
                onLocationSelect(null)
                reset()
              }
            };
            fetchData();
    }, [home, step, selectedLocation,]);

  return (
        <div id="venueInputContainer">
          <input
            type="text"
            id="venueInput"
            name="venueInput"
            placeholder="Enter a location"
            className="w-full px-2 py-2 border border-[#ced4da] rounded"
            {...register("venue", {
              required: "Can't be empty",
            })}
          />
          {errors.location && <p>{errors.location.message}</p>}
        </div>
  )
}

export default VenueInput