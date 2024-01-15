import React from 'react'
import StoreSummaryCopy from './storeSummary/StoreSummaryCopy'
import StoreSummaryIcons from './storeSummary/StoreSummaryIcons'
import Divider from '../shared/divider/Divider'

function StoreSummary() {
  return (
    <>
      <div id="storeSummaryContainer">
        <div id="summaryStoreCopyWrapper">
          <StoreSummaryCopy />
        </div>
        <div id="summaryStoreIconsWrapper">
          <StoreSummaryIcons />
        </div>
        <div><Divider /></div>
      </div>
    </>
  )
}

export default StoreSummary