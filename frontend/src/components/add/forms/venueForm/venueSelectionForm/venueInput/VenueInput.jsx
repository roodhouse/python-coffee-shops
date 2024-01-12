import React from 'react'

function VenueInput({ register, errors }) {
  return (
    <>
        <div id="venueInputContainer">
            <input 
                type="text"
                id='venueInput'
                name='venueInput'
                placeholder='Enter a location'
                className='w-full px-2 py-2 border border-[#ced4da] rounded'
                {...register("venue", {
                    required: 'Can\'t be empty'
                })}
            />
            { errors.location && (
                <p>{errors.location.message}</p>
            )}
        </div>
    </>
  )
}

export default VenueInput