import React, { useRef, useEffect } from "react";
import { View, TouchableOpacity, Keyboard } from "react-native";
import Constants from "expo-constants";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { LocationData } from "../../src/utils/types";
import { useLocationStore } from "@/src/store/locationStore";
import { searchBarStyles } from "../../src/styles/globalStyles";

const apiKey = Constants.expoConfig?.extra?.googleApiKey || "";

interface GooglePlacesAutocompleteRef {
  clear: () => void;
  getAddressText: () => string;
  setAddressText: (text: string) => void;
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
  const storedLocation = useLocationStore((state) => state.selectedLocation);

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

  // Clear input if storedLocation is not set
  useEffect(() => {
    if (storedLocation) {
      googlePlacesRef.current?.setAddressText(storedLocation.name);
    }
  }, [storedLocation]);

  return (
    <View style={searchBarStyles.searchContainer}>
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
          container: searchBarStyles.autocompleteContainer,
          textInput: searchBarStyles.searchInput,
          listView: searchBarStyles.listView,
        }}
        renderRightButton={() => (
          <View style={searchBarStyles.buttonContainer}>
            {googlePlacesRef.current?.getAddressText() ? (
              <TouchableOpacity
                style={searchBarStyles.clearButton}
                onPress={clearInput}
              >
                <Ionicons name="close-circle" size={20} color="#888" />
              </TouchableOpacity>
            ) : null}
            <TouchableOpacity
              style={searchBarStyles.historyButton}
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

export default SearchBar;