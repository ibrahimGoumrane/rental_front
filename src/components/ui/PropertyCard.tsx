import { AnimatePresence, motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
interface PropertyCardProps {
  id: string;
  title: string;
  location: string;
  price: string;
  image: string;
  videoUrl?: string;
  size?: "small" | "medium" | "large";
  index: number;
}
export function PropertyCard({
  id,
  title,
  location,
  price,
  image,
  videoUrl,
  size = "medium",
  index,
}: PropertyCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  // Determine grid span based on size
  const spanClasses = {
    small: "col-span-1 row-span-1",
    medium: "col-span-1 row-span-2",
    large: "col-span-2 row-span-2", // 2x2 (big)
  };
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Handle autoplay restrictions if needed
      });
    }
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };
  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
      }}
      className={`relative group overflow-hidden rounded-sm cursor-pointer ${spanClasses[size]}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link to={`/property/${id}`} className="block w-full h-full">
        {/* Image/Video Container */}
        <div className="relative w-full h-full overflow-hidden bg-charcoal/10 aspect-[3/4] md:aspect-auto">
          {/* Static Image */}
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out absolute inset-0"
            whileHover={{
              scale: 1.05,
            }}
          />

          {/* Video Preview on Hover */}
          <AnimatePresence>
            {isHovered && videoUrl && (
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
                transition={{
                  duration: 0.5,
                }}
                className="absolute inset-0 w-full h-full z-10"
              >
                <video
                  ref={videoRef}
                  src={videoUrl}
                  className="w-full h-full object-cover"
                  muted
                  loop
                  playsInline
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300 z-20" />

          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 z-30">
            <div className="flex items-center space-x-1 mb-2 text-gold-light text-xs uppercase tracking-widest font-medium">
              <MapPin className="w-3 h-3" />
              <span>{location}</span>
            </div>
            <h3 className="font-serif text-2xl mb-2 leading-tight">{title}</h3>
            <div className="flex items-center justify-between border-t border-white/20 pt-3 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
              <span className="font-serif text-lg">
                {price}{" "}
                <span className="text-sm font-sans text-white/80">/ night</span>
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-gold hover:text-white transition-colors">
                View Details
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
