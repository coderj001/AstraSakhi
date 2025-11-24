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

  const ReportCard = ({ title, children, className = '' }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`bg-white/5 backdrop-blur-lg border border-purple-200/20 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 ${className}`}
    >
      <h3 className="text-xl font-bold text-purple-200 mb-4 border-b border-purple-200/20 pb-2">
        {title}
      </h3>
      <div className="text-purple-50 leading-relaxed">{children}</div>
    </motion.div>
  );

  return (
    <div className="space-y-8 mb-12">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200 mb-8"
      >
        Your Detailed Report
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ReportCard title="Ascendant Report">
          <p>{ascendant.result[0].content}</p>
        </ReportCard>

        <ReportCard title="Nakshatra Report">
          <p>{nakshatra.Characteristics.male}</p>
        </ReportCard>

        <ReportCard title="Manglik Analysis">
          <p className={manglik.manglik_present ? 'text-red-300' : 'text-green-300'}>
            {manglik.report}
          </p>
        </ReportCard>

        <ReportCard title="Kalsarpa Analysis">
          <p>{kalsharpa.result}</p>
        </ReportCard>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-bold text-purple-200 mb-6 text-center">Planetary Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {planetReport.map((planet, index) => (
            <motion.div
              key={planet.Planet_name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-md border border-purple-200/10 rounded-xl p-5 hover:border-purple-200/30 transition-all duration-300"
            >
              <h4 className="font-bold text-lg text-pink-200 mb-2">{planet.Planet_name}</h4>
              <p className="text-sm text-purple-100/80">{planet.Result}</p>
            </motion.div>
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {chartData.map((chart) => (
        <motion.div
          key={chart.sign}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/5 backdrop-blur-md border border-purple-200/20 p-4 rounded-xl hover:bg-white/10 transition-colors"
        >
          <div className="flex justify-between items-center mb-2 border-b border-purple-200/10 pb-2">
            <h4 className="font-bold text-purple-200">{chart.sign_name}</h4>
            <span className="text-xs text-purple-300/60 font-mono">Sign {chart.sign}</span>
          </div>
          <div className="space-y-1">
            {chart.planet.map((planet, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span
                  className={`${chart.planet_retro.includes(planet) ? 'text-red-300' : 'text-purple-100'}`}
                >
                  {planet} {chart.planet_retro.includes(planet) && '(R)'}
                </span>
                <span className="text-purple-300/70 text-xs font-mono">
                  {chart.planet_small_deg && chart.planet_small_deg[index]
                    ? parseFloat(chart.planet_small_deg[index].split('-')[1] || 0).toFixed(2)
                    : 'N/A'}
                  °
                </span>
              </div>
            ))}
            {chart.planet.length === 0 && (
              <p className="text-xs text-purple-300/30 italic text-center py-2">No planets</p>
            )}
          </div>
        </motion.div>
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
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200 mb-2">
          Kundli Analysis
        </h1>
        <p className="text-purple-200/60">
          Prepared for <span className="text-white font-semibold">{user.name}</span>
        </p>
      </div>

      <ReportSection report={report} />

      <div className="space-y-8">
        {/* Ashtakvarga Section */}
        <div className="backdrop-blur-xl bg-white/10 p-6 rounded-3xl shadow-xl border border-white/10 overflow-hidden">
          <h2 className="text-2xl font-bold text-purple-200 mb-6 flex items-center gap-2">
            <span className="w-1 h-8 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full block"></span>
            Ashtakvarga Table
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-purple-900/30 text-purple-200">
                  <th className="py-3 px-4 text-left rounded-l-lg">Planet</th>
                  {Object.keys(ashtakvarga.ASC).map((key) => (
                    <th key={key} className="py-3 px-4 text-center text-sm font-semibold">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-200/10">
                {Object.entries(ashtakvarga).map(
                  ([planet, values]) =>
                    planet !== 'description' &&
                    planet !== 'SAV' && (
                      <tr key={planet} className="hover:bg-white/5 transition-colors">
                        <td className="py-3 px-4 font-bold text-purple-100">{planet}</td>
                        {Object.values(values).map((value, index) => (
                          <td key={index} className="py-3 px-4 text-center text-purple-200/80">
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

        {/* Divisional Charts Section */}
        <div className="backdrop-blur-xl bg-white/10 p-6 rounded-3xl shadow-xl border border-white/10">
          <h2 className="text-2xl font-bold text-purple-200 mb-6 flex items-center gap-2">
            <span className="w-1 h-8 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full block"></span>
            Divisional Charts
          </h2>

          <div className="flex flex-wrap gap-2 mb-8 p-1 bg-black/20 rounded-xl">
            {Object.keys(divisional.data).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === key
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                    : 'text-purple-200/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {divisionalChartMappings[key] || key.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="bg-black/10 rounded-2xl p-4 border border-white/5">
            {renderChart(divisional.data[activeTab])}
          </div>
        </div>
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
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const pageContent = kundliResult ? (
    <KundliResult {...kundliResult} />
  ) : (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200 mb-4 drop-shadow-sm">
          Free Kundli
        </h1>
        <p className="text-lg text-purple-100/80 max-w-2xl mx-auto leading-relaxed">
          Unlock the secrets of your destiny. Generate your detailed birth chart and get instant
          insights into your life path.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-3xl mx-auto backdrop-blur-xl bg-white/10 p-8 rounded-3xl shadow-2xl border border-white/20 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-80"></div>

        <form onSubmit={handleSubmit} className="space-y-6">
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
                placeholder="Enter your full name"
                onChange={setFormData}
                value={formData.name || ''}
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="gender"
                className="text-sm font-semibold text-purple-100 tracking-wide uppercase"
              >
                Gender
              </label>
              <div className="relative">
                <select
                  id="gender"
                  name="gender"
                  className="w-full px-4 py-3 bg-white/5 border border-purple-200/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white appearance-none transition-all duration-300 hover:bg-white/10 cursor-pointer"
                  onChange={setFormData}
                  value={formData.gender || ''}
                  required
                >
                  <option value="" className="bg-gray-900 text-gray-400">
                    Select Gender
                  </option>
                  <option value="Male" className="bg-gray-900">
                    Male
                  </option>
                  <option value="Female" className="bg-gray-900">
                    Female
                  </option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-purple-200">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
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
                onChange={setFormData}
                value={formData.dob || ''}
                required
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
                onChange={setFormData}
                value={formData.tob || ''}
                required
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <label
                htmlFor="pob"
                className="text-sm font-semibold text-purple-100 tracking-wide uppercase"
              >
                Birth Place
              </label>
              <div className="relative group">
                <Autocomplete
                  inputValue={autocomplete.inputValue}
                  suggestions={autocomplete.suggestions}
                  loading={autocomplete.loading}
                  onInputChange={autocomplete.onInputChange}
                  onSuggestionClick={autocomplete.onSuggestionClick}
                  className="w-full px-4 py-3 bg-white/5 border border-purple-200/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white placeholder-purple-200/30 transition-all duration-300 hover:bg-white/10"
                />
              </div>
            </div>
          </div>

          <div className="pt-6 text-center">
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(167, 139, 250, 0.5)' }}
              whileTap={{ scale: 0.98 }}
              type="submit"
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
                  Calculating...
                </span>
              ) : (
                'Generate Kundli'
              )}
            </motion.button>
          </div>
        </form>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-center"
          >
            {error}
          </motion.div>
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
