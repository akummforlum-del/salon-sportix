export interface Destination {
  id: string;
  name: string;
  subtext?: string;
  dateText: string;
  targetDate: Date; // For real live countdown ticks
  bgImage?: string;
  description: string;
  phones?: string[]; // Contact numbers specific to this destination from manual notes
  infoCards: {
    title: string;
    value: string;
    description: string;
  }[];
  // Positioning on the circular interactive home map (percentage based)
  position: {
    top: string;
    left: string;
  };
}

export type ViewMode = 'orbit' | 'detail';

export interface SubscriptionData {
  email: string;
  whatsapp?: string;
  destinationId: string;
  interest: 'visitor' | 'speaker' | 'sponsor' | 'media' | 'expo';
}

