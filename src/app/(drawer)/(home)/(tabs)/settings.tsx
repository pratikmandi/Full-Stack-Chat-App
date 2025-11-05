import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useAuth } from "@clerk/clerk-expo";

const Settings = () => {
  const { signOut } = useAuth();
  return (
    <View className="flex-1 justify-center items-center gap-3">
      <Text className="text-3xl">Settings</Text>
      <TouchableOpacity onPress={() => signOut()}>
        <Text className="text-blue-500 font-semibold"> Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;
