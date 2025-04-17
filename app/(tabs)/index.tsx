import "react-native-get-random-values";
import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useRouter } from "expo-router";

import SearchBar from "../components/SearchBar";
import PlaceInfo from "../components/PlaceInfo";
import HistoryList from "../components/HistoryList";
import { LocationData, Region } from "../utils/types";
import { loadSearchHistory, saveLocationToHistory } from "../utils/storage";
import { useLocalSearchParams } from "expo-router";

export default function HomeScreen() {
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(
    null
  );
  const [searchHistory, setSearchHistory] = useState<LocationData[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [initialRegion, setInitialRegion] = useState<Region>({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const mapRef = useRef<MapView | null>(null);
  const router = useRouter();
  const { location } = useLocalSearchParams();
  const parsedLocation =
    typeof location === "string" ? JSON.parse(location) : null;

  useEffect(() => {
    if (parsedLocation) {
    }
  }, [parsedLocation]);

  useEffect(() => {
    initApp();
  }, []);

  const initApp = async () => {
    const history = await loadSearchHistory();
    setSearchHistory(history);
    getUserLocation();
  };

  const getUserLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      setInitialRegion({
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    } catch (error) {
      console.error("Error getting location:", error);
    }
  };

  const handleLocationSelect = async (location: LocationData) => {
    setSelectedLocation(location);
    const updatedHistory = await saveLocationToHistory(location, searchHistory);
    setSearchHistory(updatedHistory);
    setShowHistory(false);

    // Animate map to new location
    mapRef.current?.animateToRegion(
      {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      1000
    );
  };

  const handleHistoryPress = () => {
    setShowHistory(!showHistory);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <SearchBar
          onLocationSelect={handleLocationSelect}
          onHistoryPress={handleHistoryPress}
        />

        {showHistory && (
          <HistoryList
            history={searchHistory}
            onSelectLocation={handleLocationSelect}
            visible={showHistory}
          />
        )}

        <MapView ref={mapRef} style={styles.map} initialRegion={initialRegion}>
          {selectedLocation && (
            <Marker
              coordinate={{
                latitude: selectedLocation.latitude,
                longitude: selectedLocation.longitude,
              }}
              title={selectedLocation.name}
              description={selectedLocation.address}
            />
          )}
        </MapView>

        <PlaceInfo location={selectedLocation} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
