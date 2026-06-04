export interface Destination {
  id: string;
  name: string;
  subtext?: string;
  dateText: string;
  targetDate: Date; // For real live countdown ticks
  bgImage?: string;
  description: string;
  fullTitle?: string; // e.g. SALON DES MÉTIERS, ACTEURS ET PROFESSIONNELS DU SPORT
  entrancePrice?: string; // e.g. 500 F CFA / 1.000 F CFA
  phones?: string[]; // Contact numbers specific to this destination from manual notes
  reachedCount?: number; // Number of people who reached this point when they entered the website
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

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'Organisateur' | 'Partenaire' | 'Visiteur' | 'Intervenant';
  company?: string;
  avatar: string;
}

export interface LiveVisitor {
  sessionId: string;
  location: string;
  currentPath: string;
  role: string;
  isYou: boolean;
}

