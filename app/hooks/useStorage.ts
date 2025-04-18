import { useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LocationData } from "../utils/types";

const HISTORY_STORAGE_KEY = "placesSearchHistory";

export const useStorage = () => {
  const [searchHistory, setSearchHistory] = useState<LocationData[]>([]);

  const loadSearchHistory = useCallback(async () => {
    try {
      const historyData = await AsyncStorage.getItem(HISTORY_STORAGE_KEY);
      const history = historyData ? JSON.parse(historyData) : [];
      setSearchHistory(history);
      return history;
    } catch (error) {
      console.error("Error loading search history:", error);
      return [];
    }
  }, []);

  const saveLocationToHistory = useCallback(
    async (location: LocationData) => {
      try {
        // Check if location already exists in history
        const exists = searchHistory.find(
          (item) => item.place_id === location.place_id
        );

        if (!exists) {
          const timestamp = new Date().getTime();
          const newLocation = { ...location, timestamp };
          // Keep only 20 most recent
          const updatedHistory = [newLocation, ...searchHistory].slice(0, 20);

          await AsyncStorage.setItem(
            HISTORY_STORAGE_KEY,
            JSON.stringify(updatedHistory)
          );
          setSearchHistory(updatedHistory);
          return updatedHistory;
        }
        return searchHistory;
      } catch (error) {
        console.error("Error saving to history:", error);
        return searchHistory;
      }
    },
    [searchHistory]
  );

  return {
    searchHistory,
    loadSearchHistory,
    saveLocationToHistory,
  };
};
