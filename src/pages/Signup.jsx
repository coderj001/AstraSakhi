import React from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

export default function Signup() {
  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-50'>
      <div className='w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md'>
        <div className='text-center'>
          <h2 className='text-3xl font-bold text-indigo-600'>
            <FormattedMessage id='app.title' />
          </h2>
          <p className='mt-2 text-gray-600'>
            <FormattedMessage id='signup.title' />
          </p>
          <Link
            to='/'
            className='text-sm font-medium text-indigo-600 hover:text-indigo-500'
          >
            <FormattedMessage id='app.homeLink' />
          </Link>
        </div>
        <form className='space-y-6'>
          <div>
            <label
              htmlFor='name'
              className='block text-sm font-medium text-gray-700'
            >
              <FormattedMessage id='signup.name' />
            </label>
            <input
              id='name'
              name='name'
              type='text'
              autoComplete='name'
              required
              className='w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
            />
          </div>
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700'
            >
              <FormattedMessage id='signup.email' />
            </label>
            <input
              id='email'
              name='email'
              type='email'
              autoComplete='email'
              required
              className='w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
            />
          </div>
          <div>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-700'
            >
              <FormattedMessage id='signup.password' />
            </label>
            <input
              id='password'
              name='password'
              type='password'
              autoComplete='new-password'
              required
              className='w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
            />
          </div>
          <div>
            <button
              type='submit'
              className='w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-sm'
            >
              <FormattedMessage id='signup.submit' />
            </button>
          </div>
        </form>
        <p className='text-sm text-center text-gray-600'>
          <FormattedMessage id='signup.haveAccount' />{' '}
          <Link
            to='/login'
            className='font-medium text-indigo-600 hover:text-indigo-500'
          >
            <FormattedMessage id='signup.loginLink' />
          </Link>
        </p>
      </div>
    </div>
  )
}
