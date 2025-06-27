import { createDrawerNavigator } from '@react-navigation/drawer';
import * as React from 'react';

// Update the import path to the correct location of the Tabs component
import index from '.';

const Drawer = createDrawerNavigator();

export default function DrawerLayout() {
  return (
    <Drawer.Navigator screenOptions={
        {
            headerShown:true
        }
    } >
        
      <Drawer.Screen name="Home" component={index}/>
    </Drawer.Navigator>
  );
}