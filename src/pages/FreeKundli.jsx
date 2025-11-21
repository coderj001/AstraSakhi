import React, { useState } from 'react';

export default function FreeKundli() {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    day: '',
    month: '',
    year: '',
    hour: '',
    minute: '',
    second: '',
    birthPlace: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleGenderChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      gender: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    // Here you would typically send this data to an API
    alert('Horoscope Generated! (Check console for data)');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Free Kundli Online</h1>
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">New Kundli</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Gender</label>
              <div className="flex items-center mt-2">
                <label className="inline-flex items-center mr-6">
                  <input
                    type="radio"
                    className="form-radio text-indigo-600"
                    name="gender"
                    value="male"
                    checked={formData.gender === 'male'}
                    onChange={handleGenderChange}
                    required
                  />
                  <span className="ml-2 text-gray-700">Male</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-indigo-600"
                    name="gender"
                    value="female"
                    checked={formData.gender === 'female'}
                    onChange={handleGenderChange}
                    required
                  />
                  <span className="ml-2 text-gray-700">Female</span>
                </label>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Birth Details</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="day" className="block text-gray-700 font-medium mb-2">
                  Day
                </label>
                <input
                  type="number"
                  id="day"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="DD"
                  min="1"
                  max="31"
                  value={formData.day}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="month" className="block text-gray-700 font-medium mb-2">
                  Month
                </label>
                <input
                  type="number"
                  id="month"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="MM"
                  min="1"
                  max="12"
                  value={formData.month}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="year" className="block text-gray-700 font-medium mb-2">
                  Year
                </label>
                <input
                  type="number"
                  id="year"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="YYYY"
                  min="1900"
                  max="2100"
                  value={formData.year}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="hour" className="block text-gray-700 font-medium mb-2">
                  Hour
                </label>
                <input
                  type="number"
                  id="hour"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="HH"
                  min="0"
                  max="23"
                  value={formData.hour}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="minute" className="block text-gray-700 font-medium mb-2">
                  Minute
                </label>
                <input
                  type="number"
                  id="minute"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="MM"
                  min="0"
                  max="59"
                  value={formData.minute}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="second" className="block text-gray-700 font-medium mb-2">
                  Second
                </label>
                <input
                  type="number"
                  id="second"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="SS"
                  min="0"
                  max="59"
                  value={formData.second}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="birthPlace" className="block text-gray-700 font-medium mb-2">
              Birth Place
            </label>
            <input
              type="text"
              id="birthPlace"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter birth place"
              value={formData.birthPlace}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Generate Horoscope
          </button>
        </form>
      </div>
    </div>
  );
}
