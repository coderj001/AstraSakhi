import React from 'react';
import AstrologerCard from './AstrologerCard';
import { featuredAstrologers } from '../data/astrologers';
import { Link } from 'react-router-dom';

/**
 * Astrologer List Section
 * Displays a grid of featured astrologers.
 */
export default function AstrologerList() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Talk to Our Top Verified Astrologers
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            Handpicked, rigorously verified experts ready to guide you 24/7.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {featuredAstrologers.slice(0, 4).map((astro) => (
            <AstrologerCard key={astro.id} astrologer={astro} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            to="/chat-with-astrologer"
            className="px-6 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-lg shadow-sm hover:bg-indigo-700"
          >
            View All Astrologers
          </Link>
        </div>
      </div>
    </section>
  );
}
