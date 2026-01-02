import { useNavigate } from "react-router-dom";

export function PropertyNotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center">
      <div className="text-center">
        <h2 className="font-serif text-3xl text-charcoal mb-4">
          Property not found
        </h2>
        <button
          onClick={() => navigate("/landlord/properties")}
          className="px-6 py-3 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-colors"
        >
          Back to Properties
        </button>
      </div>
    </div>
  );
}
