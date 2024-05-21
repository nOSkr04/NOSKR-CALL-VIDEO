import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/provider/AuthProvider";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";
import { useChatContext } from "stream-chat-expo";

export default function UsersScreen() {
  const [users, setUsers] = useState([]);
  const { user } = useAuth();
  const { client } = useChatContext();

  const onPress = async (item) => {
    const channel = client.channel("messaging", {
      members: [user?.id, item.id],
    });

    await channel.watch();
    router.replace(`/(home)/${channel.cid}`);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      let { data: profiles, error } = await supabase
        .from("profiles")
        .select("*")
        .neq("id", user.id);

      setUsers(profiles);
    };
    fetchUsers();
  }, []);

  return (
    <FlatList
      data={users}
      renderItem={({ item }) => (
        <Text onPress={() => onPress(item)} style={{ fontSize: 30 }}>
          {item.id}
        </Text>
      )}
    />
  );
}
