import React from 'react'
import DashTableCopy from './dashTable/DashTableCopy'
import DashVenueTable from './dashTable/DashVenueTable'

function DashTable() {
  return (
    <>
        <div id="dashTableContainer">
            <div id="dashTableCopyWrapper" className='mb-9'>
                <DashTableCopy />
            </div>
            <div id="dashVenueTableWrapper" className='font-["PT_SERIF"]'>
                <DashVenueTable />
            </div>
        </div>
    </>
  )
}

export default DashTable