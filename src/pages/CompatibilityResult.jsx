import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { zodiacSigns } from '../data/signs'

const CompatibilityProgressBar = ({ category, percentage }) => (
  <div className='mb-6'>
    <div className='flex justify-between items-center mb-1'>
      <span className='text-lg font-medium text-gray-700'>{category}</span>
      <span className='text-lg font-bold text-indigo-600'>{percentage}%</span>
    </div>
    <div className='w-full bg-gray-200 rounded-full h-4'>
      <div
        className='bg-indigo-600 h-4 rounded-full'
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  </div>
)

export default function CompatibilityResult() {
  const [searchParams] = useSearchParams()
  const yourSign = searchParams.get('yourSign')
  const partnerSign = searchParams.get('partnerSign')

  const yourSignData = zodiacSigns.find((s) => s.sign === yourSign)
  const partnerSignData = zodiacSigns.find((s) => s.sign === partnerSign)

  // Dummy compatibility data - replace with real logic later
  const compatibilityData = {
    love: Math.floor(Math.random() * 51) + 50, // 50-100%
    sex: Math.floor(Math.random() * 51) + 50,
    friendship: Math.floor(Math.random() * 51) + 50,
    communication: Math.floor(Math.random() * 51) + 50,
    trust: Math.floor(Math.random() * 51) + 50,
  }

  if (!yourSignData || !partnerSignData) {
    return (
      <div className='container mx-auto px-4 py-8 text-center'>
        <h1 className='text-2xl font-bold text-red-600'>
          Invalid Zodiac Signs Selected
        </h1>
        <p className='text-gray-600'>
          Please go back and select valid signs to check compatibility.
        </p>
      </div>
    )
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-2xl'>
        <div className='flex justify-center items-center mb-6'>
          <div className='text-center'>
            <img
              src={yourSignData.image_url}
              alt={yourSign}
              className='w-24 h-24 mx-auto rounded-full border-4 border-indigo-500'
            />
            <h2 className='text-2xl font-bold mt-2'>{yourSign}</h2>
          </div>
          <span className='text-4xl font-bold text-gray-500 mx-8'>&</span>
          <div className='text-center'>
            <img
              src={partnerSignData.image_url}
              alt={partnerSign}
              className='w-24 h-24 mx-auto rounded-full border-4 border-pink-500'
            />
            <h2 className='text-2xl font-bold mt-2'>{partnerSign}</h2>
          </div>
        </div>
        <h1 className='text-3xl font-bold text-center text-gray-800 mb-2'>
          {yourSign} & {partnerSign} Zodiac Compatibility
        </h1>
        <p className='text-center text-gray-600 mb-8'>
          Love, sex, friendship & more
        </p>

        <div>
          <CompatibilityProgressBar
            category='Love'
            percentage={compatibilityData.love}
          />
          <CompatibilityProgressBar
            category='Sex'
            percentage={compatibilityData.sex}
          />
          <CompatibilityProgressBar
            category='Friendship'
            percentage={compatibilityData.friendship}
          />
          <CompatibilityProgressBar
            category='Communication'
            percentage={compatibilityData.communication}
          />
          <CompatibilityProgressBar
            category='Trust'
            percentage={compatibilityData.trust}
          />
        </div>
      </div>
    </div>
  )
}
