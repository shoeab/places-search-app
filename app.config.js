require('dotenv').config();

export default {
    "expo": {
        "name": "Places Search App",
        "slug": "places-search-app",
        "version": "1.0.0",
        "orientation": "portrait",
        "icon": "./assets/icon.png",
        "userInterfaceStyle": "light",
        "splash": {
            "image": "./assets/splash.png",
            "resizeMode": "contain",
            "backgroundColor": "#ffffff"
        },
        "assetBundlePatterns": [
            "**/*"
        ],
        "ios": {
            "supportsTablet": true,
            "bundleIdentifier": "com.yourname.placessearchapp",
            "config": {
                "googleMapsApiKey": "AIzaSyA8QQ1gl-ZzeUhISHTIXsLA5MBUl4D_QVM"
            },
            "infoPlist": {
                "NSLocationWhenInUseUsageDescription": "This app needs access to your location to show it on the map."
            }
        },
        "android": {
            "adaptiveIcon": {
                "foregroundImage": "./assets/adaptive-icon.png",
                "backgroundColor": "#ffffff"
            },
            "package": "com.yourname.placessearchapp",
            "config": {
                "googleMaps": {
                    "apiKey": "AIzaSyA8QQ1gl-ZzeUhISHTIXsLA5MBUl4D_QVM"
                }
            },
            "permissions": [
                "android.permission.ACCESS_COARSE_LOCATION",
                "android.permission.ACCESS_FINE_LOCATION"
            ]
        },
        "web": {
            "favicon": "./assets/favicon.png"
        },
        "plugins": [
            [
                "expo-location",
                {
                    "locationAlwaysAndWhenInUsePermission": "Allow Places Search App to use your location."
                }
            ]
        ],
        "scheme": "places-search-app",
        "extra": {
            "googleApiKey": process.env.GOOGLE_API_KEY,
        },
    }
};