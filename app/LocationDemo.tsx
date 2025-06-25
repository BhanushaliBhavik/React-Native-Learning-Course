import * as Location from 'expo-location'; // Ensure you have installed expo-location
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function LocationDemo() {
    const [location, setLocation] = useState(null);
  return (
    <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
                (async () => {
                    let { status } = await Location.requestForegroundPermissionsAsync();
                    if (status !== 'granted') {
                        console.log('Permission to access location was denied');
                        return;
                    }

                    let loc = await Location.getCurrentPositionAsync({});
                    setLocation(loc);
                    console.log(loc);
                })();
          }
            }   
style={{ padding: 10, backgroundColor: '#007BFF', borderRadius: 5 }}
        >
          <Text style={{ color: '#fff', fontSize: 16 }}>Get Location</Text>
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