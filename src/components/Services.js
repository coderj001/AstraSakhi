import React from 'react';
import { services } from '../data/services';

/**
 * Services Section
 * Displays the main services offered (Chat, Call, etc.).
 */
export default function Services() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Your Personal Guidance Awaits</h2>
          <p className="mt-3 text-lg text-gray-600">Choose the best way to connect with your trusted expert.</p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div key={service.name} className={`p-6 rounded-lg shadow-lg ${service.bg} flex flex-col items-center text-center`}>
              <div className={`flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-white`}>
                <service.icon className={`h-8 w-8 ${service.color}`} />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">{service.name}</h3>
              <p className="mt-2 text-base text-gray-700">{service.description}</p>
              <button className={`mt-6 w-full px-4 py-2 text-sm font-medium text-white ${service.color.replace('text', 'bg').replace('-500', '-600')} rounded-lg hover:${service.color.replace('text', 'bg').replace('-500', '-700')}`}>
                Find Experts
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
