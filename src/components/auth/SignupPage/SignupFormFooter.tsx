import { Link } from "react-router-dom";

export function SignupFormFooter() {
  return (
    <div className="pt-6">
      <button
        type="submit"
        className="w-full bg-warm-green hover:bg-warm-green/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-warm-green/20 transition-all duration-300 transform hover:-translate-y-1"
      >
        Create Verified Account
      </button>
      <p className="text-center mt-6 text-charcoal/60">
        Already have an account?{" "}
        <Link to="/login" className="text-terracotta font-bold hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
