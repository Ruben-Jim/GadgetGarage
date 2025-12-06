// Import the functions you need from the SDKs you need
import Constants from 'expo-constants';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Get Firebase API key from Expo Constants
const getFirebaseApiKey = () => {
  // Try to get from Expo Constants first (for Expo Go and builds)
  const apiKey = Constants?.expoConfig?.extra?.EXPO_FIREBASE_API_KEY as string;
  
  // Fallback to process.env for development
  if (!apiKey) {
    return process.env.EXPO_FIREBASE_API_KEY;
  }
  
  return apiKey;
};

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: getFirebaseApiKey(),
    authDomain: "gadget-garage-4a721.firebaseapp.com",
    projectId: "gadget-garage-4a721",
    storageBucket: "gadget-garage-4a721.firebasestorage.app",
    messagingSenderId: "24362439539",
    appId: "1:24362439539:web:0fb2108ff312256f7f2b06"
};

// Initialize Firebase
let app;
let db;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  console.log("Firebase initialized successfully");
} catch (error) {
  console.error("Firebase initialization error:", error);
  // Re-throw to prevent silent failures
  throw error;
}

export { db };
