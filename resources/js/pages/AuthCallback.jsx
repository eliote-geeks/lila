import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, Loader2 } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const hasProcessed = useRef(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Prevent double processing in React StrictMode
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const processAuth = async () => {
      try {
        // Extract session_id from URL fragment
        const hash = location.hash;
        const sessionIdMatch = hash.match(/session_id=([^&]+)/);
        
        if (!sessionIdMatch) {
          throw new Error('Session ID non trouvé');
        }

        const sessionId = sessionIdMatch[1];

        // Exchange session_id for session data
        const response = await axios.get(
          'https://demobackend.emergentagent.com/auth/v1/env/oauth/session-data',
          {
            headers: {
              'X-Session-ID': sessionId
            }
          }
        );

        const sessionData = response.data;

        // Create/update user session in our backend
        const userResponse = await axios.post(
          `${BACKEND_URL}/api/auth/session`,
          {
            email: sessionData.email,
            name: sessionData.name,
            picture: sessionData.picture,
            session_token: sessionData.session_token
          },
          {
            withCredentials: true
          }
        );

        // Navigate to dashboard with user data
        navigate('/dashboard', { 
          replace: true,
          state: { user: userResponse.data }
        });

      } catch (err) {
        console.error('Auth error:', err);
        setError(err.message || 'Une erreur est survenue lors de la connexion');
        setTimeout(() => navigate('/login'), 3000);
      }
    };

    processAuth();
  }, [location, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--blanc)] via-[var(--gris-clair)] to-[#D4E0F7] flex items-center justify-center">
      <div className="text-center">
        <div className="w-20 h-20 rounded-2xl bg-[var(--bleu-roi)] flex items-center justify-center mx-auto mb-6">
          <Sparkles className="w-10 h-10 text-[var(--or)]" />
        </div>
        
        {error ? (
          <div className="space-y-4">
            <p className="text-red-500 font-medium">{error}</p>
            <p className="text-gray-500">Redirection vers la page de connexion...</p>
          </div>
        ) : (
          <div className="space-y-4">
            <Loader2 className="w-8 h-8 animate-spin text-[var(--bleu-roi)] mx-auto" />
            <p className="text-[var(--bleu-nuit)] font-medium">Connexion en cours...</p>
            <p className="text-gray-500 text-sm">Veuillez patienter</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthCallback;
