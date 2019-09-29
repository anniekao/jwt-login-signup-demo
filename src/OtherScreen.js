import React from 'react';
import { AsyncStorage, View, Button } from 'react-native';


export default function OtherScreen({navigation}) {
   _handleLogout = async () => {
     try {
       await AsyncStorage.clear();
       navigation.navigate('Auth');
     } catch (err) {
       console.error(err);
     }
   };
  return (
    <View>
      <Button title="Go to the feed" onPress={() => navigation.navigate('Feed')} />
      <Button title="Sign me out of here!" onPress={() => _handleLogout()} />
    </View>
  );
}