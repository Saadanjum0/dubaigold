import React from 'react'
import GoldManagement from './GoldManagment'
import MobileGoldManagement from './MiniGoldmanagment'

const CombineGoldManagement = () => {
  return (
    <div>
        <div className=' block md:hidden' >
            <MobileGoldManagement/>
        </div>  
        <div className=' hidden md:block' >
            <GoldManagement/>
        </div>
    </div>
  )
}

export default CombineGoldManagement