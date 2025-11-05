import "../../global.css";
import React from "react";
import { Stack } from "expo-router";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { ActivityIndicator } from "react-native";

const RootStack = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return <ActivityIndicator />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!isSignedIn}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>

      <Stack.Protected guard={isSignedIn}>
        <Stack.Screen name="(drawer)" />
      </Stack.Protected>
    </Stack>
  );
};

const RootStackLayout = () => {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <RootStack />
    </ClerkProvider>
  );
};

export default RootStackLayout;
