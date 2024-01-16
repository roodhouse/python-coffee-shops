import React from 'react'
import DashTitle from './dashboard/DashTitle'
import DashWelcome from './dashboard/DashWelcome'
import DashTable from './dashboard/DashTable'

function Dashboard() {
  return (
    <>
        <div id="dashboardContainer" className='flex flex-wrap items-center'>
            <div id="dashTitleWrapper" className='mb-9 text-center w-full'>
                <DashTitle />
            </div>
            <div id="dashWelcomeWrapper" className='w-full mb-9'>
                <DashWelcome />
            </div>
            <div id="dashTableWrapper">
                <DashTable />
            </div>
        </div>
    </>
  )
}

export default Dashboard