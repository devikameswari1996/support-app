import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { api, setAuthToken } from '../api/api';

export default function LoginScreen({ navigation }){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = async () => {
    try{
      const res = await api.post('/auth/login', { email, password });
      const { token } = res.data;
      setAuthToken(token);
      // ideally save token using SecureStore or AsyncStorage
      navigation.replace('Consultants', { token });
    }catch(e){
      alert(e.response?.data?.error || 'Login failed');
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Login" onPress={onLogin} />
      <Text onPress={()=>navigation.navigate('Register')} style={{marginTop:10}}>Register</Text>
    </View>
  );
}