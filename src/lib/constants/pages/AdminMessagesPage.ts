export interface ConversationUser {
  name: string;
  avatar: string | null;
  initials?: string;
}

export interface MockConversation {
  id: number;
  priority: "high" | "medium" | "low";
  guest: ConversationUser;
  host: ConversationUser;
  lastMessage: string;
  flaggedPortion: string | null;
  timestamp: string;
  flagReason: string;
  secondaryTags: string[];
  aiConfidence: number;
  status: "unreviewed" | "under-review" | "resolved";
  assignedAdmin?: string;
  violationCount: number;
}

export const MOCK_CONVERSATIONS: MockConversation[] = [
  {
    id: 1,
    priority: "high",
    guest: {
      name: "Sarah Jenkins",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100",
    },
    host: {
      name: "Eleanor Martinez",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100",
    },
    lastMessage: "Hey, can we talk on WhatsApp? My number is +212 6XX XXX XXX",
    flaggedPortion: "WhatsApp? My number is +212 6XX XXX XXX",
    timestamp: "2 hours ago",
    flagReason: "Exchange of Contact Information",
    secondaryTags: ["Phone number detected"],
    aiConfidence: 94,
    status: "unreviewed",
    violationCount: 2,
  },
  {
    id: 2,
    priority: "high",
    guest: {
      name: "Ahmed Hassan",
      avatar: null,
      initials: "AH",
    },
    host: {
      name: "Lisa Anderson",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100",
    },
    lastMessage: "Email me at example@gmail.com for faster response",
    flaggedPortion: "Email me at example@gmail.com",
    timestamp: "30 minutes ago",
    flagReason: "Exchange of Contact Information",
    secondaryTags: ["Email detected"],
    aiConfidence: 96,
    status: "unreviewed",
    violationCount: 1,
  },
  {
    id: 3,
    priority: "medium",
    guest: {
      name: "Michael Chen",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100",
    },
    host: {
      name: "Marco Rossi",
      avatar: null,
      initials: "MR",
    },
    lastMessage: "This property is absolutely terrible and disgusting!",
    flaggedPortion: "terrible and disgusting",
    timestamp: "5 hours ago",
    flagReason: "Blocked Keywords Detected",
    secondaryTags: ["Profanity detected"],
    aiConfidence: 88,
    status: "under-review",
    assignedAdmin: "Admin John",
    violationCount: 3,
  },
  {
    id: 4,
    priority: "low",
    guest: {
      name: "Emma Thompson",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100",
    },
    host: {
      name: "Yuki Tanaka",
      avatar: null,
      initials: "YT",
    },
    lastMessage: "Thank you so much! Looking forward to the stay.",
    flaggedPortion: null,
    timestamp: "1 day ago",
    flagReason: "Blocked Keywords Detected",
    secondaryTags: ["False positive"],
    aiConfidence: 62,
    status: "resolved",
    violationCount: 0,
  },
];

export const INITIAL_BLOCKED_KEYWORDS = [
  "whatsapp",
  "email",
  "phone",
  "call me",
  "text me",
  "paypal",
  "venmo",
  "cash app",
  "terrible",
  "disgusting",
  "awful",
];
