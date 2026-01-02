import { Film, Video, X } from "lucide-react";

interface VideoUploadSectionProps {
  uploadedVideo: string | null;
  onVideoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveVideo: () => void;
}

export function VideoUploadSection({
  uploadedVideo,
  onVideoUpload,
  onRemoveVideo,
}: VideoUploadSectionProps) {
  return (
    <div className="border-t border-charcoal/10 pt-8">
      <h3 className="font-serif text-xl text-charcoal mb-4 flex items-center">
        <Video className="w-5 h-5 mr-2 text-warm-green" />
        Property Video (Optional)
      </h3>

      {!uploadedVideo ? (
        <label className="block border-2 border-dashed border-charcoal/20 rounded-2xl p-8 text-center hover:border-warm-green hover:bg-sand/30 transition-all cursor-pointer group">
          <input
            type="file"
            accept="video/mp4,video/webm"
            onChange={onVideoUpload}
            className="hidden"
          />
          <Film className="w-10 h-10 text-charcoal/40 group-hover:text-warm-green mx-auto mb-3 transition-colors" />
          <p className="font-medium text-charcoal mb-1">Upload a video tour</p>
          <p className="text-xs text-charcoal/60">MP4 or WebM (max 50MB)</p>
        </label>
      ) : (
        <div className="relative rounded-xl overflow-hidden bg-black aspect-video max-w-md">
          <video
            src={uploadedVideo}
            className="w-full h-full object-cover"
            controls
          />
          <button
            onClick={onRemoveVideo}
            className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors z-10"
          >
            <X className="w-5 h-5 text-charcoal" />
          </button>
        </div>
      )}
    </div>
  );
}
