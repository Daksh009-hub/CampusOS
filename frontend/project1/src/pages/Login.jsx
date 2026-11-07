
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function Login({ isLoggedIn, onLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Login failed');
      }

      if (!result.data?._id) {
        throw new Error('User ID was not received from the server.');
      }

      onLogin(result.data);
      navigate('/');
    } catch (err) {
      setError(
        err.message || 'Unable to connect to the server. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white flex items-center justify-center px-5 py-12">
      <div className="w-full max-w-md">

        <Link to="/" className="flex justify-center items-center mb-8">
          <span className="text-3xl font-extrabold tracking-tight text-white transition hover:opacity-90">
            Campus<span className="text-cyan-400">OS</span>
          </span>
        </Link>

        <div className="rounded-3xl border border-slate-800 bg-[#10172A] p-7 sm:p-9 shadow-2xl shadow-blue-950/20">

          <Link
            to="/"
            className="group mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-cyan-400"
          >
            <ArrowLeft
              size={16}
              className="transition group-hover:-translate-x-1"
            />
            Back to Home
          </Link>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Welcome Back!</h1>
            <p className="text-slate-400 mt-3 text-sm">
              Login to your CampusOS account
            </p>
          </div>

          {isLoggedIn && (
            <p className="mb-4 text-center text-sm text-cyan-400">
              You are already logged in.
            </p>
          )}

          {error && (
            <div className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full rounded-xl border border-slate-700 bg-[#080D1C] px-4 py-3.5 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-slate-300">
                  Password
                </label>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full rounded-xl border border-slate-700 bg-[#080D1C] px-4 py-3.5 pr-20 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-cyan-400"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>


            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3.5 font-semibold text-white transition hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Login to CampusOS →'}
            </button>

          </form>
        </div>

        <p className="mt-7 text-center text-xs text-slate-500">
          © 2026 CampusOS. Built for UIET students.
        </p>

      </div>
    </div>
  );
}

export default Login;
