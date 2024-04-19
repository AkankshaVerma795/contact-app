import { StatusBar } from "react-native";
import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

import AllContactListScreen from "../Screens/AllContactsList/AllContactsListScreen";
import AllFavoriteContactListScreen from "../Screens/AllFavoriteContactList/AllFavoriteContactListScreen";
import AddContactScreen from "../Screens/AddContactScreen/AddContactScreen";
import UpdateContactScreen from "../Screens/UpdateContactScreen/UpdateContactScreen";

const StackNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <>
      <StatusBar />

      <Stack.Navigator
        initialRouteName="ContactList"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: "transparent" },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        <Stack.Screen name="Main" component={SubContactStackNavigator} />
        <Stack.Screen
          name="ContactFavoriteList"
          component={AllFavoriteContactListScreen}
        />
      </Stack.Navigator>
    </>
  );
};
const SubContactStackNavigator = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="ContactList">
      <Stack.Screen name="ContactList" component={AllContactListScreen} />
      <Stack.Screen name="CreateNewContact" component={AddContactScreen} />
      <Stack.Screen name="UpdateContact" component={UpdateContactScreen} />
    </Stack.Navigator>
  );
};
export default StackNavigator;
