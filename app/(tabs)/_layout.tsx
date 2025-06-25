import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: "#673ab7",
        tabBarInactiveTintColor: "#999",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 0,
          elevation: 0,
          shadowColor: "transparent",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0,
          shadowRadius: 0,
        },
      }}>
        <Tabs.Screen
            name="Home"
            options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
                <Ionicons name="home" size={24} color={color} />
            ),
            }}              
        />
        <Tabs.Screen
            name="ToDo"
            options={{
            title: "To-Do",
            tabBarIcon: ({ color }) => (
                <Ionicons name="add-circle" size={24} color={color} />
  )}}
        />
        <Tabs.Screen
            name="Settings"
            options={{
            title: "Settings",
            tabBarIcon: ({ color }) => (
                <Ionicons name="settings" size={24} color={color} />
            ),
            }}
        />
        </Tabs>  );
}