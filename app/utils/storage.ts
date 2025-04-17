import AsyncStorage from "@react-native-async-storage/async-storage";
import { LocationData } from "./types";

const HISTORY_STORAGE_KEY = "placesSearchHistory";

export const loadSearchHistory = async (): Promise<LocationData[]> => {
  try {
    const historyData = await AsyncStorage.getItem(HISTORY_STORAGE_KEY);
    if (historyData) {
      return JSON.parse(historyData);
    }
    return [];
  } catch (error) {
    console.error("Error loading search history:", error);
    return [];
  }
};

export const saveLocationToHistory = async (
  location: LocationData,
  existingHistory: LocationData[]
): Promise<LocationData[]> => {
  try {
    // Check if location already exists in history
    const exists = existingHistory.find(
      (item) => item.place_id === location.place_id
    );

    if (!exists) {
      const timestamp = new Date().getTime();
      const newLocation = { ...location, timestamp };
      // Keep only 20 most recent
      const updatedHistory = [newLocation, ...existingHistory].slice(0, 20);

      await AsyncStorage.setItem(
        HISTORY_STORAGE_KEY,
        JSON.stringify(updatedHistory)
      );
      return updatedHistory;
    }
    return existingHistory;
  } catch (error) {
    console.error("Error saving to history:", error);
    return existingHistory;
  }
};
