import React from 'react';

export default function DailyHoroscope() {
  const horoscopes = [
    {
      sign: 'Aries',
      date: 'November 5, 2025',
      prediction:
        'Today is a day of new beginnings. Embrace change and take on new challenges with confidence.',
    },
    {
      sign: 'Taurus',
      date: 'November 5, 2025',
      prediction:
        'Focus on your financial goals today. Opportunities for growth may arise from unexpected sources.',
    },
    {
      sign: 'Gemini',
      date: 'November 5, 2025',
      prediction:
        'Communication is key. Express your thoughts clearly and listen actively to others.',
    },
    {
      sign: 'Cancer',
      date: 'November 5, 2025',
      prediction:
        'Nurture your relationships. Spend quality time with loved ones and strengthen your bonds.',
    },
    {
      sign: 'Leo',
      date: 'November 5, 2025',
      prediction:
        'Your creativity is at its peak. Pursue your passions and let your unique talents shine.',
    },
    {
      sign: 'Virgo',
      date: 'November 5, 2025',
      prediction:
        'Organize your tasks and prioritize your responsibilities. Efficiency will lead to success.',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Daily Horoscope
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Read your daily horoscope for November 5, 2025.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {horoscopes.map((horoscope) => (
          <div
            key={horoscope.sign}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <h2 className="text-xl font-semibold text-indigo-600 mb-2">
              {horoscope.sign}
            </h2>
            <p className="text-gray-500 text-sm mb-4">{horoscope.date}</p>
            <p className="text-gray-700">{horoscope.prediction}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
