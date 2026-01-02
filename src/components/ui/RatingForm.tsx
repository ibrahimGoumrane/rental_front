import { motion } from "framer-motion";
import { Check, Loader2, Star } from "lucide-react";
import React, { useState } from "react";
import {
  CATEGORIES,
  RatingCategory,
} from "@/lib/constants/components/RatingForm";

export function RatingForm({
  propertyId: _propertyId,
  onCancel,
}: {
  propertyId: string;
  onCancel?: () => void;
}) {
  const [ratings, setRatings] = useState<Record<RatingCategory, number>>({
    cleanliness: 0,
    accuracy: 0,
    communication: 0,
    location: 0,
    checkIn: 0,
    value: 0,
  });
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [hoveredStar, setHoveredStar] = useState<{
    category: string;
    value: number;
  } | null>(null);
  const handleRate = (category: RatingCategory, value: number) => {
    setRatings((prev) => ({
      ...prev,
      [category]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
  };
  if (isSuccess) {
    return (
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.95,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        className="bg-white p-8 rounded-xl border border-charcoal/10 text-center shadow-sm"
      >
        <div className="w-16 h-16 bg-warm-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-warm-green" />
        </div>
        <h3 className="font-serif text-2xl text-charcoal mb-2">
          Review Submitted!
        </h3>
        <p className="text-charcoal/60 mb-6">
          Thank you for sharing your experience. Your review helps others find
          their perfect stay.
        </p>
        <button
          onClick={onCancel}
          className="text-warm-green font-medium hover:underline"
        >
          Close
        </button>
      </motion.div>
    );
  }
  return (
    <div className="bg-white p-6 md:p-8 rounded-xl border border-charcoal/10 shadow-sm">
      <h3 className="font-serif text-2xl text-charcoal mb-2">Rate your stay</h3>
      <p className="text-charcoal/60 mb-8">
        Share your experience with other travelers
      </p>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          {CATEGORIES.map((category) => (
            <div
              key={category.id}
              className="flex items-center justify-between"
            >
              <span className="text-charcoal/80 font-medium">
                {category.label}
              </span>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRate(category.id, star)}
                    onMouseEnter={() =>
                      setHoveredStar({
                        category: category.id,
                        value: star,
                      })
                    }
                    onMouseLeave={() => setHoveredStar(null)}
                    className="p-1 focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-6 h-6 transition-colors ${
                        (
                          hoveredStar?.category === category.id
                            ? star <= hoveredStar.value
                            : star <= ratings[category.id]
                        )
                          ? "fill-terracotta text-terracotta"
                          : "fill-transparent text-charcoal/20"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <label htmlFor="comment" className="block font-medium text-charcoal">
            Write a review
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tell us about your stay... What did you love? What could be improved?"
            rows={4}
            className="w-full p-4 rounded-lg border border-charcoal/20 focus:border-warm-green focus:ring-1 focus:ring-warm-green outline-none transition-all resize-none bg-sand/10"
            required
            minLength={10}
          />
          <p className="text-xs text-charcoal/40 text-right">
            {comment.length} characters
          </p>
        </div>

        <div className="flex items-center justify-end space-x-4 pt-4 border-t border-charcoal/10">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 text-charcoal/60 hover:text-charcoal font-medium transition-colors"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={
              isSubmitting ||
              Object.values(ratings).some((r) => r === 0) ||
              comment.length < 10
            }
            className="px-8 py-3 bg-charcoal text-white rounded-lg font-medium hover:bg-charcoal/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Review"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
