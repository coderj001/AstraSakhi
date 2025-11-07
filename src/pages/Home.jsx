import React from 'react'
import HeroSection from '../components/HeroSection'
import Services from '../components/Services'
import AstrologerList from '../components/AstrologerList'
import Testimonials from '../components/Testimonials'
import HowItWorks from '../components/HowItWorks'

export default function Home() {
  return (
    <>
      <main>
        <HeroSection />
        <Services />
        <AstrologerList />
        <Testimonials />
        <HowItWorks />
      </main>
    </>
  )
}
