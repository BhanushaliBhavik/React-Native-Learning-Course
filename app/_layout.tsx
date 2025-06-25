import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack screenOptions={
    {
      headerShown: false,
      animation: "fade_from_bottom",
      contentStyle: { backgroundColor: "#f0f0f0" },
      headerStyle: { backgroundColor: "#673ab7" },
      headerTintColor: "#fff",
      headerTitleStyle: { fontWeight: "bold" },
    }
  }/>;
}
