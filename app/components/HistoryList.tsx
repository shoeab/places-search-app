import React from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { LocationData } from "../utils/types";

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
    <View style={styles.historyContainer}>
      <Text style={styles.historyTitle}>Search History</Text>
      <FlatList
        data={history}
        keyExtractor={(item) => item.place_id + (item.timestamp || "")}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.historyItem}
            onPress={() => onSelectLocation(item)}
          >
            <View>
              <Text style={styles.historyItemName}>{item.name}</Text>
              <Text style={styles.historyItemAddress}>{item.address}</Text>
              <Text style={styles.historyItemTime}>
                {formatDate(item.timestamp)}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  historyContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    zIndex: 1,
    maxHeight: "60%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 10,
    marginTop: 10,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  historyItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  historyItemName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  historyItemAddress: {
    fontSize: 14,
    color: "#666",
    marginTop: 3,
  },
  historyItemTime: {
    fontSize: 12,
    color: "#999",
    marginTop: 3,
  },
});

export default HistoryList;
