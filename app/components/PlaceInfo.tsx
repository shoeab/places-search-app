import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { LocationData } from "../utils/types";

interface PlaceInfoProps {
  location: LocationData | null;
}

const PlaceInfo: React.FC<PlaceInfoProps> = ({ location }) => {
  if (!location) {
    return null;
  }

  return (
    <View style={styles.locationInfoContainer}>
      <Text style={styles.locationName}>{location.name}</Text>
      <Text style={styles.locationAddress}>{location.address}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  locationInfoContainer: {
    position: "absolute",
    bottom: 20,
    left: 10,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  locationName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  locationAddress: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
});

export default PlaceInfo;
