import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { zodiacSigns } from '../data/signs'

export default function Compatibility() {
  const [yourSign, setYourSign] = useState('')
  const [partnerSign, setPartnerSign] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (yourSign && partnerSign) {
      navigate(
        `/compatibility-result?yourSign=${yourSign}&partnerSign=${partnerSign}`,
      )
    }
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg text-center'>
        <h1 className='text-3xl font-bold text-gray-800 mb-2'>
          Are you compatible?
        </h1>
        <p className='text-gray-600 mb-6'>
          Choose your and your partner's zodiac sign to check compatibility.
        </p>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label
              htmlFor='yourSign'
              className='block text-gray-700 font-medium mb-2'
            >
              Your Sign
            </label>
            <select
              id='yourSign'
              value={yourSign}
              onChange={(e) => setYourSign(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
              required
            >
              <option value='' disabled>
                Select your sign
              </option>
              {zodiacSigns.map((sign) => (
                <option key={sign.sign} value={sign.sign}>
                  {sign.sign}
                </option>
              ))}
            </select>
          </div>
          <div className='mb-6'>
            <label
              htmlFor='partnerSign'
              className='block text-gray-700 font-medium mb-2'
            >
              Partner's Sign
            </label>
            <select
              id='partnerSign'
              value={partnerSign}
              onChange={(e) => setPartnerSign(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
              required
            >
              <option value='' disabled>
                Select partner's sign
              </option>
              {zodiacSigns.map((sign) => (
                <option key={sign.sign} value={sign.sign}>
                  {sign.sign}
                </option>
              ))}
            </select>
          </div>
          <button
            type='submit'
            className='w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500'
          >
            Check Compatibility
          </button>
        </form>
      </div>
    </div>
  )
}
