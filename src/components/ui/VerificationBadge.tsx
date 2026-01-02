import { motion } from "framer-motion";
export function VerificationBadge({
  className = "w-6 h-6",
}: {
  className?: string;
}) {
  return (
    <motion.div
      className={`text-gold inline-flex items-center justify-center ${className}`}
      initial={{
        opacity: 0,
        scale: 0.8,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 0.5,
        delay: 0.2,
      }}
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-full h-full drop-shadow-sm"
        aria-label="Verified Host"
      >
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
      </svg>
    </motion.div>
  );
}
