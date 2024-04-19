import { StyleSheet, SafeAreaView } from "react-native";
import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import Sidebar from "../layout/Sidebar";
import StackNavigator from "./StackNavigator";

const DrawerNavigation = () => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      initialRouteName="ContactListStack"
      // screenOptions={{
      //   headerShown: false,
      // }}
      drawerContent={(props) => {
        return <Sidebar navigation={props.navigation} />;
      }}
    >
      <Drawer.Screen name="ContactListStack" component={StackNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;

const styles = StyleSheet.create({});
