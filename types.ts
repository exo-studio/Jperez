
export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: string;
  price: string;
  location: string;
  images: string[];
  description: string;
  hp: number;
  engine: string;
  acceleration: string;
  topSpeed: string;
  lat: number;
  lng: number;
  category?: string;
}

export type Screen = 'HOME' | 'LISTINGS' | 'DETAIL' | 'SHARE';

export interface AppState {
  currentScreen: Screen;
  selectedVehicle: Vehicle | null;
}
