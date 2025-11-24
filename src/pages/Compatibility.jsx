import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { zodiacSigns } from '../data/signs';

export default function Compatibility() {
  const [yourSign, setYourSign] = useState('');
  const [partnerSign, setPartnerSign] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (yourSign && partnerSign) {
      navigate(`/compatibility-result?yourSign=${yourSign}&partnerSign=${partnerSign}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-800 text-white py-12 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200 mb-4 drop-shadow-sm">
            Love Compatibility
          </h1>
          <p className="text-lg text-purple-100/80 max-w-2xl mx-auto leading-relaxed">
            Discover the cosmic connection between you and your partner. Select your zodiac signs to
            reveal your compatibility score.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-md mx-auto backdrop-blur-xl bg-white/10 p-8 rounded-3xl shadow-2xl border border-white/20 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-80"></div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="yourSign"
                className="text-sm font-semibold text-purple-100 tracking-wide uppercase"
              >
                Your Sign
              </label>
              <div className="relative">
                <select
                  id="yourSign"
                  value={yourSign}
                  onChange={(e) => setYourSign(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-purple-200/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white appearance-none transition-all duration-300 hover:bg-white/10 cursor-pointer"
                  required
                >
                  <option value="" className="bg-gray-900 text-gray-400">
                    Select your sign
                  </option>
                  {zodiacSigns.map((sign) => (
                    <option key={sign.sign} value={sign.sign} className="bg-gray-900">
                      {sign.sign}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-purple-200">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="partnerSign"
                className="text-sm font-semibold text-purple-100 tracking-wide uppercase"
              >
                Partner's Sign
              </label>
              <div className="relative">
                <select
                  id="partnerSign"
                  value={partnerSign}
                  onChange={(e) => setPartnerSign(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-purple-200/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white appearance-none transition-all duration-300 hover:bg-white/10 cursor-pointer"
                  required
                >
                  <option value="" className="bg-gray-900 text-gray-400">
                    Select partner's sign
                  </option>
                  {zodiacSigns.map((sign) => (
                    <option key={sign.sign} value={sign.sign} className="bg-gray-900">
                      {sign.sign}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-purple-200">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(167, 139, 250, 0.5)' }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300"
            >
              Check Compatibility
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
