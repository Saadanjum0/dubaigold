import React from 'react'
import HeroSection from './Herosection'
import Verifygold from './Verifygold'
import AtombeatFooter from './Footer'
import Navbar from './Navbar'

const Mainsection = () => {
  return (
    <div>
        <Navbar/>
        <HeroSection/>
        <Verifygold/>
        <AtombeatFooter/>
    </div>
  )
}

export default Mainsection