import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
        <Stack screenOptions={
          {
            headerShown: true,
            animation: "fade_from_bottom",
            contentStyle: { backgroundColor: "#f0f0f0" },
            headerStyle: { backgroundColor: "#673ab7" },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
          }
        }>
          <Stack.Screen name="index" options={{ title: "Welcome" }} />
          <Stack.Screen name="(tabs)" options={
            {
              headerShown: false, // Hide the header for the tabs layout
            }
          } />
          <Stack.Screen name="LoginSignUpScreen" />
          <Stack.Screen name="CameraDemo" />
          <Stack.Screen name="LocationDemo" />
          <Stack.Screen name="(Drawer)" options={
            {
              headerShown: false, // Hide the header for the tabs layout
            }
          }/>
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
