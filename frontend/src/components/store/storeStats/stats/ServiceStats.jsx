import React from 'react'
import StoreHeading from '../../storeShared/StoreHeading'
import ServiceResults from './serviceStats/ServiceResults'

function ServiceStats({current}) {
  return (
    <>
        <div id="serviceStatsContainer">
            <div id="serviceStatsHeaderWrapper">
                <StoreHeading heading={'Service'} />
            </div>
            <div id="serviceCategoryWrapper">
                <ServiceResults current={current} />
            </div>
        </div>
    </>
  )
}

export default ServiceStats