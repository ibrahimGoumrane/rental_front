import { Calendar, CreditCard, Mail, Phone, User } from "lucide-react";
import React from "react";

interface PersonalInfoSectionProps {
  formData: {
    fullName: string;
    dob: string;
    nationalId: string;
    phone: string;
    email: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function PersonalInfoSection({
  formData,
  onChange,
}: PersonalInfoSectionProps) {
  return (
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
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={onChange}
              className="w-full pl-10 pr-4 py-3 border border-charcoal/20 rounded-lg focus:ring-2 focus:ring-warm-green focus:border-warm-green outline-none transition-colors"
              placeholder="As shown on your ID"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal/80 mb-1">
            Date of Birth
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={onChange}
              className="w-full pl-10 pr-4 py-3 border border-charcoal/20 rounded-lg focus:ring-2 focus:ring-warm-green focus:border-warm-green outline-none transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal/80 mb-1">
            National ID / Passport
          </label>
          <div className="relative">
            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
            <input
              type="text"
              name="nationalId"
              value={formData.nationalId}
              onChange={onChange}
              className="w-full pl-10 pr-4 py-3 border border-charcoal/20 rounded-lg focus:ring-2 focus:ring-warm-green focus:border-warm-green outline-none transition-colors"
              placeholder="Format: AA123456"
              required
            />
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
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={onChange}
              className="w-full pl-10 pr-4 py-3 border border-charcoal/20 rounded-lg focus:ring-2 focus:ring-warm-green focus:border-warm-green outline-none transition-colors"
              placeholder="+212 6..."
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal/80 mb-1">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onChange}
              className="w-full pl-10 pr-4 py-3 border border-charcoal/20 rounded-lg focus:ring-2 focus:ring-warm-green focus:border-warm-green outline-none transition-colors"
              placeholder="you@example.com"
              required
            />
          </div>
        </div>
      </div>
    </section>
  );
}
