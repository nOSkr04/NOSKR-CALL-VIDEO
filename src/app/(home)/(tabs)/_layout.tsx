import React from "react";
import { Tabs } from "expo-router";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/src/components/useColorScheme.web";
import { useClientOnlyValue } from "@/src/components/useClientOnlyValue";
import { SymbolView } from "expo-symbols";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Chats",
          tabBarIcon: ({ size, color }) => (
            <SymbolView
              name="message.and.waveform.fill"
              size={size}
              colors={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Tab Two",
          tabBarIcon: ({ size, color }) => (
            <SymbolView name="u.square" size={size} colors={color} />
          ),
        }}
      />
    </Tabs>
  );
}
