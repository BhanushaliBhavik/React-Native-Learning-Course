import { router } from 'expo-router';
import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SignOut } from '../../firebase/services/AuthServices';
// import Counter from "../mobex/Counter";
import Counter from "../zustand/Counter";
export default function Home() {
  return (
    <View className="flex-1 justify-center items-center" >
      <Text className='text-3xl'>Home</Text>
      <TouchableOpacity
        onPress={() => {
          SignOut();
          router.replace("/LoginSignUpScreen");
        }}
        className='bg-purple-400 px-3 py-2 rounded-xl'
      >
        <Text className='color-black text-2xl font-bold' >Log Out</Text>

      </TouchableOpacity>
      
      <Counter />
      {/* <Counter /> */}

    </View>
  )
}

