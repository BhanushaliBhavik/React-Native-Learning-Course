import { router } from 'expo-router';
import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SignOut } from '../../firebase/services/AuthServices';
export default function Home() {
  return (
    <View className="flex-1 justify-center" >
      <Text className='bg-red-600 '>Home</Text>
      <TouchableOpacity
        onPress={() => {
          SignOut();
          router.replace("/LoginSignUpScreen");
        }}
        style={{ padding: 10, backgroundColor: '#007BFF', borderRadius: 5 }}
      >
        <Text style={{ color: '#fff', fontSize: 16 }}>Log Out</Text>

      </TouchableOpacity>
      

    </View>
  )
}

