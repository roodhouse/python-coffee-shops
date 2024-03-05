import React from 'react'
import StoreHeading from '../../storeShared/StoreHeading'
import ServiceResults from './serviceStats/ServiceResults'

function ServiceStats({current, page, data, reviewId}) {
  return (
    <>
        <div id={`serviceStatsContainer-${page}`}>
            <div id={`serviceStatsHeaderWrapper-${page}`}>
                <StoreHeading page={page} heading={'Service'} />
            </div>
            <div id={`serviceCategoryWrapper-${page}`}>
                <ServiceResults page={page} current={current} data={data} reviewId={reviewId} />
            </div>
        </div>
    </>
  )
}

export default ServiceStats