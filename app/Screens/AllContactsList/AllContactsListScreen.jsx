import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Button,
  Image,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ContactListScreen = ({ navigation }) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    // Function to retrieve contacts from AsyncStorage
    const getContacts = async () => {
      try {
        const storedContacts = await AsyncStorage.getItem("contacts");
        if (storedContacts !== null) {
          // Parse stored contacts and set them in state
          console.log(storedContacts);
          setContacts(JSON.parse(storedContacts));
        }
      } catch (error) {
        console.error("Error retrieving contacts:", error);
      }
    };
    // try {
    //   AsyncStorage.removeItem("contacts");
    //   console.log("All data cleared successfully");
    // } catch (error) {
    //   console.error("Error clearing data:", error);
    // }
    // Call the function to get contacts when component mounts
    getContacts();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("UpdateContact", { contactId: item.id })
      }
    >
      <View style={styles.card}>
        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
        >
          <View
            style={{ borderRadius: 50, overflow: "hidden", marginRight: 10 }}
          >
            <Image
              source={{ uri: item.photo }}
              style={{ width: 50, height: 50 }}
            />
          </View>
          <Text style={{ fontSize: 16 }}>{item.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleAddContact = () => {
    navigation.navigate("CreateNewContact");
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Contact List
      </Text>
      <FlatList
        data={contacts.sort((a, b) => a.name.localeCompare(b.name))}
        renderItem={renderItem}
        keyExtractor={(item) => item.id?.toString()}
      />
      <View style={{ position: "absolute", bottom: 20, right: 20 }}>
        <Button title="Add" onPress={handleAddContact} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default ContactListScreen;
