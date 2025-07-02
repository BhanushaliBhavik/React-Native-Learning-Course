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
          className='p-2.5 bg-blue-600 rounded-md m-2.5 py-5'
        >
          <View className='flex-row items-center justify-between' >
            <Text style={{ color: '#fff', fontSize: 16 }}>Camera</Text>
            <Ionicons name="chevron-forward" size={24} color="#fff" style={{ marginLeft: 10 }} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            router.push('../LocationDemo')
          }}
         className='p-2.5 bg-blue-600 rounded-md m-2.5 py-5'
        >
          <View className='flex-row items-center justify-between'>
            <Text style={{ color: '#fff', fontSize: 16 }}>Location</Text>
            <Ionicons name="chevron-forward" size={24} color="#fff" style={{ marginLeft: 10 }} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            router.push('../NotificationDemo')
          }}
          className='p-2.5 bg-blue-600 rounded-md m-2.5 py-5'
        >
          <View className='flex-row items-center justify-between'>
            <Text style={{ color: '#fff', fontSize: 16 }}>Notifications</Text>
            <Ionicons name="chevron-forward" size={24} color="#fff" style={{ marginLeft: 10 }} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            router.push('../(Drawer)')
          }}
          className='p-2.5 bg-blue-600 rounded-md m-2.5 py-5'
        >
          <View className='flex-row items-center justify-between'>
            <Text style={{ color: '#fff', fontSize: 16 }}>Drawer</Text>
            <Ionicons name="chevron-forward" size={24} color="#fff" style={{ marginLeft: 10 }} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            router.push('../Temp')
          }}
          className='p-2.5 bg-blue-600 rounded-md m-2.5 py-5'
        >
          <View className='flex-row items-center justify-between'>
            <Text style={{ color: '#fff', fontSize: 16 }}>Temp</Text>
            <Ionicons name="chevron-forward" size={24} color="#fff" style={{ marginLeft: 10 }} />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{},
    box:{}
})