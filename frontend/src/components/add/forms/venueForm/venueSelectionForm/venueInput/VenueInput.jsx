import React, { useState, useEffect } from 'react'
import { initMap } from '../../../../../../utils/mapFunctions/initMap'
import { useMain } from '../../../../../../context/main'
import { useAddForm } from '../../../../../../context/addFormContext'

function VenueInput({ register, errors }) {

    const [ selectedLocation, setSelectedLocation ] = useState(null)
    const { home } = useMain()
    const { step, onLocationSelect } = useAddForm()

    // const handlePlaceSelect = (place) => {
    //     setSelectedLocation(place)
    //     // onLocationSelect(place)
    // }

    // const handleSubmit = () => {
    //     onLocationSelect(selectedLocation)
    // }

    // const handleKeyDown = (event) => {
    //     if (event.key === 'Enter') {
    //         handleSubmit()
    //     }
    // }

    // useEffect(() => {
    //     if ( home === 'suggest' && step === 'venue')
    //     initMap()
    // },[home, step])

    useEffect(() => {
        const fetchData = async () => {
            if (home === 'suggest' && step === 'venue') {
                try {
                    const place = await initMap()
                    setSelectedLocation(place)
                    onLocationSelect(place)
                } catch (error) {
                    console.error(error)
                }
            }
        };
        fetchData();
    }, [home, step]);

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
            // onKeyDown={handleKeyDown}
          />
          {errors.location && <p>{errors.location.message}</p>}
        </div>
  )
}

export default VenueInput