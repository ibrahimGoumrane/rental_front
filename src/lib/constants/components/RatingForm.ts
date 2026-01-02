export type RatingCategory =
  | "cleanliness"
  | "accuracy"
  | "communication"
  | "location"
  | "checkIn"
  | "value";

export const CATEGORIES: {
  id: RatingCategory;
  label: string;
}[] = [
  {
    id: "cleanliness",
    label: "Cleanliness",
  },
  {
    id: "accuracy",
    label: "Accuracy",
  },
  {
    id: "communication",
    label: "Communication",
  },
  {
    id: "location",
    label: "Location",
  },
  {
    id: "checkIn",
    label: "Check-in",
  },
  {
    id: "value",
    label: "Value",
  },
];
