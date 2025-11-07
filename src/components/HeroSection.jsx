import React from 'react'
import { ShieldCheck, Lock, Heart, ShoppingBag, ArrowRight } from './icons'
import { Link } from 'react-router-dom'

/**
 * Hero Section
 * Main landing page banner with CTA.
 */
export default function HeroSection() {
  return (
    <section className='bg-indigo-50'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center'>
        <h1 className='text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900'>
          Authentic Guidance,{' '}
          <span className='text-indigo-600'>Not Just Entertainment.</span>
        </h1>
        <p className='mt-4 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto'>
          Connect with 100%{' '}
          <span className='font-semibold'>Verified Astrologers</span> for
          trusted advice on love, career, and life. Your first 5 minutes are on
          us.
        </p>
        <div className='mt-8 flex justify-center space-x-4'>
          <Link
            to='/chat-with-astrologer'
            className='inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-lg shadow-sm hover:bg-indigo-700'
          >
            Start Your First Chat
            <ArrowRight className='w-5 h-5 ml-2' />
          </Link>
        </div>
        <div className='mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-center'>
          <div className='bg-white p-4 rounded-lg shadow-sm'>
            <Lock className='w-8 h-8 mx-auto text-indigo-500' />
            <p className='mt-2 text-sm font-medium text-gray-700'>
              Private & Secure
            </p>
          </div>
          <div className='bg-white p-4 rounded-lg shadow-sm'>
            <ShieldCheck className='w-8 h-8 mx-auto text-amber-500' />
            <p className='mt-2 text-sm font-medium text-gray-700'>
              100% Verified Experts
            </p>
          </div>
          <div className='bg-white p-4 rounded-lg shadow-sm'>
            <Heart className='w-8 h-8 mx-auto text-pink-500' />
            <p className='mt-2 text-sm font-medium text-gray-700'>
              10M+ Happy Users
            </p>
          </div>
          <div className='bg-white p-4 rounded-lg shadow-sm'>
            <ShoppingBag className='w-8 h-8 mx-auto text-green-500' />
            <p className='mt-2 text-sm font-medium text-gray-700'>
              Certified Remedies
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
