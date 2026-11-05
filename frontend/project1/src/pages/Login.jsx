
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login({ isLoggedIn, onLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    onLogin(email, password);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white flex items-center justify-center px-5 py-12">
      <div className="w-full max-w-md">

        <Link to="/" className="flex justify-center items-center gap-3 mb-8">
          <img
            src="/logo.png"
            alt="CampusOS Logo"
            className="w-12 h-12 object-contain"
          />
          <span className="text-2xl font-bold">
            Campus<span className="text-cyan-400">OS</span>
          </span>
        </Link>

        <div className="rounded-3xl border border-slate-800 bg-[#10172A] p-7 sm:p-9 shadow-2xl shadow-blue-950/20">

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Welcome Back!</h1>
            <p className="text-slate-400 mt-3 text-sm">
              Login to your CampusOS account
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">

            {/* Email */}
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

            {/* Password */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-slate-300">
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs text-cyan-400 hover:text-cyan-300"
                >
                  Forgot Password?
                </button>
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

            
            {/* Remember Me */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                className="accent-cyan-400"
              />
              <label htmlFor="remember" className="text-sm text-slate-400">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3.5 font-semibold text-white transition hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/20"
            >
              Login to CampusOS →
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
