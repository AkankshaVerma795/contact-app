import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UpdateContactScreen = ({ route, navigation }) => {
  const { contactId } = route.params; // Extracting contactId from navigation params

  // Mocked contact details (replace it with actual data from your database or state)
  const [contactDetails, setContactDetails] = useState(null);
  useEffect(() => {
    // Function to retrieve contact details from AsyncStorage
    const getContactDetails = async () => {
      console.log(contactId);
      try {
        const storedContacts = await AsyncStorage.getItem("contacts");
        if (storedContacts !== null) {
          const parsedContacts = JSON.parse(storedContacts);
          // Find the contact with the given ID
          const foundContact = parsedContacts.find(
            (contact) => contact.id === contactId
          );
          if (foundContact) {
            setContactDetails(foundContact);
          } else {
            // Handle case where contact with given ID is not found
            console.log("Contact not found");
          }
        }
      } catch (error) {
        console.error("Error retrieving contact details:", error);
      }
    };

    // Call the function to get contact details when component mounts
    getContactDetails();
  }, []);
  // Update contact details function
  const handleUpdateContact = async () => {
    try {
      // Retrieve existing contacts from AsyncStorage
      const storedContacts = await AsyncStorage.getItem("contacts");
      const parsedContacts = storedContacts ? JSON.parse(storedContacts) : [];

      // Update contact details in the contacts array
      const updatedContacts = parsedContacts.map((contact) => {
        if (contact.id === contactId) {
          return { ...contact, ...contactDetails };
        }
        return contact;
      });

      // Store updated contacts array in AsyncStorage
      await AsyncStorage.setItem("contacts", JSON.stringify(updatedContacts));

      // Log success message
      console.log("Contact updated successfully:", contactDetails);
      Alert.alert(
        "Contact Updated",
        "Contact details have been updated successfully."
      );
    } catch (error) {
      console.error("Error updating contact:", error);
      Alert.alert("Error", "Failed to update contact. Please try again later.");
    }
  };

  const handleDeleteContact = async () => {
    try {
      // Retrieve existing contacts from AsyncStorage
      const storedContacts = await AsyncStorage.getItem("contacts");
      const parsedContacts = storedContacts ? JSON.parse(storedContacts) : [];

      // Filter out the contact to be deleted
      const updatedContacts = parsedContacts.filter(
        (contact) => contact.id !== contactId
      );

      // Store updated contacts array in AsyncStorage
      await AsyncStorage.setItem("contacts", JSON.stringify(updatedContacts));

      // Log success message
      console.log("Contact deleted successfully:", contactDetails);
      Alert.alert("Contact Deleted", "Contact has been deleted successfully.");

      // Navigate back to ContactListScreen after deletion
      navigation.goBack();
    } catch (error) {
      console.error("Error deleting contact:", error);
      Alert.alert("Error", "Failed to delete contact. Please try again later.");
    }
  };
  if (!contactDetails) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Update Contact
      </Text>
      {/* Input fields */}
      <TextInput
        style={{
          marginBottom: 10,
          padding: 10,
          borderWidth: 1,
          borderColor: "#ccc",
        }}
        placeholder="Name of person"
        value={contactDetails.name}
        onChangeText={(name) => setContactDetails({ ...contactDetails, name })}
      />
      <TextInput
        style={{
          marginBottom: 10,
          padding: 10,
          borderWidth: 1,
          borderColor: "#ccc",
        }}
        placeholder="Mobile phone number"
        value={contactDetails.mobile}
        onChangeText={(mobile) =>
          setContactDetails({ ...contactDetails, mobile })
        }
        keyboardType="phone-pad"
      />
      <TextInput
        style={{
          marginBottom: 10,
          padding: 10,
          borderWidth: 1,
          borderColor: "#ccc",
        }}
        placeholder="Landline number"
        value={contactDetails.landline}
        onChangeText={(landline) =>
          setContactDetails({ ...contactDetails, landline })
        }
        keyboardType="phone-pad"
      />
      <View style={{ marginBottom: 10 }}>
        <Button title="Take Photo" onPress={() => console.log("Take photo")} />
      </View>
      <View style={{ marginBottom: 20 }}>
        <Button
          title="Browse Photo"
          onPress={() => console.log("Browse photo")}
        />
      </View>
      <TouchableOpacity
        style={{
          marginBottom: 10,
          backgroundColor: contactDetails.isFavorite ? "yellow" : "#ccc",
          padding: 10,
          alignItems: "center",
        }}
        onPress={() =>
          setContactDetails({
            ...contactDetails,
            isFavorite: !contactDetails.isFavorite,
          })
        }
      >
        <Text>Favorite</Text>
      </TouchableOpacity>
      <Button title="Update" onPress={handleUpdateContact} />
      <Button title="Delete" onPress={handleDeleteContact} />
    </View>
  );
};

export default UpdateContactScreen;
