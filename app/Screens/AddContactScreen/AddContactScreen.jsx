import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import uuid from "react-native-uuid";

const AddContactScreen = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [landline, setLandline] = useState("");
  const [photo, setPhoto] = useState(null); // For simplicity, assuming photo is stored as URL or base64
  const [isFavorite, setIsFavorite] = useState(false); // State to track favorite status

  const handleAddContact = async () => {
    try {
      // Construct contact object
      const newContact = {
        id: uuid.v4(), // Generate a UUID for the new contact
        name,
        mobile,
        landline,
        photo,
        isFavorite,
      };

      // Retrieve existing contacts from local storage
      const existingContacts = await AsyncStorage.getItem("contacts");
      const parsedContacts = existingContacts
        ? JSON.parse(existingContacts)
        : [];

      // Add new contact to existing contacts array
      const updatedContacts = [...parsedContacts, newContact];

      // Store updated contacts array in local storage
      await AsyncStorage.setItem("contacts", JSON.stringify(updatedContacts));

      // Log success message
      console.log("Contact added successfully:", newContact);

      // Reset input fields
      setName("");
      setMobile("");
      setLandline("");
      setPhoto(null);
      setIsFavorite(false);
    } catch (error) {
      // Handle error
      console.error("Error adding contact:", error);
    }
  };

  const handleTakePhoto = async () => {
    try {
      // Request permission to access the camera
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access camera was denied");
        return;
      }

      // Launch the camera to take a photo
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.5, // Adjust quality as needed
      });

      if (!result.cancelled) {
        // Photo was taken successfully, update the state with the photo URI
        setPhoto(result.uri);
      }
    } catch (error) {
      console.error("Error taking photo:", error);
    }
  };

  const handleBrowsePhoto = async () => {
    try {
      // Request permission to access the photo library
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access photo library was denied");
        return;
      }

      // Launch the image picker to select a photo from the device's image library
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.5, // Adjust quality as needed
      });

      if (!result.cancelled) {
        // Photo was selected successfully, update the state with the photo URI
        setPhoto(result.uri);
      }
    } catch (error) {
      console.error("Error browsing photo:", error);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite); // Toggle favorite status
  };
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Add New Contact
      </Text>
      <TextInput
        style={{
          marginBottom: 10,
          padding: 10,
          borderWidth: 1,
          borderColor: "#ccc",
        }}
        placeholder="Name of person"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={{
          marginBottom: 10,
          padding: 10,
          borderWidth: 1,
          borderColor: "#ccc",
        }}
        placeholder="Mobile phone number"
        value={mobile}
        onChangeText={setMobile}
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
        value={landline}
        onChangeText={setLandline}
        keyboardType="phone-pad"
      />
      <View style={{ marginBottom: 10 }}>
        <Button title="Take Photo" onPress={handleTakePhoto} />
      </View>
      <View style={{ marginBottom: 20 }}>
        <Button title="Browse Photo" onPress={handleBrowsePhoto} />
      </View>
      <View style={{ marginBottom: 20 }}>
        <Button
          title={isFavorite ? "Unmark as Favorite" : "Mark as Favorite"}
          onPress={toggleFavorite}
        />
      </View>
      <Button title="Add Contact" onPress={handleAddContact} />
    </View>
  );
};

export default AddContactScreen;
