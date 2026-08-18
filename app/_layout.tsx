import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#1a3a5c",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="lines"
        options={{
          title: "Bus Antananarivo",
          headerBackTitle: "Retour",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="bus-details"
        options={{
          title: "Détails du bus",
          headerBackTitle: "Retour",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="bus-map"
        options={{
          title: "Carte du trajet",
          headerBackTitle: "Retour",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
