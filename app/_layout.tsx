import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";

// Prevent the splash screen from auto-hiding before asset loading is complete
SplashScreen.preventAutoHideAsync();

interface RootLayoutProps {}

const RootLayout: React.FC<RootLayoutProps> = () => {
  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#2c3e50",
        },
        headerTintColor: "#ffffff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        
        
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Menu",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="services"
        options={{
          title: "Services",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="quote"
        options={{
          title: "Quote",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="messages"
        options={{
          title: "Back",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="appointment"
        options={{
          title: "Menu",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="payment"
        options={{
          title: "Back",
          headerShown: true
        }}
      />
    </Stack>
  );
};

export default RootLayout;
