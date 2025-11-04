import "../../global.css";
import React from "react";
import { Stack } from "expo-router";

const RootStackLayout = () => {
  const isAuthenticated = true;
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>

      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="(drawer)" />
      </Stack.Protected>
    </Stack>
  );
};

export default RootStackLayout;
