import React from 'react'

function Address({ address }) {

  const parsedLocation = () => {
    if (address) {
      const street = address.split(",")
      console.log(street)
      return street[0]
    } else {
      const street = ''
      return street
    }
  }

  return (
    <>
        <div id="addressContainer">
            <p>{parsedLocation()}</p>
        </div>
    </>
  )
}

export default Address