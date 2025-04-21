import { create } from "zustand";
import { LocationData } from "../utils/types";

interface LocationStore {
  selectedLocation: LocationData | null;
  setSelectedLocation: (location: LocationData | null) => void;
}

export const useLocationStore = create<LocationStore>((set) => ({
  selectedLocation: null,
  setSelectedLocation: (location: LocationData | null) =>
    set({ selectedLocation: location }),
}));
