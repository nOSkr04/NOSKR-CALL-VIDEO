import { useAuth } from "@/src/provider/AuthProvider";
import { Link, Stack, router } from "expo-router";
import { ChannelList } from "stream-chat-expo";
import { FontAwesome5 } from "@expo/vector-icons";
export default function TabOneScreen() {
  const { user } = useAuth();
  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Link href={"/(home)/users"} asChild>
              <FontAwesome5 name="users" size={24} color="black" />
            </Link>
          ),
        }}
      />
      <ChannelList
        filters={{ members: { $in: [user?.id || ""] } }}
        onSelect={(channel) => router.push(`/channel/${channel.cid}`)}
      />
    </>
  );
}
