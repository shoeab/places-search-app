import React, { useRef, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Keyboard } from "react-native";
import Constants from "expo-constants";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { LocationData } from "../utils/types";

const apiKey = Constants.expoConfig?.extra?.googleApiKey || "";

interface GooglePlacesAutocompleteRef {
  clear: () => void;
  getAddressText: () => string;
}

interface SearchBarProps {
  onLocationSelect: (location: LocationData) => void;
  onHistoryPress: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onLocationSelect,
  onHistoryPress,
}) => {
  const googlePlacesRef = useRef<GooglePlacesAutocompleteRef>(null);
  const router = useRouter();
  const { location } = useLocalSearchParams();

  const handleLocationSelect = (data: any, details: any = null) => {
    if (!details) return;

    const locationData: LocationData = {
      place_id: data.place_id,
      name: data.structured_formatting?.main_text || data.description,
      address: data.description,
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
    };

    onLocationSelect(locationData);
    Keyboard.dismiss();
  };

  const clearInput = () => {
    googlePlacesRef.current?.clear();
  };

  // Clear input if location is not set or is "undefined"
  useEffect(() => {
    if (!location || location === "undefined") {
      clearInput();
    }
  }, [location]);

  return (
    <View style={styles.searchContainer}>
      <GooglePlacesAutocomplete
        ref={googlePlacesRef as any}
        placeholder="Search for a place"
        onPress={handleLocationSelect}
        fetchDetails={true}
        query={{
          key: apiKey,
          language: "en",
        }}
        enablePoweredByContainer={true}
        styles={{
          container: styles.autocompleteContainer,
          textInput: styles.searchInput,
          listView: styles.listView,
        }}
        renderRightButton={() => (
          <View style={styles.buttonContainer}>
            {googlePlacesRef.current?.getAddressText() ? (
              <TouchableOpacity
                style={styles.clearButton}
                onPress={clearInput}
              >
                <Ionicons name="close-circle" size={20} color="#888" />
              </TouchableOpacity>
            ) : null}
            <TouchableOpacity
              style={styles.historyButton}
              onPress={onHistoryPress}
            >
              <Ionicons name="time-outline" size={24} color="#333" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    width: "100%",
    zIndex: 1,
    padding: 10,
    paddingTop: 10,
  },
  autocompleteContainer: {
    flex: 0,
    width: "100%",
    zIndex: 2,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    height: 50,
    fontSize: 16,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  listView: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  clearButton: {
    padding: 8,
    marginRight: 5,
  },
  historyButton: {
    marginLeft: 5,
    padding: 10,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
  },
});

export default SearchBar;