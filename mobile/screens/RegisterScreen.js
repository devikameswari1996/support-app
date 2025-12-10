import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { api } from "../api/api";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onRegister = async () => {
    try {
      const res = await api.post("/auth/register", {
        name,
        email,
        password
      });

      alert("Account created!");
      navigation.replace("Login");
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
        style={{ marginBottom: 10 }}
      />
      <TextInput
        placeholder="Email"
        value={email}
        autoCapitalize="none"
        onChangeText={setEmail}
        style={{ marginBottom: 10 }}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ marginBottom: 20 }}
      />
      <Button title="Create Account" onPress={onRegister} />
    </View>
  );
}
