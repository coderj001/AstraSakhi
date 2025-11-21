import React, { useState } from 'react';
import Autocomplete from '../components/Autocomplete';
import { useAutocomplete } from '../hooks/useAutocomplete';

const KundliForm = ({ title }) => {
  const { inputValue, suggestions, loading, onInputChange, onSuggestionClick } = useAutocomplete();
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">{title}</h2>
      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="dob" className="block text-gray-700 font-medium mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="tob" className="block text-gray-700 font-medium mb-2">
              Time of Birth
            </label>
            <input
              type="time"
              id="tob"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="pob" className="block text-gray-700 font-medium mb-2">
              Birth Place
            </label>
            <Autocomplete
              inputValue={inputValue}
              suggestions={suggestions}
              loading={loading}
              onInputChange={onInputChange}
              onSuggestionClick={onSuggestionClick}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default function KundliMatching() {
  const [activeTab, setActiveTab] = useState('boy');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Kundli Matching</h1>
      <p className="text-center text-gray-600 mb-8">
        Have you ever thought, “Are we made for each other?” That’s where Kundli matching comes in.
        It's been a trusted way for Indian families to find the right life partner for generations.
        This method uses the age-old science of astrology to see if two people are truly compatible
        for a happy and peaceful marriage.
      </p>
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-center border-b-2 border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('boy')}
            className={`px-6 py-3 text-lg font-medium focus:outline-none ${
              activeTab === 'boy'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Boy's Details
          </button>
          <button
            onClick={() => setActiveTab('girl')}
            className={`px-6 py-3 text-lg font-medium focus:outline-none ${
              activeTab === 'girl'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Girl's Details
          </button>
        </div>

        {activeTab === 'boy' ? (
          <KundliForm title="Fill Up Partner's Detail" />
        ) : (
          <KundliForm title="Fill Up Partner's Detail" />
        )}
      </div>
    </div>
  );
}
