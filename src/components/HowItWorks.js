import React from 'react';

/**
 * How It Works Section
 * Simple 3-step guide.
 */
export default function HowItWorks() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Get Started in 3 Simple Steps
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            Your journey to clarity is just a few clicks away.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {/* Step 1 */}
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center h-20 w-20 bg-indigo-100 text-indigo-600 rounded-full text-3xl font-bold">
              1
            </div>
            <h3 className="mt-4 text-xl font-semibold text-gray-900">
              Sign Up & Recharge
            </h3>
            <p className="mt-2 text-base text-gray-600">
              Create your secure account and add funds to your wallet.
            </p>
          </div>
          {/* Step 2 */}
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center h-20 w-20 bg-indigo-100 text-indigo-600 rounded-full text-3xl font-bold">
              2
            </div>
            <h3 className="mt-4 text-xl font-semibold text-gray-900">
              Choose Your Expert
            </h3>
            <p className="mt-2 text-base text-gray-600">
              Browse verified astrologers. Filter by specialty, rating, or
              price.
            </p>
          </div>
          {/* Step 3 */}
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center h-20 w-20 bg-indigo-100 text-indigo-600 rounded-full text-3xl font-bold">
              3
            </div>
            <h3 className="mt-4 text-xl font-semibold text-gray-900">
              Start Your Consultation
            </h3>
            <p className="mt-2 text-base text-gray-600">
              Connect instantly via chat or call and find the answers you seek.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
