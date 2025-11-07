import React from 'react'
import { featuredAstrologers } from '../data/astrologers'
import AstrologerCard from '../components/AstrologerCard'

export default function ChatWithAstrologer() {
  return (
    <div className='bg-gray-50'>
      <div className='container mx-auto px-4 py-8'>
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold text-gray-800 mb-4'>
            Chat with an Astrologer
          </h1>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Connect with our expert astrologers and get instant guidance on your
            life, career, and relationships.
          </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
          {featuredAstrologers.map((astrologer) => (
            <AstrologerCard key={astrologer.id} astrologer={astrologer} />
          ))}
        </div>
      </div>
    </div>
  )
}
