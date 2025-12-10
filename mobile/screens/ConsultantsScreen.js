import React, { useEffect, useState } from "react";
import { View, FlatList, Text, Button, StyleSheet } from "react-native";
import { api } from "../api/api";

export default function ConsultantsScreen({ navigation, route }) {
  const [list, setList] = useState([]);

  // ✅ Safely read userId, avoid crash
  const userId = route?.params?.userId || null;

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/consultants?userId=${userId}`);
        console.log("Fetching:", `/consultants?userId=${userId}`);
        setList(res.data);
      } catch (e) {
        console.log("Error loading consultants", e.response?.data || e.message);
      }
    })();
  }, []);

  // Optional: if no userId, show a simple message instead of crashing
  if (!userId) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Something went wrong. Please login again.</Text>
        <Button title="Back to Login" onPress={() => navigation.replace("Login")} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={list}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          const name = item?.user?.name || "Unknown Consultant";
          const bio = item?.bio || "No bio available";

          return (
            <View style={styles.card}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.bio}>{bio}</Text>

              <Button
                title="Book Appointment"
                color="#3b82f6"
                onPress={() =>
                  navigation.navigate("Booking", {
                    consultant: item,
                    userId,
          })
        }
      />
    </View>
  );
}}

      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
  },
  name: { fontSize: 20, fontWeight: "bold", color: "#111" },
  bio: { marginVertical: 8, color: "#555" },
});
