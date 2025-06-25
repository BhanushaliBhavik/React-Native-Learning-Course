import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SignOut } from '../../firebase/services/AuthServices';

export default function Home() {
  return (
    <View style={styles.container} >
      <Text>Home</Text>
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

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0'


    }
})