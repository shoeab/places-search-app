import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { LocationData } from "../utils/types";
import { useStorage } from '../../hooks/useStorage';
import { useLocationStore } from "@/store/locationStore";

export default function HistoryScreen() {
  const [history, setHistory] = useState<LocationData[]>([]);
  const router = useRouter();
  const { loadSearchHistory } = useStorage();
  const setSelectedLocation = useLocationStore((state) => state.setSelectedLocation);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const searchHistory = await loadSearchHistory();
    setHistory(searchHistory);
  };

  const handleSelectLocation = (location: LocationData) => {
    // store the location data & Navigate back to map
    setSelectedLocation(location);
    router.back();
  };

  const formatDate = (timestamp?: number): string => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Search History</Text>
        <TouchableOpacity
          onPress={() => loadHistory()}
          style={styles.rightButton}
        >
          <Ionicons name="reload" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {history.length > 0 ? (
        <FlatList
          data={history}
          keyExtractor={(item) => item.place_id + (item.timestamp || "")}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.historyItem}
              onPress={() => handleSelectLocation(item)}
            >
              <View style={styles.itemContent}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemAddress}>{item.address}</Text>
                <Text style={styles.itemTime}>
                  {formatDate(item.timestamp)}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          )}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="location-outline" size={64} color="#ccc" />
          <Text style={styles.emptyText}>No search history yet</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: {
    marginRight: 15,
  },
  rightButton: {
    marginLeft: "auto",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: "auto",
    color: "#333",
  },
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemContent: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  itemAddress: {
    fontSize: 14,
    color: "#666",
    marginTop: 3,
  },
  itemTime: {
    fontSize: 12,
    color: "#999",
    marginTop: 3,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    marginTop: 10,
  },
});
