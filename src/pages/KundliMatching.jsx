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
      className="backdrop-blur-xl bg-white/10 p-8 rounded-3xl shadow-2xl border border-white/20 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-80"></div>
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200 mb-8 text-center">
        {title}
      </h2>
      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-sm font-semibold text-purple-100 tracking-wide uppercase"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-3 bg-white/5 border border-purple-200/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white placeholder-purple-200/30 transition-all duration-300 hover:bg-white/10"
              placeholder="Enter name"
              onChange={handleInputChange}
              value={formData.name || ''}
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="dob"
              className="text-sm font-semibold text-purple-100 tracking-wide uppercase"
            >
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              className="w-full px-4 py-3 bg-white/5 border border-purple-200/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white placeholder-purple-200/30 transition-all duration-300 hover:bg-white/10"
              onChange={handleInputChange}
              value={formData.dob || ''}
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="tob"
              className="text-sm font-semibold text-purple-100 tracking-wide uppercase"
            >
              Time of Birth
            </label>
            <input
              type="time"
              id="tob"
              name="tob"
              className="w-full px-4 py-3 bg-white/5 border border-purple-200/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white placeholder-purple-200/30 transition-all duration-300 hover:bg-white/10"
              onChange={handleInputChange}
              value={formData.tob || ''}
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="pob"
              className="text-sm font-semibold text-purple-100 tracking-wide uppercase"
            >
              Birth Place
            </label>
            <Autocomplete
              inputValue={inputValue}
              suggestions={suggestions}
              loading={loading}
              className="w-full px-4 py-3 bg-white/5 border border-purple-200/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white placeholder-purple-200/30 transition-all duration-300 hover:bg-white/10"
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

const ResultCard = ({ title, children, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className={`backdrop-blur-xl bg-white/10 p-6 rounded-3xl shadow-xl border border-white/10 mb-6 ${className}`}
  >
    <h2 className="text-2xl font-bold text-purple-200 mb-6 flex items-center gap-2">
      <span className="w-1 h-8 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full block"></span>
      {title}
    </h2>
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
        className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200 mb-8"
      >
        Kundli Matching Report
      </motion.h1>
      <div className="flex justify-center items-center space-x-4 mb-8">
        <h2 className="text-3xl font-semibold text-white">{boy.name}</h2>
        <span className="text-pink-400 font-bold text-2xl">vs</span>
        <h2 className="text-3xl font-semibold text-white">{girl.name}</h2>
      </div>

      <ResultCard title="Basic Details">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/5 p-4 rounded-xl border border-white/5">
            <h3 className="text-xl font-semibold mb-4 text-purple-200 border-b border-white/10 pb-2">
              Boy's Details
            </h3>
            <div className="space-y-2 text-purple-100/80">
              <p>
                <strong className="text-purple-200">Date of Birth:</strong> {boy.dob}
              </p>
              <p>
                <strong className="text-purple-200">Time of Birth:</strong> {boy.tob}
              </p>
              <p>
                <strong className="text-purple-200">Place of Birth:</strong> {boy.pob}
              </p>
            </div>
          </div>
          <div className="bg-white/5 p-4 rounded-xl border border-white/5">
            <h3 className="text-xl font-semibold mb-4 text-purple-200 border-b border-white/10 pb-2">
              Girl's Details
            </h3>
            <div className="space-y-2 text-purple-100/80">
              <p>
                <strong className="text-purple-200">Date of Birth:</strong> {girl.dob}
              </p>
              <p>
                <strong className="text-purple-200">Time of Birth:</strong> {girl.tob}
              </p>
              <p>
                <strong className="text-purple-200">Place of Birth:</strong> {girl.pob}
              </p>
            </div>
          </div>
        </div>
      </ResultCard>

      <ResultCard title="Summary of the Kundli Report">
        <div className="flex flex-col items-center justify-center py-6">
          <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-300 mb-4">
            {ashtkoot.total.received_points}/{ashtkoot.total.total_points}
          </div>
          <p className="text-center text-xl text-purple-100 leading-relaxed max-w-2xl">
            {ashtkoot.conclusion.report}
          </p>
        </div>
      </ResultCard>

      <ResultCard title="Match Ashtakoot Points">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="hidden md:table-header-group">
              <tr className="bg-purple-900/30 text-purple-200">
                <th className="py-3 px-4 text-left rounded-l-lg">Attribute</th>
                <th className="py-3 px-4 text-left">Male</th>
                <th className="py-3 px-4 text-left">Female</th>
                <th className="py-3 px-4 text-left">Received</th>
                <th className="py-3 px-4 text-left rounded-r-lg">Out of</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-200/10">
              {ashtkootPoints.map(([key, value]) => (
                <tr
                  key={key}
                  className="block md:table-row mb-4 md:mb-0 border border-white/10 rounded-lg md:border-none hover:bg-white/5 transition-colors"
                >
                  <td
                    className="flex justify-between md:table-cell py-3 px-4 text-purple-100 font-medium"
                    data-label="Attribute"
                  >
                    <span className="font-bold md:hidden text-purple-300">Attribute: </span>
                    {key}
                  </td>
                  <td
                    className="flex justify-between md:table-cell py-3 px-4 text-purple-200/80"
                    data-label="Male"
                  >
                    <span className="font-bold md:hidden text-purple-300">Male: </span>
                    {value.male_koot_attribute}
                  </td>
                  <td
                    className="flex justify-between md:table-cell py-3 px-4 text-purple-200/80"
                    data-label="Female"
                  >
                    <span className="font-bold md:hidden text-purple-300">Female: </span>
                    {value.female_koot_attribute}
                  </td>
                  <td
                    className="flex justify-between md:table-cell py-3 px-4 text-purple-200/80"
                    data-label="Received"
                  >
                    <span className="font-bold md:hidden text-purple-300">Received: </span>
                    {value.received_points}
                  </td>
                  <td
                    className="flex justify-between md:table-cell py-3 px-4 text-purple-200/80"
                    data-label="Out of"
                  >
                    <span className="font-bold md:hidden text-purple-300">Out of: </span>
                    {value.total_points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ResultCard>

      <ResultCard title="Manglik Report">
        <p className="text-center text-purple-100 text-lg leading-relaxed">{manglik.report}</p>
      </ResultCard>

      <ResultCard title="Conclusion">
        <p className="text-center text-purple-100 text-lg leading-relaxed">{conclusion}</p>
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
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200 mb-4 drop-shadow-sm">
          Kundli Matching
        </h1>
        <p className="text-lg text-purple-100/80 max-w-2xl mx-auto leading-relaxed">
          Discover if you and your partner are made for each other with our Kundli matching service.
        </p>
      </motion.div>

      <div className="max-w-3xl mx-auto">
        <div className="flex justify-center mb-8 bg-white/5 p-1 rounded-xl backdrop-blur-sm inline-flex mx-auto w-full md:w-auto">
          <button
            onClick={() => setActiveTab('boy')}
            className={`flex-1 md:flex-none px-8 py-3 text-lg font-medium rounded-lg transition-all duration-300 ${
              activeTab === 'boy'
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                : 'text-purple-200/60 hover:text-white hover:bg-white/5'
            }`}
          >
            Boy's Details
          </button>
          <button
            onClick={() => setActiveTab('girl')}
            className={`flex-1 md:flex-none px-8 py-3 text-lg font-medium rounded-lg transition-all duration-300 ${
              activeTab === 'girl'
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                : 'text-purple-200/60 hover:text-white hover:bg-white/5'
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
        <div className="text-center mt-8">
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(167, 139, 250, 0.5)' }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            disabled={loading}
            className="w-full md:w-auto px-12 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Matching...
              </span>
            ) : (
              'Match Horoscope'
            )}
          </motion.button>
        </div>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-center"
          >
            {error}
          </motion.div>
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
