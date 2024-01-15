import React from 'react'
import StoreHeading from '../../storeShared/StoreHeading'
import ProductivityResults from './productivity/ProductivityResults'

function ProductivityStats() {
  return (
    <>
        <div id="productivityStatsContainer">
            <div id="productivityStatsHeaderWrapper">
                <StoreHeading heading={'Productivity'} />
            </div>
            <div id="productivityCategoryWrapper">
                <ProductivityResults />
            </div>
        </div>
    </>
  )
}

export default ProductivityStats