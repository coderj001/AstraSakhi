import React, { useState, useEffect } from 'react'
import apiService from '../services/api'
import { zodiacSigns } from '../data/signs.js'

export default function DailyHoroscope() {
  const [horoscopes, setHoroscopes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedSign, setSelectedSign] = useState(null)

  const today = new Date()
  const formattedDate = today.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  useEffect(() => {
    const fetchHoroscopes = async () => {
      try {
        const response = await apiService.getDailyHoroscope()
        const mergedHoroscopes = response.data.map((apiHoroscope) => {
          const localSign = zodiacSigns.find(
            (sign) =>
              sign.sign.toLowerCase() === apiHoroscope.zodiac.toLowerCase(),
          )
          return {
            ...apiHoroscope,
            image_url: localSign
              ? localSign.image_url
              : '/path/to/default/image.png',
            date_range: localSign ? localSign.date_range : '',
          }
        })
        setHoroscopes(mergedHoroscopes)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    fetchHoroscopes()
  }, [])

  const openModal = (sign) => {
    setSelectedSign(sign)
  }

  const closeModal = () => {
    setSelectedSign(null)
  }

  if (loading) {
    return (
      <div className='text-center text-gray-600'>Loading horoscopes...</div>
    )
  }

  if (error) {
    return (
      <div className='text-center text-red-600'>Error: {error.message}</div>
    )
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold text-center text-gray-800 mb-2'>
        Daily Horoscope
      </h1>
      <p className='text-center text-gray-600 mb-8'>
        Read your daily horoscope for {formattedDate}.
      </p>
      <div className='grid grid-cols-3 grid-rows-4 gap-8'>
        {horoscopes.map((horoscope) => (
          <div
            key={horoscope.zodiac}
            className='bg-white rounded-lg shadow-lg p-6 text-center cursor-pointer transform transition-all duration-300 ease-out hover:scale-105'
            onClick={() => openModal(horoscope)}
          >
            <img
              src={horoscope.image_url}
              alt={`${horoscope.zodiac} symbol`}
              className='w-24 h-24 mx-auto rounded-full border-4 border-indigo-200'
            />
            <h2 className='text-xl font-bold text-indigo-600 mt-4'>
              {horoscope.zodiac}
            </h2>
          </div>
        ))}
      </div>

      {selectedSign && (
        <div
          className='fixed inset-0 bg-white bg-opacity-20 flex items-center justify-center z-50 transition-opacity duration-300 ease-out'
          onClick={closeModal}
        >
          <div
            className='bg-white rounded-lg shadow-xl p-8 max-w-lg w-full transform transition-all duration-300 ease-out animate-slide-up'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='flex items-center mb-4'>
              <img
                src={selectedSign.image_url}
                alt={`${selectedSign.zodiac} symbol`}
                className='w-16 h-16 mr-4 rounded-full border-4 border-indigo-200'
              />
              <div>
                <h2 className='text-2xl font-bold text-indigo-600'>
                  {selectedSign.zodiac}
                </h2>
                <p className='text-gray-500 text-sm'>
                  {selectedSign.date_range}
                </p>
              </div>
            </div>
            <div
              className='text-gray-700 max-h-[70vh] overflow-y-auto pr-4'
              dangerouslySetInnerHTML={{ __html: selectedSign.combinedResult }}
            ></div>
            <button
              onClick={closeModal}
              className='mt-6 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors'
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
