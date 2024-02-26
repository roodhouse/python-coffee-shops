import React, {useState} from 'react'
import { LoadScript, Autocomplete } from '@react-google-maps/api'
import { useMain } from '../../../../../../context/main';

function VenueInput({ register, errors, onLocationSelect }) {

    const { isLoaded } = useMain()
    const [ selectedLocation, setSelectedLocation ] = useState(null)

    const handlePlaceSelect = (place) => {
        setSelectedLocation(place)
    }

    const handleSubmit = () => {
        onLocationSelect(selectedLocation)
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSubmit()
        }
    }

  return isLoaded ? (
    <LoadScript libraries={['places']}>
      <Autocomplete onLoad={(autocomplete) => console.log('Autocomplete loaded:', autocomplete)}>
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
            onKeyDown={handleKeyDown}
          />
          {errors.location && <p>{errors.location.message}</p>}
        </div>
      </Autocomplete>
    </LoadScript>
  ) : <></>;
}

export default VenueInput