import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Lock, Mail, ArrowRight, CheckCircle } from 'lucide-react';
export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login logic
    console.log('Login attempt:', {
      email,
      password
    });
    navigate('/');
  };
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} exit={{
    opacity: 0
  }} className="min-h-[calc(100vh-80px)] bg-sand flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl text-charcoal mb-3">
            Welcome Back
          </h1>
          <p className="text-charcoal/60">
            Sign in to access your verified account and secure reservations.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-charcoal/5 p-8 border border-charcoal/5 relative overflow-hidden">
          {/* Trust Badge */}
          <div className="absolute top-0 right-0 bg-warm-green/10 text-warm-green px-3 py-1 rounded-bl-lg text-xs font-bold uppercase tracking-wider flex items-center">
            <Shield className="w-3 h-3 mr-1" />
            Secure Login
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            {/* Email/Phone Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-charcoal/80">
                Email or Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-charcoal/40">
                  <Mail className="w-5 h-5" />
                </div>
                <input type="text" value={email} onChange={e => setEmail(e.target.value)} className="block w-full pl-10 pr-3 py-3 border border-charcoal/20 rounded-lg focus:ring-2 focus:ring-warm-green focus:border-warm-green transition-colors outline-none bg-sand/20" placeholder="Enter your email or phone" required />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-charcoal/80">
                  Password
                </label>
                <a href="#" className="text-sm text-terracotta hover:text-terracotta/80 font-medium">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-charcoal/40">
                  <Lock className="w-5 h-5" />
                </div>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="block w-full pl-10 pr-3 py-3 border border-charcoal/20 rounded-lg focus:ring-2 focus:ring-warm-green focus:border-warm-green transition-colors outline-none bg-sand/20" placeholder="••••••••" required />
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="w-full flex items-center justify-center bg-warm-green hover:bg-warm-green/90 text-white font-bold py-3.5 rounded-lg transition-all duration-300 shadow-lg shadow-warm-green/20 group">
              <span>Log In</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Trust Notice */}
          <div className="mt-8 pt-6 border-t border-charcoal/10 text-center">
            <div className="flex items-center justify-center space-x-2 text-charcoal/60 text-sm mb-4">
              <CheckCircle className="w-4 h-4 text-warm-green" />
              <span>Your identity is verified for secure reservations</span>
            </div>
            <p className="text-charcoal/60 text-sm">
              New to the platform?{' '}
              <Link to="/signup" className="text-terracotta font-bold hover:underline">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </motion.div>;
}