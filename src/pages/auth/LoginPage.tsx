import { motion } from "framer-motion";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginCard } from "@/components/auth/LoginPage/LoginCard";
import { LoginForm } from "@/components/auth/LoginPage/LoginForm";
export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login logic
    console.log("Login attempt:", {
      email,
      password,
    });
    navigate("/");
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="min-h-[calc(100vh-80px)] bg-sand flex items-center justify-center px-4 py-12"
    >
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
        <LoginCard>
          <LoginForm
            email={email}
            password={password}
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
            onSubmit={handleSubmit}
          />
        </LoginCard>
      </div>
    </motion.div>
  );
}
