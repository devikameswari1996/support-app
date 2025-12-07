import React, { useState } from 'react';
import { View, Text, Button, Platform } from 'react-native';
import { api, setAuthToken } from '../api/api';

export default function BookingScreen({ route, navigation }) {
  const { consultant } = route.params;
  const [type, setType] = useState('phone');

  const startPayment = async () => {
    try{
      // ensure token is set globally; in demo we assume token present
      const res = await api.post('/bookings/create-session', { consultantId: consultant._id, type, scheduledAt: new Date() });
      // redirect to session.url (Stripe Checkout) — in Expo you can use WebBrowser.openBrowserAsync
      navigation.navigate('Payment', { checkoutUrl: res.data.url, bookingId: res.data.bookingId });
    }catch(e){
      alert(e.response?.data?.error || 'Error creating session');
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontWeight:'bold', fontSize:18 }}>{consultant.user.name}</Text>
      <Text>{consultant.bio}</Text>
      <View style={{ marginTop: 16 }}>
        <Button title={`Phone - ₹${consultant.pricePhone}`} onPress={()=>setType('phone')} />
        <View style={{height:8}} />
        <Button title={`In-person - ₹${consultant.priceInPerson}`} onPress={()=>setType('in_person')} />
      </View>
      <View style={{ marginTop: 20 }}>
        <Button title="Proceed to Pay" onPress={startPayment} />
      </View>
    </View>
  );
}