import { View, Text, Image } from "react-native";
import React from "react";
import { Channel } from "@/types";
import { formatDistanceToNow } from "date-fns";

type ChannelItemProps = {
  channel: Channel;
};

const ChannelListItem = ({ channel }: ChannelItemProps) => {
  return (
    <View className="flex-row p-3 gap-3">
      <Image
        source={{ uri: channel.avatar }}
        className="w-12 h-12 rounded-full"
      />
      <View className="flex-1">
        <Text className="font-bold" numberOfLines={1}>
          {channel.name}
        </Text>
        <Text className="text-sm text-gray-500" numberOfLines={1}>
          {channel.lastMessage?.content || "No Messages"}
        </Text>
      </View>

      {channel.lastMessage && (
        <Text className="text-gray-500 text-sm">
          {formatDistanceToNow(new Date(channel.lastMessage?.createdAt), {
            addSuffix: true,
          })}
        </Text>
      )}
    </View>
  );
};

export default ChannelListItem;
