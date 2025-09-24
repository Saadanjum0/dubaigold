import { User, Key, ArrowLeft } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import { supabase } from "../api/supabaseClient";

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleGoBack = () => window.history.back();

  const testSupabase = async () => {
    try {
      const url = 'https://dexczdjoaszbhjawbbzn.supabase.co/rest/v1/';
      const res = await fetch(url, {
        method: 'GET',
        headers: { 'apikey': (import.meta.env.VITE_SUPABASE_ANON_KEY || '') }
      });
      toast[res.ok ? 'success' : 'error'](`Supabase connectivity: ${res.status}`);
    } catch (err) {
      toast.error('Supabase connectivity failed');
      console.error(err);
    }
  };

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      
      // Validate inputs
      if (!email.trim() || !password.trim()) {
        toast.error('Please enter both email and password');
        return;
      }

      try{
        const { data, error } = await supabase.auth.signInWithPassword({ 
          email: email.trim(), 
          password: password.trim() 
        });
        
        if (error) {
          // If user doesn't exist, create admin account
          if (error.message.includes('Invalid login credentials') && email.trim() === 'admin@gold.com') {
            const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
              email: email.trim(),
              password: password.trim(),
              options: {
                data: { name: 'Admin User' }
              }
            });
            
            if (signUpError) throw signUpError;
            toast.success('Admin account created! Please check email for verification or try logging in.');
            return;
          }
          throw error;
        }

        setEmail("");
        setPassword("");
        toast.success('login successful')

        const accessToken = data?.session?.access_token;
        if (accessToken) {
          localStorage.setItem("token", accessToken);
        }

        navigate('/admin-dashboard');

      }
      catch(e){
        toast.error(e.message || 'Please enter Valid email and password');
        console.error(e);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      {/* Go Back Button */}
      <button 
        onClick={handleGoBack}
        className="absolute top-6 left-6 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
        aria-label="Go back"
      >
        <ArrowLeft className="h-6 w-6 text-black" />
      </button>
      
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-light text-black mb-12">Admin Login</h1>
        </div>

        <div className="space-y-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-white" />
            </div>
            <input
              type="email"
              placeholder="admin@gold.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full pl-12 pr-4 py-4 bg-black text-white placeholder-gray-300 border-0 rounded-lg text-lg focus:ring-2 focus:ring-gray-400 focus:outline-none"
              required
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Key className="h-5 w-5 text-white" />
            </div>
            <input
              type="password"
              placeholder="••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full pl-12 pr-4 py-4 bg-black text-white placeholder-gray-300 border-0 rounded-lg text-lg focus:ring-2 focus:ring-gray-400 focus:outline-none"
              required
            />
          </div>

          {/* Login Button */}
          <button
            onClick={(e) => handleKeyDown({ key: 'Enter', preventDefault: () => {} })}
            className="w-full py-4 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg text-lg transition-colors duration-200 focus:ring-2 focus:ring-gray-400 focus:outline-none"
          >
            Login
          </button>

          {/* Test Supabase Button */}
          <button
            onClick={testSupabase}
            className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg text-base transition-colors duration-200"
          >
            Test Supabase
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
