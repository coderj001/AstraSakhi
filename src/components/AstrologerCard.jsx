import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Star, MessageCircle, Phone } from './icons';

/**
 * Astrologer Card Component
 * A single card for displaying an astrologer.
 */
export default function AstrologerCard({ astrologer }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 transform transition-all hover:scale-[1.02] hover:shadow-xl">
      <div className="p-4">
        <div className="flex space-x-4">
          <img
            className="w-20 h-20 rounded-full border-4 border-indigo-100 mask-radial-at-center mask-radial-from-100%"
            src={astrologer.image}
            alt={astrologer.name}
            onError={(e) => {
              e.target.src = 'https://placehold.co/100x100/CCCCCC/FFFFFF?text=User';
            }}
          />
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{astrologer.name}</h3>
                {astrologer.verified && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <ShieldCheck className="w-3 h-3 mr-1" />
                    Verified
                  </span>
                )}
              </div>
              <div className="flex items-center px-2 py-1 bg-amber-100 text-amber-800 rounded-md">
                <Star className="w-4 h-4 text-amber-500" />
                <span className="ml-1 text-sm font-bold">{astrologer.rating}</span>
              </div>
            </div>
            <p className="mt-1 text-sm text-gray-600 truncate">
              {astrologer.specialties.join(', ')}
            </p>
            <p className="mt-1 text-sm text-gray-500">{astrologer.experience} yrs exp.</p>
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div>
            <span className="text-xl font-bold text-indigo-600">₹{astrologer.price}</span>
            <span className="text-sm text-gray-500">/min</span>
          </div>
          <div className="flex space-x-2">
            <Link
              to={`/chat/${astrologer.id}`}
              className="px-3 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100"
            >
              <MessageCircle className="w-4 h-4 inline mr-1" />
              Chat
            </Link>
            <button className="px-3 py-2 text-sm font-medium text-green-600 bg-green-50 rounded-lg hover:bg-green-100">
              <Phone className="w-4 h-4 inline mr-1" />
              Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
