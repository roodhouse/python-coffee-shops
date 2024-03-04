import React from 'react'
import DashTableCopy from './dashTable/DashTableCopy'
import DashVenueTable from './dashTable/DashVenueTable'

function DashTable() {
  return (
    <>
        <div id="dashTableContainer" className='flex flex-col items-center'>
            <div id="dashTableCopyWrapper" className='w-full mb-9'>
                <DashTableCopy />
            </div>
            <div id="dashVenueTableWrapper" className='w-full font-["PT_SERIF"]'>
                <DashVenueTable />
            </div>
        </div>
    </>
  )
}

export default DashTable