import { useAuth } from "@/src/provider/AuthProvider";
import ChatProvider from "@/src/provider/ChatProvider";
import { Redirect, Stack } from "expo-router";

export default function HomeLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href={"/(auth)"} />;
  }

  return (
    <ChatProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ChatProvider>
  );
}
