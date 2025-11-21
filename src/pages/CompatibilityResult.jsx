import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { zodiacSigns } from '../data/signs';
import apiService from '../services/api';

const CompatibilityProgressBar = ({ category, percentage }) => (
  <div className="mb-6">
    <div className="flex justify-between items-center mb-1">
      <span className="text-lg font-medium text-gray-700">{category}</span>
      <span className="text-lg font-bold text-indigo-600">{percentage}%</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-4">
      <div className="bg-indigo-600 h-4 rounded-full" style={{ width: `${percentage}%` }}></div>
    </div>
  </div>
);

export default function CompatibilityResult() {
  const [searchParams] = useSearchParams();
  const yourSign = searchParams.get('yourSign');
  const partnerSign = searchParams.get('partnerSign');
  const [compatibilityData, setCompatibilityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const yourSignData = zodiacSigns.find((s) => s.sign === yourSign);
  const partnerSignData = zodiacSigns.find((s) => s.sign === partnerSign);

  useEffect(() => {
    if (yourSign && partnerSign) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const data = await apiService.getCompatibility(yourSign, partnerSign);
          setCompatibilityData(data.data);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [yourSign, partnerSign]);

  const navigate = useNavigate();
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-red-600">Error fetching compatibility data</h1>
        <p className="text-gray-600">{error.message}</p>
      </div>
    );
  }

  if (!yourSignData || !partnerSignData) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-red-600">Invalid Zodiac Signs Selected</h1>
        <p className="text-gray-600">
          Please go back and select valid signs to check compatibility.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-2xl">
        <div className="flex justify-center items-center mb-6">
          <div className="text-center">
            <img
              src={yourSignData.image_url}
              alt={yourSign}
              className="w-24 h-24 mx-auto rounded-full border-4 border-indigo-500"
            />
            <h2 className="text-2xl font-bold mt-2">{yourSign}</h2>
          </div>
          <span className="text-4xl font-bold text-gray-500 mx-8">&</span>
          <div className="text-center">
            <img
              src={partnerSignData.image_url}
              alt={partnerSign}
              className="w-24 h-24 mx-auto rounded-full border-4 border-pink-500"
            />
            <h2 className="text-2xl font-bold mt-2">{partnerSign}</h2>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          {yourSign} & {partnerSign} Zodiac Compatibility
        </h1>
        <p className="text-center text-gray-600 mb-8">Love, sex, friendship & more</p>

        {compatibilityData && (
          <div>
            <CompatibilityProgressBar category="Love" percentage={compatibilityData.lovePercent} />
            <h3 className="font-semibold text-lg text-gray-700 mt-4">
              Love Compatibility Details:
            </h3>
            <p className="text-gray-600 mb-6 whitespace-pre-wrap">{compatibilityData.love}</p>

            <CompatibilityProgressBar category="Sex" percentage={compatibilityData.sexualPercent} />
            <h3 className="font-semibold text-lg text-gray-700 mt-4">
              Sexual Compatibility Details:
            </h3>
            <p className="text-gray-600 mb-6 whitespace-pre-wrap">{compatibilityData.sexual}</p>

            <CompatibilityProgressBar
              category="Friendship"
              percentage={compatibilityData.friendshipPercent}
            />
            <h3 className="font-semibold text-lg text-gray-700 mt-4">
              Friendship Compatibility Details:
            </h3>
            <p className="text-gray-600 mb-6 whitespace-pre-wrap">{compatibilityData.friendship}</p>

            <CompatibilityProgressBar
              category="Communication"
              percentage={compatibilityData.communicationPercent}
            />
            <h3 className="font-semibold text-lg text-gray-700 mt-4">
              Communication Compatibility Details:
            </h3>
            <p className="text-gray-600 mb-6 whitespace-pre-wrap">
              {compatibilityData.communication}
            </p>
          </div>
        )}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/compatibility')}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300 ease-in-out"
          >
            Check New Compatibility
          </button>
        </div>
      </div>
    </div>
  );
}
