import React from 'react'
import { divineEntities } from '../data/dinines'
import { Link } from 'react-router-dom'

/**
 * DivyaVaani AI Chat Page
 * Displays a list of divine entities for users to converse with.
 */
export default function DivyaVaaniAIChat() {
  return (
    <section className='py-16 bg-white'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center'>
          <h2 className='text-3xl font-extrabold text-gray-900'>
            Converse with the Divine Within
          </h2>
          <p className='mt-3 text-lg text-gray-600'>
            Choose a divine entity to start your spiritual conversation.
          </p>
        </div>
        <div className='mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {divineEntities.map((entity) => (
            <div
              key={entity.id}
              className='p-6 rounded-lg shadow-lg bg-amber-50 flex flex-col items-center text-center'
            >
              <img
                src={entity.image}
                alt={entity.name}
                className='h-24 w-24 rounded-full object-cover'
              />
              <h3 className='mt-4 text-xl font-semibold text-gray-900'>
                {entity.name}
              </h3>
              <p className='mt-2 text-base text-gray-700'>
                {entity.description}
              </p>
              <Link
                to={`/chat/${entity.id}`}
                className='mt-6 w-full px-4 py-2 text-sm font-medium text-white bg-amber-600 rounded-lg hover:bg-amber-700'
              >
                Chat with {entity.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
