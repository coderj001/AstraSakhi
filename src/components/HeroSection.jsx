import React from 'react';
import { ShieldCheck, Lock, Heart, ShoppingBag, ArrowRight } from './icons';
import { Link } from 'react-router-dom';
import SolarSystemBackground from './SolarSystemBackground';

/**
 * Hero Section
 * Main landing page banner with CTA.
 */
export default function HeroSection() {
   return (
      <section className="relative min-h-screen bg-black text-white overflow-hidden flex flex-col justify-center">
         <SolarSystemBackground />

         <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
            {/* Badge */}
            <div className="mb-8 animate-fade-in-up">
               <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-orange-300 text-sm font-medium tracking-wide">
                  <ShieldCheck className="w-3 h-3 fill-current" /> #1 Astrology Engine
               </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/60 pb-4 mb-6 leading-tight animate-fade-in-up delay-100 font-serif">
               Authentic Guidance, <br />
               <span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                  Not Just Entertainment.
               </span>
            </h1>

            <p className="mt-4 text-lg md:text-xl text-gray-400 max-w-3xl mx-auto animate-fade-in-up delay-200 leading-relaxed">
               Connect with 100% <span className="font-semibold text-white">Verified Astrologers</span>{' '}
               for trusted advice on love, career, and life. Your first 5 minutes are on us.
            </p>

            <div className="mt-10 flex justify-center space-x-4 animate-fade-in-up delay-300">
               <Link
                  to="/chat-with-astrologer"
                  className="group relative overflow-hidden inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-gradient-to-r from-orange-400 to-amber-600 hover:from-orange-500 hover:to-amber-700 border border-transparent rounded-full shadow-[0_0_15px_rgba(249,115,22,0.4)] hover:shadow-[0_0_25px_rgba(249,115,22,0.6)] transition-all duration-300 hover:-translate-y-1"
               >
                  <span>Start Your First Chat</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
               </Link>
            </div>

            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 text-center animate-fade-in-up delay-300">
               <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-xl hover:bg-white/10 transition-colors">
                  <Lock className="w-8 h-8 mx-auto text-indigo-400 mb-2" />
                  <p className="text-sm font-medium text-gray-300">Private & Secure</p>
               </div>
               <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-xl hover:bg-white/10 transition-colors">
                  <ShieldCheck className="w-8 h-8 mx-auto text-amber-400 mb-2" />
                  <p className="text-sm font-medium text-gray-300">100% Verified Experts</p>
               </div>
               <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-xl hover:bg-white/10 transition-colors">
                  <Heart className="w-8 h-8 mx-auto text-pink-400 mb-2" />
                  <p className="text-sm font-medium text-gray-300">10M+ Happy Users</p>
               </div>
               <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-xl hover:bg-white/10 transition-colors">
                  <ShoppingBag className="w-8 h-8 mx-auto text-green-400 mb-2" />
                  <p className="text-sm font-medium text-gray-300">Certified Remedies</p>
               </div>
            </div>
         </div>
      </section>
   );
}
