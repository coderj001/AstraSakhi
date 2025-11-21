import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { ShieldCheck } from './icons';

/**
 * Header Component
 * Displays navigation, logo, and login/register buttons.
 */
export default function Header({ setLanguage }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === 'en' ? 'es' : 'en'));
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-3xl font-bold text-indigo-600">
              <FormattedMessage id="app.title" />
            </Link>
            <ShieldCheck className="w-6 h-6 text-amber-500 ml-1" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-4">
            {/* <Link */}
            {/*   to='/' */}
            {/*   className='font-medium text-gray-600 hover:text-indigo-500' */}
            {/* > */}
            {/*   <FormattedMessage id='nav.home' /> */}
            {/* </Link> */}
            {/* <Link */}
            {/*   to='/about' */}
            {/*   className='font-medium text-gray-600 hover:text-indigo-500' */}
            {/* > */}
            {/*   <FormattedMessage id='nav.about' /> */}
            {/* </Link> */}
            {/* <Link */}
            {/*   to='/contact' */}
            {/*   className='font-medium text-gray-600 hover:text-indigo-500' */}
            {/* > */}
            {/*   <FormattedMessage id='nav.contact' /> */}
            {/* </Link> */}
            {/* <Link */}
            {/*   to='/astrologers' */}
            {/*   className='font-medium text-gray-600 hover:text-indigo-500' */}
            {/* > */}
            {/*   <FormattedMessage id='nav.astrologers' /> */}
            {/* </Link> */}
            <Link to="/free-kundli" className="font-medium text-gray-600 hover:text-indigo-500">
              <FormattedMessage id="nav.freeKundli" />
            </Link>
            <Link
              to="/chat-with-astrologer"
              className="font-medium text-gray-600 hover:text-indigo-500"
            >
              <FormattedMessage id="nav.chatWithAstrologer" />
            </Link>
            <Link to="/daily-horoscope" className="font-medium text-gray-600 hover:text-indigo-500">
              <FormattedMessage id="nav.dailyHoroscope" />
            </Link>
            <Link to="/kundli-matching" className="font-medium text-gray-600 hover:text-indigo-500">
              <FormattedMessage id="nav.kundliMatching" />
            </Link>
            <Link to="/compatibility" className="font-medium text-gray-600 hover:text-indigo-500">
              <FormattedMessage id="nav.compatibility" />
            </Link>
          </nav>

          {/* Auth Buttons (Desktop) */}
          <div className="hidden md:flex items-center space-x-2">
            <button
              onClick={toggleLanguage}
              className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100"
            >
              <FormattedMessage id="language.switcher" />
            </button>
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-sm"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-gray-700"
            >
              <span className="sr-only">Open menu</span>
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="flex flex-col space-y-2 p-4">
            <Link to="/" className="font-medium text-gray-600 hover:text-indigo-500">
              <FormattedMessage id="nav.home" />
            </Link>
            <Link to="/about" className="font-medium text-gray-600 hover:text-indigo-500">
              <FormattedMessage id="nav.about" />
            </Link>
            <Link to="/contact" className="font-medium text-gray-600 hover:text-indigo-500">
              <FormattedMessage id="nav.contact" />
            </Link>
            <Link to="/astrologers" className="font-medium text-gray-600 hover:text-indigo-500">
              <FormattedMessage id="nav.astrologers" />
            </Link>
            <Link to="/free-kundli" className="font-medium text-gray-600 hover:text-indigo-500">
              <FormattedMessage id="nav.freeKundli" />
            </Link>
            <Link
              to="/chat-with-astrologer"
              className="font-medium text-gray-600 hover:text-indigo-500"
            >
              <FormattedMessage id="nav.chatWithAstrologer" />
            </Link>
            <Link to="/daily-horoscope" className="font-medium text-gray-600 hover:text-indigo-500">
              <FormattedMessage id="nav.dailyHoroscope" />
            </Link>
            <Link to="/kundli-matching" className="font-medium text-gray-600 hover:text-indigo-500">
              <FormattedMessage id="nav.kundliMatching" />
            </Link>
            <Link to="/compatibility" className="font-medium text-gray-600 hover:text-indigo-500">
              <FormattedMessage id="nav.compatibility" />
            </Link>
          </nav>
          <div className="flex items-center space-x-2 p-4 border-t">
            <button
              onClick={toggleLanguage}
              className="w-full px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100"
            >
              <FormattedMessage id="language.switcher" />
            </button>
            <Link
              to="/login"
              className="w-full px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 text-center"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-sm text-center"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
