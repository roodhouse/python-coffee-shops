import React from 'react'
import Item from '../statsShared/Item'

// need a for loop that goes through the category aggregate results and prints the icon and relative info

function ProductivityResults() {
  return (
    <>
        <div id="productivityResultsContainer">
            <div id="productivityWiFiWrapper">
                <Item type={'wifi'} name={'Stable Wi-Fi'}/>
            </div>
            <div id="productivityPowerWrapper">
                <Item type={'power'} name={'Power Sockets'}/>
            </div>
        </div>
    </>
  )
}

export default ProductivityResults