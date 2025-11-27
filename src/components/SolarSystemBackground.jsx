import React from 'react';

const SolarSystemBackground = () => {
   return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
         {/* Starfield */}
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#0B0B15] to-black"></div>

         {/* Animated Stars */}
         {[...Array(50)].map((_, i) => (
            <div
               key={i}
               className="absolute rounded-full bg-white opacity-60 animate-twinkle"
               style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 2 + 1}px`,
                  height: `${Math.random() * 2 + 1}px`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${Math.random() * 3 + 2}s`,
               }}
            />
         ))}

         {/* Solar System Container - Centered and tilted slightly for depth */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vmax] h-[150vmax] opacity-40">
            {/* Sun Glow (Central) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-500/20 rounded-full blur-[100px]" />

            {/* Orbit 1 - Mercury */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] border border-white/5 rounded-full animate-spin-slow">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[50%] w-4 h-4 bg-gray-400 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.4)]" />
            </div>

            {/* Orbit 2 - Venus */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55%] h-[55%] border border-white/5 rounded-full animate-spin-slower">
               <div className="absolute top-[15%] left-[85%] w-8 h-8 bg-amber-200 rounded-full shadow-[0_0_15px_rgba(253,224,71,0.3)] blur-[1px]" />
            </div>

            {/* Orbit 3 - Earth (The focus) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] border border-white/10 rounded-full animate-spin-medium">
               <div className="absolute top-[80%] left-[10%] w-12 h-12 rounded-full overflow-hidden shadow-[0_0_20px_rgba(59,130,246,0.5)] bg-blue-500">
                  {/* Simple Earth texture effect via CSS */}
                  <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,_#4ade80_0%,_#3b82f6_60%,_#1e3a8a_100%)]"></div>
               </div>
            </div>

            {/* Orbit 4 - Mars */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] border border-white/5 rounded-full animate-spin-reverse">
               <div className="absolute top-[30%] left-[95%] w-10 h-10 bg-red-500 rounded-full shadow-[0_0_20px_rgba(239,68,68,0.4)] bg-[radial-gradient(circle_at_40%_40%,_#fca5a5_0%,_#ef4444_60%,_#7f1d1d_100%)]" />
            </div>
         </div>
         <style>{`
        @keyframes spin-slow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes spin-slower {
          from { transform: translate(-50%, -50%) rotate(120deg); }
          to { transform: translate(-50%, -50%) rotate(480deg); }
        }
        @keyframes spin-medium {
          from { transform: translate(-50%, -50%) rotate(240deg); }
          to { transform: translate(-50%, -50%) rotate(600deg); }
        }
        @keyframes spin-reverse {
          from { transform: translate(-50%, -50%) rotate(360deg); }
          to { transform: translate(-50%, -50%) rotate(0deg); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        .animate-spin-slow { animation: spin-slow 60s linear infinite; }
        .animate-spin-slower { animation: spin-slower 90s linear infinite; }
        .animate-spin-medium { animation: spin-medium 45s linear infinite; }
        .animate-spin-reverse { animation: spin-reverse 80s linear infinite; }
        .animate-twinkle { animation: twinkle 3s ease-in-out infinite; }
      `}</style>
      </div>
   );
};

export default SolarSystemBackground;
