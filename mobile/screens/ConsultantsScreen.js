import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Button } from 'react-native';
import { api } from '../api/api';

export default function ConsultantsScreen({ navigation, route }){
  const [list, setList] = useState([]);
  const userId = route?.params?.userId;   // get from Login

  useEffect(()=>{
    (async ()=>{
      try{
        const res = await api.get('/consultants');
        setList(res.data);
      }catch(e){
        console.error(e);
      }
    })();
  },[]);

  return (
    <View style={{ flex:1, padding: 16 }}>
      <FlatList
        data={list}
        keyExtractor={item => item._id}
        renderItem={({item})=>(
          <View style={{ padding:12, borderBottomWidth:1 }}>
            <Text style={{ fontWeight:'bold' }}>{item.user.name}</Text>
            <Text>{item.bio}</Text>
            <Button
              title="Book"
              onPress={() =>
                navigation.navigate('Booking', { consultant: item, userId })
              }
            />
          </View>
        )}
      />
    </View>
  );
}
