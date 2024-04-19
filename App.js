import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import DrawerNavigation from "./app/Navigation/DrawerNavigation";


export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <DrawerNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
