import { ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import {
  Channel,
  MessageInput,
  MessageList,
  useChatContext,
} from "stream-chat-expo";
import { Channel as ChannelType } from "stream-chat";
import { SafeAreaView } from "react-native-safe-area-context";
const ChannelScreen = () => {
  const [channel, setChannel] = useState<ChannelType | null>(null);
  const { cid } = useLocalSearchParams<{ cid: string }>();

  const { client } = useChatContext();

  useEffect(() => {
    const fetchChannel = async () => {
      const channels = await client.queryChannels({ cid });
      setChannel(channels[0]);
    };
    fetchChannel();
  }, [cid, client]);

  if (!channel) {
    return <ActivityIndicator />;
  }

  return (
    <Channel channel={channel}>
      <MessageList />
      <SafeAreaView edges={["bottom"]}>
        <MessageInput />
      </SafeAreaView>
    </Channel>
  );
};

ChannelScreen.displayName = "ChannelScreen";

export default ChannelScreen;
