import 'dotenv/config';

export default {
  expo: {
    name: "GadgetGarage",
    slug: "gadgetgarage",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff"
      }
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png"
    },
    plugins: [
      "expo-router"
    ],
    extra: {
      EXPO_FIREBASE_API_KEY: process.env.EXPO_FIREBASE_API_KEY,
      EXPO_ADMIN_PASSWORD: process.env.EXPO_ADMIN_PASSWORD,
    },
  },
};
