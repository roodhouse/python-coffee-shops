import React from 'react'
import StoreHeading from '../../storeShared/StoreHeading'
import ProductivityResults from './productivity/ProductivityResults'

function ProductivityStats({current, page, data, reviewId}) {
  
  return (
    <>
        <div id={`productivityStatsContainer-${page}`}>
            <div id={`productivityStatsHeaderWrapper-${page}`}>
                <StoreHeading page={page} heading={'Productivity'} />
            </div>
            <div id={`productivityCategoryWrapper-${page}`}>
                <ProductivityResults current={current} page={page} data={data} reviewId={reviewId} />
            </div>
        </div>
    </>
  )
}

export default ProductivityStats