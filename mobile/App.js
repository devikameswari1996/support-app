import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ConsultantsScreen from './screens/ConsultantsScreen';
import BookingScreen from './screens/BookingScreen';
import SlotScreen from './screens/SlotScreen';

const Stack = createNativeStackNavigator();

export default function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Consultants" component={ConsultantsScreen} />
        <Stack.Screen name="Booking" component={BookingScreen} />
        <Stack.Screen name="Slots" component={SlotScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}