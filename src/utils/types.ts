export interface LocationData {
  place_id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  timestamp?: number;
}

export interface Region {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}
