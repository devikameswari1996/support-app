import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { api } from '../api/api';

export default function BookingScreen({ route, navigation }) {
  const { consultant, userId } = route.params;
  const [date, setDate] = useState('2025-12-07'); // you can change
  const [time, setTime] = useState('15:30');      // simple text input for now

  const book = async () => {
    try {
      const res = await api.post('/bookings', {
        userId,
        consultantId: consultant._id,
        date,
        time
      });
      alert('Booking confirmed!');
      navigation.goBack();
    } catch (e) {
      console.log(e.response?.data || e.message);
      alert(e.response?.data?.error || 'Booking failed');
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
        {consultant.user.name}
      </Text>
      <Text>{consultant.bio}</Text>

      <Text style={{ marginTop: 16 }}>Date (YYYY-MM-DD)</Text>
      <TextInput
        value={date}
        onChangeText={setDate}
        style={{ borderWidth: 1, padding: 8, marginTop: 4 }}
      />

      <Text style={{ marginTop: 16 }}>Time (HH:MM)</Text>
      <TextInput
        value={time}
        onChangeText={setTime}
        style={{ borderWidth: 1, padding: 8, marginTop: 4 }}
      />

      <View style={{ marginTop: 24 }}>
        <Button title="Confirm Booking" onPress={book} />
      </View>
    </View>
  );
}
