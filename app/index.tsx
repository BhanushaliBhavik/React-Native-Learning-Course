import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, View } from 'react-native';
import { isLoggedIn } from '../firebase/services/AsyncStorage';

export default function Index() {
  const router = useRouter();
  
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const loggedIn = await isLoggedIn();
        if (loggedIn) {
          // User is logged in, navigate to the main app screen
          router.replace('/Home');
        } else {
          // User is not logged in, navigate to the login screen
          router.replace('/LoginSignUpScreen');
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };

    checkLoginStatus();
  }, []);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      
      <Image source={require('../assets/images/gift.png')} style={{ width: 100, height: 100 }} />
    </View>
  )
}