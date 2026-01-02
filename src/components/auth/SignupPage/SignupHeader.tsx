import { Shield } from "lucide-react";

export function SignupHeader() {
  return (
    <div className="text-center mb-10">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-warm-green/10 mb-4">
        <Shield className="w-8 h-8 text-warm-green" />
      </div>
      <h1 className="font-serif text-4xl text-charcoal mb-3">
        Create Your Verified Account
      </h1>
      <p className="text-charcoal/60 max-w-lg mx-auto">
        Join our community of trusted travelers. Your information is encrypted
        and used only for secure reservations and identity verification.
      </p>
    </div>
  );
}
