import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
interface PropertyCarouselProps {
  images: string[];
  videoUrl?: string;
  title: string;
  location: string;
  price: string;
}
export function PropertyCarousel({
  images,
  videoUrl,
  title,
  location,
  price,
}: PropertyCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  // Combine video and images into a single media array
  const mediaItems = videoUrl
    ? [
        {
          type: "video",
          url: videoUrl,
        },
        ...images.map((url) => ({
          type: "image",
          url,
        })),
      ]
    : images.map((url) => ({
        type: "image",
        url,
      }));
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % mediaItems.length);
  };
  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + mediaItems.length) % mediaItems.length
    );
  };
  // Reset video time when it becomes active
  useEffect(() => {
    if (mediaItems[currentIndex].type === "video" && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // Handle autoplay restrictions if needed
      });
    }
  }, [currentIndex, mediaItems]);
  return (
    <div className="fixed inset-0 w-full h-screen overflow-hidden bg-charcoal z-0">
      <AnimatePresence initial={false} mode="wait">
        {mediaItems[currentIndex].type === "video" ? (
          <motion.div
            key="video-slide"
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
              duration: 0.7,
              ease: "easeOut",
            }}
            className="absolute inset-0 w-full h-full"
          >
            <video
              ref={videoRef}
              src={mediaItems[currentIndex].url}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
          </motion.div>
        ) : (
          <motion.img
            key={`slide-${currentIndex}`}
            src={mediaItems[currentIndex].url}
            alt={`Slide ${currentIndex + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{
              opacity: 0,
              scale: 1.1,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
            }}
          />
        )}
      </AnimatePresence>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

      {/* Content Overlay - Title Section */}
      <div className="absolute inset-0 flex flex-col justify-end pb-40 px-6 md:px-12 pointer-events-none">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.5,
              duration: 0.8,
            }}
            className="text-white"
          >
            <div className="flex items-center space-x-2 mb-4 text-terracotta uppercase tracking-widest text-sm font-medium">
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl mb-6 leading-none shadow-sm">
              {title}
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Navigation Controls - Left and Right Edges */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 p-4 border border-white/30 rounded-full text-white hover:bg-white hover:text-charcoal transition-all duration-300 pointer-events-auto z-20 hidden md:block"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 p-4 border border-white/30 rounded-full text-white hover:bg-white hover:text-charcoal transition-all duration-300 pointer-events-auto z-20 hidden md:block"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators - Bottom Center */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 pointer-events-auto z-20">
        {mediaItems.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex
                ? "bg-terracotta w-8"
                : "bg-white/50 hover:bg-white"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
