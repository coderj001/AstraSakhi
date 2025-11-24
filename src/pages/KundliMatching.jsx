import React, { useReducer, useState } from 'react';
import { motion } from 'framer-motion';
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="backdrop-blur-md bg-white/30 p-6 rounded-2xl shadow-lg border border-white/20"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">{title}</h2>
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
              className="w-full px-4 py-2 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-shadow shadow-md"
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
              className="w-full px-4 py-2 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-shadow shadow-md"
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
              className="w-full px-4 py-2 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-shadow shadow-md"
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
    </motion.div>
  );
};

const ResultCard = ({ title, children }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className="backdrop-blur-md bg-white/30 p-6 rounded-2xl shadow-lg border border-white/20 mb-6"
  >
    <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">{title}</h2>
    {children}
  </motion.div>
);

const MatchResult = ({ result, boy, girl }) => {
  const { ashtkoot, manglik, conclusion } = result;
  const ashtkootPoints = Object.entries(ashtkoot).filter(
    ([key]) => key !== 'total' && key !== 'conclusion',
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center text-white mb-4"
      >
        Kundli Matching Report
      </motion.h1>
      <div className="flex justify-center items-center space-x-4 mb-6">
        <h2 className="text-3xl font-semibold text-white">{boy.name}</h2>
        <span className="text-red-400 font-bold text-2xl">vs</span>
        <h2 className="text-3xl font-semibold text-white">{girl.name}</h2>
      </div>

      <ResultCard title="Basic Details">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-700">Boy's Details</h3>
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
            <h3 className="text-xl font-semibold mb-2 text-gray-700">Girl's Details</h3>
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
      </ResultCard>

      <ResultCard title="✅ Summary of the Kundli Report">
        <p className="text-center text-2xl font-bold text-indigo-600">
          {ashtkoot.total.received_points}/{ashtkoot.total.total_points}
        </p>
        <p className="text-center mt-2 text-gray-700">{ashtkoot.conclusion.report}</p>
      </ResultCard>

      <ResultCard title="Match Ashtakoot Points">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-transparent">
            <thead className="hidden md:table-header-group">
              <tr className="bg-white/20">
                <th className="py-2 px-4 border-b border-white/20">Attribute</th>
                <th className="py-2 px-4 border-b border-white/20">Male</th>
                <th className="py-2 px-4 border-b border-white/20">Female</th>
                <th className="py-2 px-4 border-b border-white/20">Received</th>
                <th className="py-2 px-4 border-b border-white/20">Out of</th>
              </tr>
            </thead>
            <tbody>
              {ashtkootPoints.map(([key, value]) => (
                <tr
                  key={key}
                  className="block md:table-row mb-4 md:mb-0 border border-white/20 rounded-lg md:border-none"
                >
                  <td
                    className="flex justify-between md:table-cell py-2 px-4 border-b border-white/20 md:border-b-0"
                    data-label="Attribute"
                  >
                    <span className="font-bold md:hidden">Attribute: </span>
                    {key}
                  </td>
                  <td
                    className="flex justify-between md:table-cell py-2 px-4 border-b border-white/20 md:border-b-0"
                    data-label="Male"
                  >
                    <span className="font-bold md:hidden">Male: </span>
                    {value.male_koot_attribute}
                  </td>
                  <td
                    className="flex justify-between md:table-cell py-2 px-4 border-b border-white/20 md:border-b-0"
                    data-label="Female"
                  >
                    <span className="font-bold md:hidden">Female: </span>
                    {value.female_koot_attribute}
                  </td>
                  <td
                    className="flex justify-between md:table-cell py-2 px-4 border-b border-white/20 md:border-b-0"
                    data-label="Received"
                  >
                    <span className="font-bold md:hidden">Received: </span>
                    {value.received_points}
                  </td>
                  <td className="flex justify-between md:table-cell py-2 px-4" data-label="Out of">
                    <span className="font-bold md:hidden">Out of: </span>
                    {value.total_points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ResultCard>

      <ResultCard title="Manglik Report">
        <p className="text-center text-gray-700">{manglik.report}</p>
      </ResultCard>

      <ResultCard title="Conclusion">
        <p className="text-center text-gray-700">{conclusion}</p>
      </ResultCard>
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

  const pageContent = matchMakingResult ? (
    <MatchResult
      result={matchMakingResult}
      boy={{ ...boyFormData, pob: boyAutocomplete.inputValue }}
      girl={{ ...girlFormData, pob: girlAutocomplete.inputValue }}
    />
  ) : (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center text-white mb-4"
      >
        Kundli Matching
      </motion.h1>
      <p className="text-center text-white/80 mb-8">
        Discover if you and your partner are made for each other with our Kundli matching service.
      </p>
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-center border-b-2 border-white/20 mb-6">
          <button
            onClick={() => setActiveTab('boy')}
            className={`px-6 py-3 text-lg font-medium focus:outline-none transition-colors ${
              activeTab === 'boy'
                ? 'border-b-2 border-indigo-400 text-white'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Boy's Details
          </button>
          <button
            onClick={() => setActiveTab('girl')}
            className={`px-6 py-3 text-lg font-medium focus:outline-none transition-colors ${
              activeTab === 'girl'
                ? 'border-b-2 border-indigo-400 text-white'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Girl's Details
          </button>
        </div>

        {activeTab === 'boy' ? (
          <KundliForm
            title="Enter Boy's Details"
            formData={boyFormData}
            onFormChange={setBoyFormData}
            {...boyAutocomplete}
          />
        ) : (
          <KundliForm
            title="Enter Girl's Details"
            formData={girlFormData}
            onFormChange={setGirlFormData}
            {...girlAutocomplete}
          />
        )}
        <div className="text-center mt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-lg transition-transform"
          >
            Match Horoscope
          </motion.button>
        </div>
        {loading && (
          <p className="text-center mt-4 text-white" aria-live="polite">
            Loading...
          </p>
        )}
        {error && (
          <p className="text-center mt-4 text-red-400" aria-live="assertive">
            {error}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-800 text-white">
      {pageContent}
    </div>
  );
}
