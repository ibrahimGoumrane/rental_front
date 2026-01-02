export interface Message {
  id: string;
  text: string;
  sender: "me" | "them";
  timestamp: string;
}

export const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    text: "Hello! I am interested in booking The Glass Pavilion for next weekend.",
    sender: "me",
    timestamp: "10:30 AM",
  },
  {
    id: "2",
    text: "Hi there! That is a wonderful choice. The property is currently available for those dates.",
    sender: "them",
    timestamp: "10:32 AM",
  },
  {
    id: "3",
    text: "Excellent. Does the property have a heated pool?",
    sender: "me",
    timestamp: "10:35 AM",
  },
  {
    id: "4",
    text: "Yes, the infinity pool is heated year-round to a comfortable 82 degrees.",
    sender: "them",
    timestamp: "10:36 AM",
  },
];
