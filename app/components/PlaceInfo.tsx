import React from "react";
import { View, Text } from "react-native";
import { LocationData } from "../../src/utils/types";
import {placesStyles} from '../../src/styles/globalStyles';

interface PlaceInfoProps {
  location: LocationData | null;
}

const PlaceInfo: React.FC<PlaceInfoProps> = ({ location }) => {
  if (!location) {
    return null;
  }

  return (
    <View style={placesStyles.locationInfoContainer}>
      <Text style={placesStyles.locationName}>{location.name}</Text>
      <Text style={placesStyles.locationAddress}>{location.address}</Text>
    </View>
  );
};

export default PlaceInfo;
