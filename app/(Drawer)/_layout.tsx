// import { createDrawerNavigator } from '@react-navigation/drawer';
// import * as React from 'react';

// // Update the import path to the correct location of the Tabs component
// import index from '.';

// const Drawer = createDrawerNavigator();

// export default function DrawerLayout() {
//   return (
//     <Drawer.Navigator screenOptions={
//         {
//             headerShown:true
//         }
//     } >
        
//       <Drawer.Screen name="Home" component={index}/>
//     </Drawer.Navigator>
//   );
// }

import { Ionicons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CustomDrawerContent from '../components/CustomDrawerContent'; // Import your custom drawer
export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />} // Use custom drawer content
      >
        <Drawer.Screen
          name="index" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Home',
            title: 'Overview',
            drawerIcon: ({ color, size }) => (
                <Ionicons name="home" color={color} size={size} />
            ),
            drawerActiveTintColor: "red",
            drawerActiveBackgroundColor: "#bbb"
          }}

        />
        <Drawer.Screen
          name="Account" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Account',
            title: 'Account',
            drawerIcon: ({ color, size }) => (
                <Ionicons name="person-circle" color={color} size={size} />
            )
          }}

        />
        
      </Drawer>
    </GestureHandlerRootView>
  );
}