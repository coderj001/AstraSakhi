import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.js';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Astrologers from './pages/Astrologers';

import { IntlProvider } from 'react-intl';
import enMessages from './lang/en.json';
import esMessages from './lang/es.json';

const messages = {
  en: enMessages,
  es: esMessages,
};

/**
 * Main App Component
 * This is the root component that renders all other components.
 */
export default function App() {
  const [language, setLanguage] = useState(navigator.language.split(/[-_]/)[0]);

  return (
    <IntlProvider
      locale={language}
      messages={messages[language] || messages.en}
    >
      <div className="font-sans antialiased text-gray-900 bg-white">
        <Header setLanguage={setLanguage} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/astrologers" element={<Astrologers />} />
        </Routes>
        <Footer />
      </div>
    </IntlProvider>
  );
}
