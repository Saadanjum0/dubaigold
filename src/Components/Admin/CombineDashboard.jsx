import React from 'react'
import MiniDashboard from './MiniDashboard'
import AdminDashboard from './AdminDashboard'

const CombineDashboard = () => {
  return (
    <div>
        <div className='block md:hidden' >
            <MiniDashboard/>
        </div>
        <div className=' hidden md:block' >
            <AdminDashboard/>
        </div>
    </div>
  )
}

export default CombineDashboard