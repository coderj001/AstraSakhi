import React, { useReducer, useState } from 'react';
import { motion } from 'framer-motion';
import Autocomplete from '../components/Autocomplete';
import { useAutocomplete } from '../hooks/useAutocomplete';
import apiService from '../services/api';

const formReducer = (state, event) => {
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};

const ReportSection = ({ report }) => {
  if (!report) return null;

  const {
    ascendant,
    nakshatra,
    manglik_dtls: manglik,
    kalsharpa_dtls: kalsharpa,
    planet_report: planetReport,
  } = report.data;

  return (
    <div className="backdrop-blur-md bg-white/30 p-6 rounded-2xl shadow-lg border border-white/20 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Free Report</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Ascendant Report</h3>
          <p>{ascendant.result[0].content}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Nakshatra Report</h3>
          <p>{nakshatra.Characteristics.male}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Manglik Details</h3>
          <p>{manglik.report}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Kalsharpa Details</h3>
          <p>{kalsharpa.result}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Planet Report</h3>
          {planetReport.map((planet) => (
            <div key={planet.Planet_name} className="mb-2">
              <h4 className="font-bold">{planet.Planet_name}</h4>
              <p>{planet.Result}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const divisionalChartMappings = {
  sun: 'Sun Chart',
  moon: 'Moon Chart',
  chalit: 'Chalit Chart',
  transit: 'Transit Chart',
  d1: 'Rashi Chart',
  d2: 'Hora Chart',
  d3: 'Drekkana Chart',
  d4: 'Chaturthamsa Chart',
  d5: 'Panchamsa Chart',
  d6: 'Shashtamsa Chart',
  d7: 'Saptamsa Chart',
  d8: 'Ashtamsa Chart',
  d9: 'Navamsa Chart',
  d10: 'Dashamsa Chart',
  d11: 'Ekadasamsa Chart',
  d12: 'Dwadashamsa Chart',
  d16: 'Shodashamsa Chart',
  d20: 'Vimsamsha Chart',
  d24: 'Chaturvimshamsha Chart',
  d27: 'Saptavimshamsha Chart',
  d30: 'Trimshamsa Chart',
  d40: 'Khavedamsa Chart',
  d45: 'Akshavedamsa Chart',
  d60: 'Shashtamsa Chart',
};

const KundliResult = ({ ashtakvarga, divisional, report, user }) => {
  const [activeTab, setActiveTab] = useState('d1');

  const renderChart = (chartData) => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {chartData.map((chart) => (
        <div key={chart.sign} className="backdrop-blur-md bg-white/30 p-4 rounded-lg shadow-md">
          <h4 className="font-bold">{chart.sign_name}</h4>
          {chart.planet.map((planet, index) => (
            <p key={index} className={chart.planet_retro.includes(planet) ? 'text-red-500' : ''}>
              {planet} ({chart.planet_small_deg[index]})
            </p>
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 text-white"
    >
      <h1 className="text-4xl font-bold text-center mb-4">Free Kundli for {user.name}</h1>
      <ReportSection report={report} />
      <div className="backdrop-blur-md bg-white/30 p-6 rounded-2xl shadow-lg border border-white/20 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Ashtakvarga</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-transparent">
            <thead>
              <tr className="bg-white/20">
                <th className="py-2 px-4 border-b border-white/20">Planet</th>
                {Object.keys(ashtakvarga.ASC).map((key) => (
                  <th key={key} className="py-2 px-4 border-b border-white/20">
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(ashtakvarga).map(
                ([planet, values]) =>
                  planet !== 'description' &&
                  planet !== 'SAV' && (
                    <tr key={planet}>
                      <td className="py-2 px-4 border-b border-white/20 font-bold">{planet}</td>
                      {Object.values(values).map((value, index) => (
                        <td key={index} className="py-2 px-4 border-b border-white/20">
                          {value}
                        </td>
                      ))}
                    </tr>
                  ),
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="backdrop-blur-md bg-white/30 p-6 rounded-2xl shadow-lg border border-white/20">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Divisional Charts</h2>
        <div className="flex justify-center border-b-2 border-white/20 mb-6 overflow-x-auto">
          {Object.keys(divisional.data).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-6 py-3 text-lg font-medium focus:outline-none transition-colors ${
                activeTab === key
                  ? 'border-b-2 border-indigo-400 text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {divisionalChartMappings[key] || key.toUpperCase()}
            </button>
          ))}
        </div>
        {renderChart(divisional.data[activeTab])}
      </div>
    </motion.div>
  );
};

export default function FreeKundli() {
  const [formData, setFormData] = useReducer(formReducer, {});
  const [kundliResult, setKundliResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const autocomplete = useAutocomplete();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const [year, month, day] = formData.dob.split('-');
      const [hour, min] = formData.tob.split(':');
      const requestData = {
        name: formData.name,
        gender: formData.gender,
        hour: parseInt(hour, 10),
        min: parseInt(min, 10),
        sec: 0,
        day: parseInt(day, 10),
        month: parseInt(month, 10),
        year: parseInt(year, 10),
        tzone: 5.5,
        lon: 88.3638953,
        lat: 22.5726459,
        place: autocomplete.inputValue,
        languageId: 1,
      };

      const [ashtakvarga, divisional, dasha, report, general, yoginiDasha, findCombination] =
        await Promise.all([
          apiService.getKundliAshtakvarga(requestData),
          apiService.getKundliDivisional({ detail: requestData, languageId: 1 }),
          apiService.getKundliDasha(requestData),
          apiService.getKundliReport({ detail: requestData, languageId: 1 }),
          apiService.getKundliGeneral({ detail: requestData, languageId: 1 }),
          apiService.getKundliYoginiDasha({ detail: requestData, languageId: 1 }),
          apiService.findKundliCombination({ detail: requestData, languageId: 1 }),
        ]);
      setKundliResult({ ashtakvarga, divisional, report, user: formData });
      console.log('Dasha:', dasha);
      console.log('Report:', report);
      console.log('General:', general);
      console.log('Yogini Dasha:', yoginiDasha);
      console.log('Find Combination:', findCombination);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const pageContent = kundliResult ? (
    <KundliResult {...kundliResult} />
  ) : (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center text-white mb-4"
      >
        Free Kundli
      </motion.h1>
      <p className="text-center text-white/80 mb-8">
        Generate your free Kundli and get insights into your life.
      </p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto backdrop-blur-md bg-white/30 p-6 rounded-2xl shadow-lg border border-white/20"
      >
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-shadow shadow-md"
                placeholder="Enter name"
                onChange={setFormData}
                value={formData.name || ''}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="gender" className="block text-gray-700 font-medium mb-2">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                className="w-full px-4 py-2 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-shadow shadow-md"
                onChange={setFormData}
                value={formData.gender || ''}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="dob" className="block text-gray-700 font-medium mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                className="w-full px-4 py-2 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-shadow shadow-md"
                onChange={setFormData}
                value={formData.dob || ''}
                required
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
                className="w-full px-4 py-2 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-shadow shadow-md"
                onChange={setFormData}
                value={formData.tob || ''}
                required
              />
            </div>
            <div className="mb-4 md:col-span-2">
              <label htmlFor="pob" className="block text-gray-700 font-medium mb-2">
                Birth Place
              </label>
              <Autocomplete
                inputValue={autocomplete.inputValue}
                suggestions={autocomplete.suggestions}
                loading={autocomplete.loading}
                onInputChange={autocomplete.onInputChange}
                onSuggestionClick={autocomplete.onSuggestionClick}
              />
            </div>
          </div>
          <div className="text-center mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-lg transition-transform"
            >
              Generate Kundli
            </motion.button>
          </div>
        </form>
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
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-800 text-white">
      {pageContent}
    </div>
  );
}
