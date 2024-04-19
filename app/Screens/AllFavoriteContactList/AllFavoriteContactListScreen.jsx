import React from "react";
import { View, Text, StyleSheet } from "react-native";

const AllFavoriteContactListScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Contact List Screen</Text>
      {/* You can add your contact list UI components here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AllFavoriteContactListScreen;
