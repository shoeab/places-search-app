import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { LocationData } from "../utils/types";
import { useStorage } from "../hooks/useStorage";
import { useLocationStore } from "@/app/store/locationStore";
import { commonStyles, historyStyles } from '../styles/globalStyles';

export default function HistoryScreen() {
  const [history, setHistory] = useState<LocationData[]>([]);
  const [refreshing, setRefreshing] = useState(false); // State for pull-to-refresh
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
    // Store the location data & navigate back to map
    setSelectedLocation(location);
    router.back();
  };

  const formatDate = (timestamp?: number): string => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  // Handle pull-to-refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadHistory();
    setRefreshing(false);
  }, []);

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={commonStyles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={historyStyles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={historyStyles.title}>Search History</Text>
        <TouchableOpacity
          onPress={() => loadHistory()}
          style={historyStyles.rightButton}
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
              style={historyStyles.historyItem}
              onPress={() => handleSelectLocation(item)}
            >
              <View style={historyStyles.itemContent}>
                <Text style={historyStyles.itemName}>{item.name}</Text>
                <Text style={historyStyles.itemAddress}>{item.address}</Text>
                <Text style={historyStyles.itemTime}>
                  {formatDate(item.timestamp)}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      ) : (
        <View style={historyStyles.emptyContainer}>
          <Ionicons name="location-outline" size={64} color="#ccc" />
          <Text style={historyStyles.emptyText}>No search history yet</Text>
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