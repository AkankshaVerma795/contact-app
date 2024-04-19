import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";

const Sidebar = ({ navigation }) => {
  const navItem = [
    {
      name: "Contact list screen",
      navigate: "ContactList",
    },
    {
      name: "Favorite contact list screen",
      navigate: "ContactFavoriteList",
    },
  ];

  return (
    <>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ flex: 1 }}>
            {navItem.map((data, index) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    data.navigate && navigation.navigate(data.navigate);
                  }}
                  key={index}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 20,
                    paddingVertical: 14,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,

                      flex: 1,
                    }}
                  >
                    {data.name}
                  </Text>
                  <FeatherIcon size={16} name="chevron-right" />
                </TouchableOpacity>
              );
            })}
          </View>

          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 20,
              marginTop: 10,
              borderTopWidth: 1,
            }}
          >
            <Text
              style={{
                fontSize: 13,

                marginBottom: 4,
              }}
            >
              dffdfd
            </Text>
            <Text> contact Store</Text>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default Sidebar;
