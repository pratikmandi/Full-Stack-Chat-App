import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";

const ChatLayout = () => {
  const navigation = useNavigation();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Chats",
          headerTransparent: true,
          headerLargeTitle: true,
          headerLeft: () => (
            <Ionicons
              onPress={() => navigation.openDrawer()}
              name="menu-outline"
              size={28}
            />
          ),
          headerRight: () => <Ionicons name="add" size={28} />,
        }}
      />
    </Stack>
  );
};

export default ChatLayout;
