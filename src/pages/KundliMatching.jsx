import React, { useReducer, useState } from 'react';
import Autocomplete from '../components/Autocomplete';
import { useAutocomplete } from '../hooks/useAutocomplete';
import apiService from '../services/api';

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

const KundliForm = ({
  title,
  formData,
  onFormChange,
  inputValue,
  suggestions,
  loading,
  onInputChange,
  onSuggestionClick,
}) => {
  const handleInputChange = (event) => {
    onFormChange({
      name: event.target.name,
      value: event.target.value,
    });
  };

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
              name="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter name"
              onChange={handleInputChange}
              value={formData.name || ''}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="dob" className="block text-gray-700 font-medium mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={handleInputChange}
              value={formData.dob || ''}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="tob" className="block text-gray-700 font-medium mb-2">
              Time of Birth
            </label>
            <input
              type="time"
              id="tob"
              name="tob"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={handleInputChange}
              value={formData.tob || ''}
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
              onInputChange={(e) => {
                onInputChange(e);
                onFormChange({ name: 'pob', value: e.target.value });
              }}
              onSuggestionClick={(suggestion) => {
                onSuggestionClick(suggestion);
                onFormChange({
                  name: 'pob',
                  value: `${suggestion.name}, ${suggestion.state}, ${suggestion.countryName}`,
                });
              }}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

const MatchResult = ({ result, boy, girl }) => {
  const { ashtkoot, manglik, conclusion } = result;
  const ashtkootPoints = Object.entries(ashtkoot).filter(
    ([key]) => key !== 'total' && key !== 'conclusion',
  );

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Kundli Matching Report</h1>
      <div className="flex justify-center items-center space-x-4 mb-6">
        <h2 className="text-2xl font-semibold">{boy.name}</h2>
        <span className="text-red-500 font-bold">vs</span>
        <h2 className="text-2xl font-semibold">{girl.name}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">Boy's Details</h3>
          <p>
            <strong>Date of Birth:</strong> {boy.dob}
          </p>
          <p>
            <strong>Time of Birth:</strong> {boy.tob}
          </p>
          <p>
            <strong>Place of Birth:</strong> {boy.pob}
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Girl's Details</h3>
          <p>
            <strong>Date of Birth:</strong> {girl.dob}
          </p>
          <p>
            <strong>Time of Birth:</strong> {girl.tob}
          </p>
          <p>
            <strong>Place of Birth:</strong> {girl.pob}
          </p>
        </div>
      </div>
      <div className="summary-section mb-6">
        <h2 className="text-2xl font-semibold text-center mb-4">✅ Summary of the Kundli Report</h2>
        <p className="text-center text-lg">
          {ashtkoot.total.received_points}/{ashtkoot.total.total_points} is your Guna Milan Score.
        </p>
        <p className="text-center">{ashtkoot.conclusion.report}</p>
      </div>
      <h2 className="text-2xl font-semibold text-center mb-4">Match Ashtakoot Points</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Attribute</th>
              <th className="py-2 px-4 border-b">Male</th>
              <th className="py-2 px-4 border-b">Female</th>
              <th className="py-2 px-4 border-b">Received</th>
              <th className="py-2 px-4 border-b">Out of</th>
              <th className="py-2 px-4 border-b">Area Of Life</th>
              <th className="py-2 px-4 border-b">Description</th>
            </tr>
          </thead>
          <tbody>
            {ashtkootPoints.map(([key, value]) => (
              <tr key={key}>
                <td className="py-2 px-4 border-b">{key}</td>
                <td className="py-2 px-4 border-b">{value.male_koot_attribute}</td>
                <td className="py-2 px-4 border-b">{value.female_koot_attribute}</td>
                <td className="py-2 px-4 border-b">{value.received_points}</td>
                <td className="py-2 px-4 border-b">{value.total_points}</td>
                <td className="py-2 px-4 border-b">{value.description}</td>
                <td className="py-2 px-4 border-b">{value.description2}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-center mb-4">Manglik Report</h2>
        <p className="text-center">{manglik.report}</p>
      </div>
      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-center mb-4">Conclusion</h2>
        <p className="text-center">{conclusion}</p>
      </div>
    </div>
  );
};

export default function KundliMatching() {
  const [activeTab, setActiveTab] = useState('boy');
  const [boyFormData, setBoyFormData] = useReducer(formReducer, {});
  const [girlFormData, setGirlFormData] = useReducer(formReducer, {});
  const [matchMakingResult, setMatchMakingResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const boyAutocomplete = useAutocomplete();
  const girlAutocomplete = useAutocomplete();

  const handleSubmit = async () => {
    if (!boyFormData.dob || !boyFormData.tob || !girlFormData.dob || !girlFormData.tob) {
      setError('Please fill all the details for both Boy and Girl.');
      return;
    }
    const [boyYear, boyMonth, boyDay] = boyFormData.dob.split('-');
    const [boyHour, boyMin] = boyFormData.tob.split(':');
    const [girlYear, girlMonth, girlDay] = girlFormData.dob.split('-');
    const [girlHour, girlMin] = girlFormData.tob.split(':');

    const data = {
      m_detail: {
        day: parseInt(boyDay),
        hour: parseInt(boyHour),
        lat: '28.63576',
        lon: '77.22445',
        min: parseInt(boyMin),
        month: parseInt(boyMonth),
        name: boyFormData.name,
        tzone: '5.5',
        year: parseInt(boyYear),
        gender: 'Male',
        place: boyAutocomplete.inputValue,
        sec: 0,
      },
      f_detail: {
        day: parseInt(girlDay),
        hour: parseInt(girlHour),
        lat: '28.63576',
        lon: '77.22445',
        min: parseInt(girlMin),
        month: parseInt(girlMonth),
        name: girlFormData.name,
        tzone: '5.5',
        year: parseInt(girlYear),
        gender: 'Female',
        place: girlAutocomplete.inputValue,
        sec: 0,
      },
      languageId: 1,
    };

    setLoading(true);
    setError(null);
    try {
      const result = await apiService.matchMaking(data);
      setMatchMakingResult(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (matchMakingResult) {
    return (
      <MatchResult
        result={matchMakingResult}
        boy={{ ...boyFormData, pob: boyAutocomplete.inputValue }}
        girl={{ ...girlFormData, pob: girlAutocomplete.inputValue }}
      />
    );
  }

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
          <KundliForm
            title="Fill Up Partner's Detail"
            formData={boyFormData}
            onFormChange={setBoyFormData}
            {...boyAutocomplete}
          />
        ) : (
          <KundliForm
            title="Fill Up Partner's Detail"
            formData={girlFormData}
            onFormChange={setGirlFormData}
            {...girlAutocomplete}
          />
        )}
        <div className="text-center mt-6">
          <button
            onClick={handleSubmit}
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Match Horoscope
          </button>
        </div>
        {loading && <p className="text-center mt-4">Loading...</p>}
        {error && <p className="text-center mt-4 text-red-500">{error}</p>}
      </div>
    </div>
  );
}
