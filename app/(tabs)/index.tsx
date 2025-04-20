import "react-native-get-random-values";
import React, { useState, useEffect, useRef } from "react";
import { View, SafeAreaView, Alert } from "react-native";
import MapView, { MapPressEvent, Marker } from "react-native-maps";
import * as Location from "expo-location";

import SearchBar from "../components/SearchBar";
import PlaceInfo from "../components/PlaceInfo";
import HistoryList from "../components/HistoryList";
import { LocationData, Region } from "../utils/types";
import { useStorage } from '../hooks/useStorage';
import { useLocationStore } from "@/app/store/locationStore";
import { commonStyles, homeStyles } from '../styles/globalStyles';

export default function HomeScreen() {
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(
    null
  );
  const [showHistory, setShowHistory] = useState(false);
  const [initialRegion, setInitialRegion] = useState<Region | undefined>(undefined);
  const { searchHistory, loadSearchHistory, saveLocationToHistory } = useStorage();
  const storedLocation = useLocationStore((state) => state.selectedLocation);

  const mapRef = useRef<MapView | null>(null);

  useEffect(() => {
    const initializeApp = async () => {
      await getInitialLocation();
      await loadSearchHistory();
    };
  
    initializeApp();
  }, [loadSearchHistory]);

  // Load search history from storage
  useEffect(() => {
    if (storedLocation && mapRef.current) {
      // Destructure
      const { latitude, longitude, name, address, place_id = "unknown" } = storedLocation;
      
      setSelectedLocation(prevLocation => {
        if (prevLocation?.place_id === place_id) {
          return prevLocation;
        }
        return {
          latitude,
          longitude,
          name,
          address,
          place_id,
        };
      });

      // Animate map to new location
      const region = {
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      
      mapRef.current.animateToRegion(region, 1000);
    }
  }, [storedLocation]);

  // Set initial region based on user's location
  const getInitialLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      const newRegion = {
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
      };
      setInitialRegion(newRegion);
      // Optionally animate to the new region once the map is loaded
      mapRef.current?.animateToRegion(newRegion, 1000);
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };


  const handleLocationSelect = async (location: LocationData) => {
    setSelectedLocation(location);
    await saveLocationToHistory(location);
    setShowHistory(false);
    setInitialRegion(undefined); // Clear initial region after selecting a location

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

  const handleMapPress = async (event: MapPressEvent) => {
    const { coordinate } = event.nativeEvent;
    
    try {
      const [address] = await Location.reverseGeocodeAsync({
        latitude: coordinate.latitude,
        longitude: coordinate.longitude
      });

      if (address) {
        const newLocation: LocationData = {
          place_id: `${coordinate.latitude}-${coordinate.longitude}`,
          name: address.name || `${address.street || ''} ${address.city || ''}`.trim(),
          address: [address.street, address.city, address.country].filter(Boolean).join(', '),
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
        };

        setSelectedLocation(newLocation);
        confirmAndSaveLocation(newLocation);
        
        mapRef.current?.animateToRegion({
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }, 1000);
      }
    } catch (error) {
      console.error('Error reverse geocoding location:', error);
    }
  };

  const confirmAndSaveLocation = async (location: LocationData) => {
    Alert.alert(
      "Save Location",
      `Do you want to save "${location.name}" to your history?`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Save",
          onPress: async () => {
            await saveLocationToHistory(location);
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={homeStyles.content}>
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

        <MapView ref={mapRef} style={homeStyles.map} initialRegion={initialRegion} onPress={handleMapPress}>
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
