import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import api from '../api/api';

export default function SlotScreen({ route, navigation }) {
  const { consultantId, userId } = route.params;
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    api.get(`/consultants/${consultantId}/slots`)
      .then(res => setSlots(res.data))
      .catch(err => console.log(err));
  }, []);

  const book = (date, time) => {
    api.post('/bookings', { userId, consultantId, date, time })
      .then(() => {
        alert('Appointment Booked!');
        navigation.goBack();
      })
      .catch(() => alert('Slot already booked!'));
  };

  return (
    <View style={{ padding: 20 }}>
      {slots.map((slot, i) => (
        <View key={i}>
          <Text style={{ fontSize: 18, marginVertical: 10 }}>{slot.date}</Text>
          <FlatList
            data={slot.times}
            horizontal
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => book(slot.date, item)}
                style={{ padding: 10, backgroundColor:"#ddd", margin: 5, borderRadius:8 }}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      ))}
    </View>
  );
}
