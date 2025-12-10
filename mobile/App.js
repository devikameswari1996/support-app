import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity, Text } from "react-native";

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ConsultantsScreen from "./screens/ConsultantsScreen";
import BookingScreen from "./screens/BookingScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#3b82f6" },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" }
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Support App" }}
        />

        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: "Create Account" }}
        />

        <Stack.Screen
          name="Consultants"
          component={ConsultantsScreen}
          options={({ navigation }) => ({
            title: "Consultants",
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.replace("Login")}>
                <Text
                  style={{
                    color: "white",
                    marginRight: 12,
                    fontWeight: "bold",
                    fontSize: 16
                  }}
                >
                  Logout
                </Text>
              </TouchableOpacity>
            )
          })}
        />

        <Stack.Screen
          name="Booking"
          component={BookingScreen}
          options={{ title: "Book Appointment" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
