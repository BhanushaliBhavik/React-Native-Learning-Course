import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function Settings() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <TouchableOpacity
          onPress={() => {
            router.push('../CameraDemo')
          }}
          style={styles.box}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ color: '#fff', fontSize: 16 }}>Camera</Text>
            <Ionicons name="chevron-forward" size={24} color="#fff" style={{ marginLeft: 10 }} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            router.push('../LocationDemo')
          }}
          style={styles.box}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ color: '#fff', fontSize: 16 }}>Location</Text>
            <Ionicons name="chevron-forward" size={24} color="#fff" style={{ marginLeft: 10 }} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            router.push('../NotificationDemo')
          }}
          style={styles.box}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ color: '#fff', fontSize: 16 }}>Notifications</Text>
            <Ionicons name="chevron-forward" size={24} color="#fff" style={{ marginLeft: 10 }} />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{},
    box:{
         padding: 10, backgroundColor: '#007BFF', borderRadius: 5, margin: 10 , paddingVertical:20
    }
})