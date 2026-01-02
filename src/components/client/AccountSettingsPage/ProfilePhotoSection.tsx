import { Camera } from "lucide-react";

export function ProfilePhotoSection() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-charcoal/10 p-6 mb-6">
      <h3 className="font-bold text-charcoal mb-4 flex items-center">
        <Camera className="w-5 h-5 mr-2 text-terracotta" />
        Profile Photo
      </h3>
      <div className="flex items-center space-x-6">
        <div className="relative group">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-warm-green to-terracotta flex items-center justify-center text-white text-3xl font-bold shadow-lg">
            JD
          </div>
          <button className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera className="w-6 h-6 text-white" />
          </button>
        </div>
        <div>
          <button className="px-4 py-2 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-colors text-sm font-medium mb-2">
            Upload new photo
          </button>
          <p className="text-xs text-charcoal/60">
            JPG, PNG or GIF. Max size 2MB.
          </p>
        </div>
      </div>
    </div>
  );
}
