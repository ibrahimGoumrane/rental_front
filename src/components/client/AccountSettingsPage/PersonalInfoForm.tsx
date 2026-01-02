import type { ProfileData } from "@/lib/types/client";

interface PersonalInfoFormProps {
  data: ProfileData;
  onChange: (data: ProfileData) => void;
}

export function PersonalInfoForm({ data, onChange }: PersonalInfoFormProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-charcoal/10 p-6">
      <h3 className="font-bold text-charcoal mb-4">Personal Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-charcoal/80 mb-1">
            First Name
          </label>
          <input
            type="text"
            value={data.firstName}
            onChange={(e) =>
              onChange({
                ...data,
                firstName: e.target.value,
              })
            }
            className="w-full px-4 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal/80 mb-1">
            Last Name
          </label>
          <input
            type="text"
            value={data.lastName}
            onChange={(e) =>
              onChange({
                ...data,
                lastName: e.target.value,
              })
            }
            className="w-full px-4 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal/80 mb-1">
            Email
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) =>
              onChange({
                ...data,
                email: e.target.value,
              })
            }
            className="w-full px-4 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal/80 mb-1">
            Phone
          </label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) =>
              onChange({
                ...data,
                phone: e.target.value,
              })
            }
            className="w-full px-4 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-charcoal/80 mb-1">
            Bio
          </label>
          <textarea
            value={data.bio}
            onChange={(e) =>
              onChange({
                ...data,
                bio: e.target.value,
              })
            }
            rows={3}
            className="w-full px-4 py-2 border border-charcoal/20 rounded-lg outline-none focus:border-warm-green transition-colors resize-none"
          />
        </div>
      </div>
      <button className="mt-6 px-6 py-2 bg-warm-green text-white rounded-lg hover:bg-warm-green/90 transition-colors font-medium">
        Save Changes
      </button>
    </div>
  );
}
