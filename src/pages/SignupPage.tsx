import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Upload, User, Calendar, CreditCard, Phone, Mail, Lock, Check, FileText, AlertCircle } from 'lucide-react';
export function SignupPage() {
  const navigate = useNavigate();
  const [fileName, setFileName] = useState<string | null>(null);
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    nationalId: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
    privacyAccepted: false
  });
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value,
      type,
      checked
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock signup logic
    console.log('Signup data:', formData);
    navigate('/login');
  };
  return <motion.div initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} exit={{
    opacity: 0
  }} className="min-h-screen bg-sand py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-warm-green/10 mb-4">
            <Shield className="w-8 h-8 text-warm-green" />
          </div>
          <h1 className="font-serif text-4xl text-charcoal mb-3">
            Create Your Verified Account
          </h1>
          <p className="text-charcoal/60 max-w-lg mx-auto">
            Join our community of trusted travelers. Your information is
            encrypted and used only for secure reservations and identity
            verification.
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-charcoal/5 overflow-hidden border border-charcoal/5">
          {/* Progress Indicator (Visual only) */}
          <div className="h-1 w-full bg-sand">
            <div className="h-full w-1/3 bg-warm-green"></div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-10">
            {/* Section 1: Personal Information */}
            <section>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-sand flex items-center justify-center text-charcoal font-serif font-bold">
                  1
                </div>
                <h2 className="font-serif text-2xl text-charcoal">
                  Personal Information
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-charcoal/80 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full pl-10 pr-4 py-3 border border-charcoal/20 rounded-lg focus:ring-2 focus:ring-warm-green focus:border-warm-green outline-none transition-colors" placeholder="As shown on your ID" required />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal/80 mb-1">
                    Date of Birth
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
                    <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} className="w-full pl-10 pr-4 py-3 border border-charcoal/20 rounded-lg focus:ring-2 focus:ring-warm-green focus:border-warm-green outline-none transition-colors" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal/80 mb-1">
                    National ID / Passport
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
                    <input type="text" name="nationalId" value={formData.nationalId} onChange={handleInputChange} className="w-full pl-10 pr-4 py-3 border border-charcoal/20 rounded-lg focus:ring-2 focus:ring-warm-green focus:border-warm-green outline-none transition-colors" placeholder="Format: AA123456" required />
                  </div>
                  <p className="text-xs text-charcoal/50 mt-1">
                    Required for legal traceability
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal/80 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full pl-10 pr-4 py-3 border border-charcoal/20 rounded-lg focus:ring-2 focus:ring-warm-green focus:border-warm-green outline-none transition-colors" placeholder="+212 6..." required />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal/80 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full pl-10 pr-4 py-3 border border-charcoal/20 rounded-lg focus:ring-2 focus:ring-warm-green focus:border-warm-green outline-none transition-colors" placeholder="you@example.com" required />
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: ID Verification */}
            <section className="pt-6 border-t border-charcoal/10">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-sand flex items-center justify-center text-charcoal font-serif font-bold">
                  2
                </div>
                <h2 className="font-serif text-2xl text-charcoal">
                  ID Verification
                </h2>
              </div>

              <div className="bg-sand/30 rounded-xl p-6 border border-dashed border-charcoal/20 hover:border-warm-green transition-colors group">
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
                    <Upload className="w-6 h-6 text-warm-green" />
                  </div>
                  <h3 className="font-medium text-charcoal mb-1">
                    Upload ID Document
                  </h3>
                  <p className="text-sm text-charcoal/60 mb-4">
                    CIN or Passport (Photo or Scan)
                  </p>

                  <input type="file" id="id-upload" className="hidden" accept="image/*,.pdf" onChange={handleFileChange} />
                  <label htmlFor="id-upload" className="cursor-pointer bg-white border border-charcoal/20 text-charcoal px-6 py-2 rounded-lg text-sm font-medium hover:bg-charcoal hover:text-white transition-colors">
                    Select File
                  </label>

                  {fileName && <div className="mt-4 flex items-center text-sm text-warm-green font-medium bg-warm-green/10 px-3 py-1 rounded-full">
                      <Check className="w-4 h-4 mr-1" />
                      {fileName}
                    </div>}

                  <div className="mt-4 flex items-start text-xs text-charcoal/50 bg-white p-3 rounded-lg border border-charcoal/10 max-w-sm">
                    <Shield className="w-4 h-4 mr-2 text-terracotta flex-shrink-0" />
                    <span>
                      Your ID is encrypted and only used to verify your identity
                      for host security. It is never shared publicly.
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: Account Security */}
            <section className="pt-6 border-t border-charcoal/10">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-sand flex items-center justify-center text-charcoal font-serif font-bold">
                  3
                </div>
                <h2 className="font-serif text-2xl text-charcoal">
                  Account Security
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-charcoal/80 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
                    <input type="password" name="password" value={formData.password} onChange={handleInputChange} className="w-full pl-10 pr-4 py-3 border border-charcoal/20 rounded-lg focus:ring-2 focus:ring-warm-green focus:border-warm-green outline-none transition-colors" placeholder="Min. 8 characters" required />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal/80 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} className="w-full pl-10 pr-4 py-3 border border-charcoal/20 rounded-lg focus:ring-2 focus:ring-warm-green focus:border-warm-green outline-none transition-colors" placeholder="Re-enter password" required />
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4: Legal Consent */}
            <section className="pt-6 border-t border-charcoal/10">
              <div className="space-y-4">
                <label className="flex items-start space-x-3 cursor-pointer group">
                  <div className="relative flex items-center">
                    <input type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={handleInputChange} className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-charcoal/20 bg-white transition-all checked:border-warm-green checked:bg-warm-green hover:border-warm-green" required />
                    <Check className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100" />
                  </div>
                  <span className="text-sm text-charcoal/80 group-hover:text-charcoal transition-colors">
                    I agree to the{' '}
                    <a href="#" className="text-terracotta underline">
                      Terms & Conditions
                    </a>{' '}
                    and accept the platform rules.
                  </span>
                </label>

                <label className="flex items-start space-x-3 cursor-pointer group">
                  <div className="relative flex items-center">
                    <input type="checkbox" name="privacyAccepted" checked={formData.privacyAccepted} onChange={handleInputChange} className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-charcoal/20 bg-white transition-all checked:border-warm-green checked:bg-warm-green hover:border-warm-green" required />
                    <Check className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100" />
                  </div>
                  <span className="text-sm text-charcoal/80 group-hover:text-charcoal transition-colors">
                    I acknowledge the{' '}
                    <a href="#" className="text-terracotta underline">
                      Privacy Policy
                    </a>{' '}
                    and consent to ID verification processing.
                  </span>
                </label>
              </div>
            </section>

            {/* CTA */}
            <div className="pt-6">
              <button type="submit" className="w-full bg-warm-green hover:bg-warm-green/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-warm-green/20 transition-all duration-300 transform hover:-translate-y-1">
                Create Verified Account
              </button>
              <p className="text-center mt-6 text-charcoal/60">
                Already have an account?{' '}
                <Link to="/login" className="text-terracotta font-bold hover:underline">
                  Log in
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Footer Trust */}
        <div className="mt-8 flex justify-center space-x-6 text-charcoal/40">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4" />
            <span className="text-xs font-medium uppercase tracking-wider">
              Bank-Grade Security
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4" />
            <span className="text-xs font-medium uppercase tracking-wider">
              Verified Listings
            </span>
          </div>
        </div>
      </div>
    </motion.div>;
}