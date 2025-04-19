import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { LocationData } from "../utils/types";
import {historyListStyles} from '../styles/globalStyles';

interface HistoryListProps {
  history: LocationData[];
  onSelectLocation: (location: LocationData) => void;
  visible: boolean;
}

const HistoryList: React.FC<HistoryListProps> = ({
  history,
  onSelectLocation,
  visible,
}) => {
  if (!visible || history.length === 0) {
    return null;
  }

  const formatDate = (timestamp?: number): string => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <View style={historyListStyles.historyContainer}>
      <Text style={historyListStyles.historyTitle}>Search History</Text>
      <FlatList
        data={history}
        keyExtractor={(item) => item.place_id + (item.timestamp || "")}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={historyListStyles.historyItem}
            onPress={() => onSelectLocation(item)}
          >
            <View>
              <Text style={historyListStyles.historyItemName}>{item.name}</Text>
              <Text style={historyListStyles.historyItemAddress}>{item.address}</Text>
              <Text style={historyListStyles.historyItemTime}>
                {formatDate(item.timestamp)}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HistoryList;
