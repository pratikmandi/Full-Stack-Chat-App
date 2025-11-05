import { View, Text, FlatList } from "react-native";
import React from "react";
import ChannelListItem from "@/components/ChannelListItem";
import channels from "@/data/channels";
import { SafeAreaView } from "react-native-safe-area-context";
const Home = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        showsVerticalScrollIndicator={false}
        data={channels}
        renderItem={({ item }) => <ChannelListItem channel={item} />}
      />
    </SafeAreaView>
  );
};

export default Home;
