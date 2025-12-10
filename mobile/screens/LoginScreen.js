import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { api, setAuthToken } from "../api/api";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });
      const { token, user } = res.data;
      setAuthToken(token);
      navigation.replace("Consultants", { userId: user._id });  // ✅ important
    } catch (e) {
      alert(e.response?.data?.error || "Login failed");
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Login" onPress={onLogin} color="#3b82f6" />

      <Text style={styles.link} onPress={() => navigation.navigate("Register")}>
        Create new account
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, justifyContent: "center" },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12
  },
  link: {
    marginTop: 15,
    textAlign: "center",
    color: "#3b82f6",
    fontWeight: "bold",
    fontSize: 16
  }
});
