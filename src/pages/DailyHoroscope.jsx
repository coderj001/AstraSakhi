import React from 'react'
import { zodiacSigns } from '../data/signs.js'

export default function DailyHoroscope() {
  const today = new Date()
  const formattedDate = today.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const predictions = [
    'Today is a day of new beginnings. Embrace change and take on new challenges with confidence.',
    'Focus on your financial goals today. Opportunities for growth may arise from unexpected sources.',
    'Communication is key. Express your thoughts clearly and listen actively to others.',
    'Nurture your relationships. Spend quality time with loved ones and strengthen your bonds.',
    'Your creativity is at its peak. Pursue your passions and let your unique talents shine.',
    'Organize your tasks and prioritize your responsibilities. Efficiency will lead to success.',
    'A surprising encounter could lead to an exciting opportunity. Keep an open mind.',
    'Trust your intuition today. It will guide you in making important decisions.',
    'Adventure awaits! Step out of your comfort zone and explore new possibilities.',
    'Patience is a virtue. Good things are coming your way, but they may take time.',
    'Your innovative ideas will be well-received. Share them with confidence.',
    'Take some time for self-reflection. It will bring you clarity and peace.',
  ]

  const horoscopes = zodiacSigns.map((sign, index) => ({
    ...sign,
    date: formattedDate,
    prediction: predictions[index],
  }))

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold text-center text-gray-800 mb-2'>
        Daily Horoscope
      </h1>
      <p className='text-center text-gray-600 mb-8'>
        Read your daily horoscope for {formattedDate}.
      </p>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {horoscopes.map((horoscope) => (
          <div
            key={horoscope.sign}
            className='bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300'
          >
            <img
              src={horoscope.image_url}
              alt={`${horoscope.sign} symbol`}
              className='w-20 h-20 mx-auto mb-4 rounded-full border-4 border-indigo-200'
            />
            <h2 className='text-2xl font-bold text-center text-indigo-600 mb-2'>
              {horoscope.sign}
            </h2>
            <p className='text-gray-500 text-sm text-center mb-1'>
              {horoscope.date_range}
            </p>
            <p className='text-gray-500 text-sm text-center mb-4'>
              {horoscope.date}
            </p>
            <p className='text-gray-700 text-center'>{horoscope.prediction}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
