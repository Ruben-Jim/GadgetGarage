import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";

// Prevent the splash screen from auto-hiding before asset loading is complete
SplashScreen.preventAutoHideAsync();

interface RootLayoutProps {}

const RootLayout = () => {
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
          backgroundColor: "#ffffff",
        },
        headerTintColor: "#1e293b",
        headerTitleStyle: {
          fontWeight: "700",
          fontSize: 20,
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Gadget Garage",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="services"
        options={{
          title: "Our Services",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="quote"
        options={{
          title: "Get Quote",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="messages"
        options={{
          title: "Messages",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="appointment"
        options={{
          title: "Book Appointment",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="payment"
        options={{
          title: "Payment",
          headerShown: true
        }}
      />
    </Stack>
  );
};

export default RootLayout;
