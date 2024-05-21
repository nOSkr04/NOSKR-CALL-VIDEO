// DEFINE GLOBAL PROVIDERS

import { Slot } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AuthProvider from "../provider/AuthProvider";
import { useEffect } from "react";
import { PermissionsAndroid, Platform } from "react-native";
export default function RootLayout() {
  useEffect(() => {
    const run = async () => {
      if (Platform.OS === "android") {
        await PermissionsAndroid.requestMultiple([
          "android.permission.POST_NOTIFICATIONS",
          "android.permission.BLUETOOTH_CONNECT",
        ]);
      }
    };
    run();
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
