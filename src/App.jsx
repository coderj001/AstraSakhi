import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Astrologers from './pages/Astrologers'
import Login from './pages/Login'
import Signup from './pages/Signup'
import FreeKundli from './pages/FreeKundli'
import ChatWithAstrologer from './pages/ChatWithAstrologer'
import DailyHoroscope from './pages/DailyHoroscope'
import KundliMatching from './pages/KundliMatching'
import ChatPage from './pages/ChatPage.jsx'
import ScrollToTop from './components/ScrollToTop'

import { IntlProvider } from 'react-intl'
import enMessages from './lang/en.json'
import esMessages from './lang/es.json'

import './App.css'

const messages = {
  en: enMessages,
  es: esMessages,
}

function App() {
  const location = useLocation()
  const showHeaderFooter = !['/login', '/signup', '/chat/:id'].includes(
    location.pathname,
  )
  const [language, setLanguage] = React.useState(
    navigator.language.split(/[-_]/)[0],
  )

  return (
    <IntlProvider
      locale={language}
      messages={messages[language] || messages.en}
    >
      <ScrollToTop />
      <div className='font-sans antialiased text-gray-900 bg-white'>
        {showHeaderFooter && <Header setLanguage={setLanguage} />}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/astrologers' element={<Astrologers />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/free-kundli' element={<FreeKundli />} />
          <Route
            path='/chat-with-astrologer'
            element={<ChatWithAstrologer />}
          />
          <Route path='/daily-horoscope' element={<DailyHoroscope />} />
          <Route path='/kundli-matching' element={<KundliMatching />} />
          <Route path='/chat/:id' element={<ChatPage />} />
        </Routes>
        {showHeaderFooter && <Footer />}
      </div>
    </IntlProvider>
  )
}

export default App
