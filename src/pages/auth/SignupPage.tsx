import { motion } from "framer-motion";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AccountSecuritySection } from "@/components/auth/SignupPage/AccountSecuritySection";
import { IDVerificationSection } from "@/components/auth/SignupPage/IDVerificationSection";
import { LegalConsentSection } from "@/components/auth/SignupPage/LegalConsentSection";
import { PersonalInfoSection } from "@/components/auth/SignupPage/PersonalInfoSection";
import { SignupCard } from "@/components/auth/SignupPage/SignupCard";
import { SignupFormFooter } from "@/components/auth/SignupPage/SignupFormFooter";
import { SignupHeader } from "@/components/auth/SignupPage/SignupHeader";
import { TrustFooter } from "@/components/auth/SignupPage/TrustFooter";

export function SignupPage() {
  const navigate = useNavigate();
  const [fileName, setFileName] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    nationalId: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
    privacyAccepted: false,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock signup logic
    console.log("Signup data:", formData);
    navigate("/login");
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      className="min-h-screen bg-sand py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-3xl mx-auto">
        <SignupHeader />

        <SignupCard onSubmit={handleSubmit}>
          <PersonalInfoSection
            formData={{
              fullName: formData.fullName,
              dob: formData.dob,
              nationalId: formData.nationalId,
              phone: formData.phone,
              email: formData.email,
            }}
            onChange={handleInputChange}
          />

          <IDVerificationSection
            fileName={fileName}
            onFileChange={handleFileChange}
          />

          <AccountSecuritySection
            formData={{
              password: formData.password,
              confirmPassword: formData.confirmPassword,
            }}
            onChange={handleInputChange}
          />

          <LegalConsentSection
            formData={{
              termsAccepted: formData.termsAccepted,
              privacyAccepted: formData.privacyAccepted,
            }}
            onChange={handleInputChange}
          />

          <SignupFormFooter />
        </SignupCard>

        <TrustFooter />
      </div>
    </motion.div>
  );
}
