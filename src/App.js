import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Services from './components/Services';
import AstrologerList from './components/AstrologerList';
import Testimonials from './components/Testimonials';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';

/**
 * Main App Component
 * This is the root component that renders all other components.
 */
export default function App() {
  return (
    <div className="font-sans antialiased text-gray-900 bg-white">
      <Header />
      <main>
        <HeroSection />
        <Services />
        <AstrologerList />
        <Testimonials />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
}
