import { PropsWithChildren, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";

import { StreamChat } from "stream-chat";
import { Chat, OverlayProvider } from "stream-chat-expo";
import { useAuth } from "./AuthProvider";

const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY!);

export default function ChatProvider({ children }: PropsWithChildren) {
  const [isReady, setIsReady] = useState(false);
  const { user } = useAuth();
  useEffect(() => {
    if (!user) {
      return;
    }
    const connect = async () => {
      await client.connectUser(
        {
          id: user?.id,
          name: "Test User",
          image:
            "https://images.pexels.com/photos/22882440/pexels-photo-22882440/free-photo-of-copa-cozinha-04.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          role: "admin",
        },
        // ened tokenProvider hiine
        client.devToken(user?.id)
      );
      setIsReady(true);

      // const channel = client.channel("messaging", "the_park", {
      //   name: "The Park",
      // });

      // await channel.watch();
    };
    connect();

    return () => {
      if (isReady) {
        client.disconnectUser();
      }
      setIsReady(false);
    };
  }, [isReady, user]);
  if (!isReady) {
    return <ActivityIndicator />;
  }

  return (
    <OverlayProvider>
      <Chat client={client}>{children}</Chat>
    </OverlayProvider>
  );
}
