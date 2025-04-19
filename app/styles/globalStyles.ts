import { StyleSheet } from "react-native";

export const colors = {
  primary: "#0a7ea4",
  background: "#fff",
  text: {
    primary: "#333",
    secondary: "#666",
    tertiary: "#999",
  },
  border: "#eee",
  shadow: "#000",
};

export const commonStyles = StyleSheet.create({
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
});

export const historyStyles = StyleSheet.create({
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

export const historyListStyles = StyleSheet.create({
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

export const placesStyles = StyleSheet.create({
  locationInfoContainer: {
    position: "absolute",
    bottom: 60,
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

export const searchBarStyles = StyleSheet.create({
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
