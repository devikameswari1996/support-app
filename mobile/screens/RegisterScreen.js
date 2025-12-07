import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { api, setAuthToken } from '../api/api';

export default function RegisterScreen({ navigation }){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onRegister = async () => {
    try{
      const res = await api.post('/auth/register', { name, email, password });
      const { token } = res.data;
      setAuthToken(token);
      navigation.replace('Consultants');
    }catch(e){
      alert(e.response?.data?.error || 'Register failed');
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Register" onPress={onRegister} />
    </View>
  );
}