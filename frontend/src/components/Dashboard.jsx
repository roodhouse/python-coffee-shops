import React from 'react'
import DashTitle from './dashboard/DashTitle'
import DashWelcome from './dashboard/DashWelcome'
import DashTable from './dashboard/DashTable'
import Logout from './shared/logout/Logout'

// remove mb from dashboardContainer when tables are added

function Dashboard() {
  return (
    <>
        <div id="dashboardContainer" className='flex flex-wrap items-center mb-[396px]'>
            <div id="dashTitleWrapper" className='mb-9 text-center w-full px-[.75rem]'>
                <DashTitle />
            </div>
            <div id="dashWelcomeWrapper" className='w-full mb-9'>
                <DashWelcome />
            </div>
            <div id="dashTableWrapper" className='w-full mb-9 px-[.75rem]'>
                <DashTable />
            </div>
            <div id="dashLogoutContainer" className='flex w-full justify-center px-[.75rem]'>
                <Logout name={'Logout'} type={'button'} />
            </div>
        </div>
    </>
  )
}

export default Dashboard