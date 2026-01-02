import React from "react";
import { ProgressIndicator } from "./ProgressIndicator";

interface SignupCardProps {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
}

export function SignupCard({ children, onSubmit }: SignupCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-charcoal/5 overflow-hidden border border-charcoal/5">
      <ProgressIndicator progress={33} />
      <form onSubmit={onSubmit} className="p-8 md:p-12 space-y-10">
        {children}
      </form>
    </div>
  );
}
