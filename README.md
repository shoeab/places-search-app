# Places Search App

A React Native mobile application that utilizes the Google Maps Places API for searching locations and maintaining a history of searched places.

## Features

- **Google Maps Place Search**: Search for places using the Google Maps Places API with real-time suggestions as you type.
- **Display on Map**: View selected locations on a Google Map with relevant details.
- **Maintain Search History**: Keep a record of all searched locations, displayed in a list format and persisted locally.
- **Select from History**: Easily select a place from your search history to navigate back to it on the map.
- **Modern Architecture**: Built with Expo Router and TypeScript for a maintainable, type-safe codebase.
- **State Management**: Utilizes Zustand for managing the selected location state and a custom `useStorage` hook for managing search history.

## Technology Stack

- **React Native**: Core framework for building the mobile application
- **Expo**: Development platform for React Native
- **TypeScript**: For type-safe code
- **Expo Router**: File-based routing system for navigation
- **React Native Maps**: For map integration
- **Google Places API**: For location search and place details
- **AsyncStorage**: For local persistence of search history
- **Zustand**: Lightweight state management for managing the selected location
- **Custom Hooks**: Includes a `useStorage` hook for managing search history

## Prerequisites

- Node.js (LTS version)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your mobile device (for testing)
- Google Maps API key with Places API enabled

## Installation and Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/shoeab/places-search-app.git
   cd places-search-app
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure your Google API key:**

   - Create a Google API key. Make sure the Places info, Android SDK, iOS SDK is enabled for the API key.
   - ⁠Create a .env file in the root of the project by copying the content of env_template
   - ⁠Update the vale of `GOOGLE_API_KEY` with your own key
   - Update the package name `com.yourname.placessearchapp` in `app.config.js` with your preferred package name

4. **Run the app:**

   ```bash
   npx expo start
   ```

5. **Testing on a device:**
   - Scan the QR code with your mobile device using the Expo Go app
   - Or press 'a' to run on Android emulator
   - Or press 'i' to run on iOS simulator (macOS only)

## Project Structure

```
app/
  ├── _layout.tsx                  # Defines the app's navigation layout
  ├── index.tsx                    # Main screen with map and search
  ├── history.tsx                  # Search history screen
  ├── components/
  │   ├── SearchBar.tsx            # Search component with Google Places
  │   ├── HistoryList.tsx          # Component for displaying search history
  │   └── PlaceInfo.tsx            # Component for displaying selected place info
  ├── hooks/
  │   └── useStorage.ts            # Custom hook for managing search history
  ├── store/
  │   └── locationStore.ts         # Zustand store for managing selected location
  └── utils/
      ├── types.ts                 # TypeScript interfaces
  └── styles/
      ├── globalStyles.ts          # StyleSheet instances
```

## Key Functionality

### Google Maps Place Search

The search functionality is implemented using the `react-native-google-places-autocomplete` package, which provides real-time suggestions as the user types. The search results include place details such as name, address, and coordinates.

### Display on Map

Once a place is selected, it is displayed on a Google Map using `react-native-maps`. The map centers on the selected location and displays a marker with relevant information.

### Search History

Search history is managed using a custom `useStorage` hook, which leverages AsyncStorage for local persistence. The history is limited to the 20 most recent searches to optimize performance.

### State Management with Zustand

The app uses Zustand for lightweight state management. The selected location is stored in a Zustand store, making it accessible across components without the need for prop drilling.

### Performance Optimizations

- Limited history size to prevent excessive memory usage
- Used FlatList for efficient rendering of history items
- Component separation for better code organization and reusability
- Optimized map rendering

## Development Notes

- The app is structured using the file-based routing system provided by Expo Router
- TypeScript is used throughout the project for type safety
- Components are organized in a modular fashion for better maintainability

## License

This project is licensed under the MIT License - see the LICENSE file for details.
