import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { zodiacSigns } from '../data/signs';
import apiService from '../services/api';

const CompatibilityProgressBar = ({ category, percentage, colorClass = "bg-indigo-500" }) => (
   <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
         <span className="text-lg font-medium text-purple-100">{category}</span>
         <span className="text-lg font-bold text-white">{percentage}%</span>
      </div>
      <div className="w-full bg-white/10 rounded-full h-4 backdrop-blur-sm border border-white/5">
         <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`h-4 rounded-full ${colorClass} shadow-[0_0_10px_rgba(139,92,246,0.3)]`}
         ></motion.div>
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
         <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-800 flex items-center justify-center">
            <div className="text-center">
               <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-400 mx-auto mb-4"></div>
               <p className="text-purple-200 animate-pulse">Analyzing cosmic alignment...</p>
            </div>
         </div>
      );
   }

   if (error) {
      return (
         <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-800 flex items-center justify-center p-4">
            <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-red-500/30 text-center max-w-md w-full">
               <h1 className="text-2xl font-bold text-red-400 mb-2">Connection Error</h1>
               <p className="text-gray-300 mb-6">{error.message}</p>
               <button
                  onClick={() => navigate('/compatibility')}
                  className="px-6 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-200 rounded-lg transition-colors"
               >
                  Try Again
               </button>
            </div>
         </div>
      );
   }

   if (!yourSignData || !partnerSignData) {
      return (
         <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-800 flex items-center justify-center p-4">
            <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/10 text-center max-w-md w-full">
               <h1 className="text-2xl font-bold text-purple-200 mb-2">Invalid Signs</h1>
               <p className="text-gray-300 mb-6">Please select valid zodiac signs to check compatibility.</p>
               <button
                  onClick={() => navigate('/compatibility')}
                  className="px-6 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 rounded-lg transition-colors"
               >
                  Go Back
               </button>
            </div>
         </div>
      );
   }

   return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-800 text-white py-12 px-4">
         <div className="container mx-auto">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6 }}
               className="max-w-3xl mx-auto backdrop-blur-xl bg-white/10 p-8 rounded-3xl shadow-2xl border border-white/20"
            >
               <div className="flex flex-col md:flex-row justify-center items-center mb-10 gap-8">
                  <motion.div
                     initial={{ x: -50, opacity: 0 }}
                     animate={{ x: 0, opacity: 1 }}
                     transition={{ delay: 0.2 }}
                     className="text-center"
                  >
                     <div className="relative">
                        <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-20 rounded-full"></div>
                        <img
                           src={yourSignData.image_url}
                           alt={yourSign}
                           className="w-32 h-32 mx-auto rounded-full border-4 border-indigo-400/50 shadow-lg relative z-10"
                        />
                     </div>
                     <h2 className="text-2xl font-bold mt-4 text-indigo-200">{yourSign}</h2>
                  </motion.div>

                  <motion.div
                     initial={{ scale: 0 }}
                     animate={{ scale: 1 }}
                     transition={{ delay: 0.4, type: "spring" }}
                     className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200"
                  >
                     &
                  </motion.div>

                  <motion.div
                     initial={{ x: 50, opacity: 0 }}
                     animate={{ x: 0, opacity: 1 }}
                     transition={{ delay: 0.2 }}
                     className="text-center"
                  >
                     <div className="relative">
                        <div className="absolute inset-0 bg-pink-500 blur-xl opacity-20 rounded-full"></div>
                        <img
                           src={partnerSignData.image_url}
                           alt={partnerSign}
                           className="w-32 h-32 mx-auto rounded-full border-4 border-pink-400/50 shadow-lg relative z-10"
                        />
                     </div>
                     <h2 className="text-2xl font-bold mt-4 text-pink-200">{partnerSign}</h2>
                  </motion.div>
               </div>

               <div className="text-center mb-10">
                  <h1 className="text-3xl font-bold text-white mb-2">Compatibility Report</h1>
                  <p className="text-purple-200/60">Detailed analysis of your cosmic connection</p>
               </div>

               {compatibilityData && (
                  <div className="space-y-8">
                     <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-colors"
                     >
                        <CompatibilityProgressBar
                           category="Love"
                           percentage={compatibilityData.lovePercent}
                           colorClass="bg-gradient-to-r from-pink-500 to-rose-500"
                        />
                        <h3 className="font-semibold text-lg text-pink-200 mt-4 mb-2">Love Analysis</h3>
                        <p className="text-gray-300 leading-relaxed">{compatibilityData.love}</p>
                     </motion.div>

                     <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-colors"
                     >
                        <CompatibilityProgressBar
                           category="Sexual"
                           percentage={compatibilityData.sexualPercent}
                           colorClass="bg-gradient-to-r from-red-500 to-orange-500"
                        />
                        <h3 className="font-semibold text-lg text-orange-200 mt-4 mb-2">Intimacy Analysis</h3>
                        <p className="text-gray-300 leading-relaxed">{compatibilityData.sexual}</p>
                     </motion.div>

                     <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-colors"
                     >
                        <CompatibilityProgressBar
                           category="Friendship"
                           percentage={compatibilityData.friendshipPercent}
                           colorClass="bg-gradient-to-r from-blue-400 to-cyan-400"
                        />
                        <h3 className="font-semibold text-lg text-cyan-200 mt-4 mb-2">Friendship Analysis</h3>
                        <p className="text-gray-300 leading-relaxed">{compatibilityData.friendship}</p>
                     </motion.div>

                     <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-colors"
                     >
                        <CompatibilityProgressBar
                           category="Communication"
                           percentage={compatibilityData.communicationPercent}
                           colorClass="bg-gradient-to-r from-green-400 to-emerald-400"
                        />
                        <h3 className="font-semibold text-lg text-emerald-200 mt-4 mb-2">Communication Analysis</h3>
                        <p className="text-gray-300 leading-relaxed">{compatibilityData.communication}</p>
                     </motion.div>
                  </div>
               )}

               <div className="text-center mt-12">
                  <motion.button
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                     onClick={() => navigate('/compatibility')}
                     className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/20 transition-all duration-300 font-semibold shadow-lg backdrop-blur-md"
                  >
                     Check Another Match
                  </motion.button>
               </div>
            </motion.div>
         </div>
      </div>
   );
}
