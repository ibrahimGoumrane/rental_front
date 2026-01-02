export const PROPERTY_TYPE_LABELS: Record<string, string> = {
  apartment: "Apartment",
  house: "House",
  villa: "Villa",
  studio: "Studio",
  riad: "Riad",
  guesthouse: "Guesthouse",
  duplex: "Duplex",
  penthouse: "Penthouse",
  traditional: "Traditional House",
};

export const RENTAL_MODE_LABELS: Record<string, string> = {
  entire: "Entire place",
  private: "Private room",
  shared: "Shared room",
};

export const HOUSE_RULE_LABELS: Record<string, string> = {
  respect_neighbors: "Respect neighbors and avoid excessive noise",
  no_parties: "No parties or large gatherings",
  quiet_hours: "Quiet hours respected (e.g., after 11:00 PM)",
  reasonable_condition: "Property must be returned in reasonable condition",
  registered_only: "Only registered guests are allowed to stay",
  visitors_declared: "Visitors must be declared in advance",
  max_occupancy: "Maximum occupancy must not be exceeded",
  no_overnight_guests:
    "Overnight guests not listed in the reservation are not allowed",
  valid_id: "Valid identification required for all guests (CIN or passport)",
  couples_laws: "Couples must comply with local laws and house requirements",
  respect_customs: "Respect local customs and neighborhood norms",
  legal_compliance: "No activities contrary to Moroccan law",
  no_smoking: "No smoking inside the property",
  designated_smoking: "Smoking allowed only in designated areas",
  alcohol_respectful: "Alcohol consumption allowed respectfully",
  no_illegal_substances: "No illegal substances",
  no_pets: "Pets are not allowed",
  pets_approved: "Pets allowed with prior approval",
  pets_quiet: "Pets must not disturb neighbors",
  no_commercial: "No commercial or professional use",
  no_filming: "No filming or photography for commercial purposes",
  furniture_moved: "Furniture and appliances must not be moved",
  damage_responsibility: "Guests are responsible for any damage",
  report_issues: "Report any issue immediately to the host",
  reasonable_usage: "Electrical and water usage must be reasonable",
};

export const HOUSE_RULE_GROUPS = [
  {
    id: "conduct",
    title: "General Conduct",
    rules: [
      "respect_neighbors",
      "no_parties",
      "quiet_hours",
      "reasonable_condition",
    ],
  },
  {
    id: "guests",
    title: "Guests & Occupancy",
    rules: [
      "registered_only",
      "visitors_declared",
      "max_occupancy",
      "no_overnight_guests",
    ],
  },
  {
    id: "local",
    title: "Local Regulations",
    rules: ["valid_id", "couples_laws", "respect_customs", "legal_compliance"],
  },
  {
    id: "smoking_pets",
    title: "Smoking & Pets",
    rules: [
      "no_smoking",
      "designated_smoking",
      "alcohol_respectful",
      "no_illegal_substances",
      "no_pets",
      "pets_approved",
      "pets_quiet",
    ],
  },
  {
    id: "property_safety",
    title: "Property & Safety",
    rules: [
      "no_commercial",
      "no_filming",
      "furniture_moved",
      "damage_responsibility",
      "report_issues",
      "reasonable_usage",
    ],
  },
];
