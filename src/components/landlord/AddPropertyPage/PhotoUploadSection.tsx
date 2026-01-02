import { Upload, X } from "lucide-react";
import { motion } from "framer-motion";

interface PhotoUploadSectionProps {
  uploadedImages: string[];
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: (index: number) => void;
}

export function PhotoUploadSection({
  uploadedImages,
  onImageUpload,
  onRemoveImage,
}: PhotoUploadSectionProps) {
  return (
    <div>
      <label className="block border-2 border-dashed border-charcoal/20 rounded-2xl p-12 text-center hover:border-warm-green hover:bg-sand/30 transition-all cursor-pointer group mb-8">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={onImageUpload}
          className="hidden"
        />
        <Upload className="w-12 h-12 text-charcoal/40 group-hover:text-warm-green mx-auto mb-4 transition-colors" />
        <p className="text-lg font-medium text-charcoal mb-2">
          Click to upload photos
        </p>
        <p className="text-sm text-charcoal/60">
          JPG, PNG or WebP (max 5MB each)
        </p>
      </label>

      {uploadedImages.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {uploadedImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative group aspect-square rounded-xl overflow-hidden"
            >
              <img
                src={image}
                alt={`Upload ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {index === 0 && (
                <div className="absolute top-2 left-2 bg-gold text-white text-xs font-bold px-2 py-1 rounded">
                  Cover
                </div>
              )}
              <button
                onClick={() => onRemoveImage(index)}
                className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-5 h-5 text-charcoal" />
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {uploadedImages.length > 0 && uploadedImages.length < 5 && (
        <p className="text-sm text-terracotta mb-8">
          Please upload at least {5 - uploadedImages.length} more photo(s)
        </p>
      )}
    </div>
  );
}
