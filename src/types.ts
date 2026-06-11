export interface RSVP {
  id: string;
  name: string;
  status: 'attending' | 'declined';
  guestsCount: number;
  dietary?: string;
  message?: string;
  createdAt: string;
}

export interface WeddingEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  locationName: string;
  address: string;
  mapEmbedUrl?: string;
  mapLink: string;
  iconName: 'rings' | 'sparkles' | 'glass' | 'music';
}

export interface StoryMilestone {
  id: string;
  year: string;
  title: string;
  description: string;
  imageUrl?: string;
  iconName: 'heart' | 'message' | 'ring' | 'camera';
}

export interface GalleryPhoto {
  id: string;
  url: string;
  caption: string;
}
