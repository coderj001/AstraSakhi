import React from 'react';
import { testimonials } from '../data/testimonials';

/**
 * Testimonials Section
 * Shows user reviews to build trust.
 */
export default function Testimonials() {
  return (
    <section className="py-16 bg-indigo-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Why People Trust AstroAI</h2>
          <p className="mt-3 text-lg text-gray-600">Real stories from our satisfied users.</p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600">
                  {testimonial.name.substring(0, 1)}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm font-medium text-indigo-600">{testimonial.service}</p>
                </div>
              </div>
              <p className="mt-4 text-base text-gray-700 italic">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
