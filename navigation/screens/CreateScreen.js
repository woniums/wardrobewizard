import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Image,
  useWindowDimensions,
} from "react-native";

const Create = () => {
  const [showDropdown, setShowDropdown] = useState(Array(8).fill(false));
  const [selectedOptions, setSelectedOptions] = useState(Array(8).fill(null));

  const toggleDropdown = (index) => {
    const updatedDropdown = [...showDropdown];
    updatedDropdown[index] = !updatedDropdown[index];
    setShowDropdown(updatedDropdown);
  };

  const handleOptionSelect = (option, index) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[index] = option;
    setSelectedOptions(updatedOptions);
    const updatedDropdown = [...showDropdown];
    updatedDropdown[index] = false;
    setShowDropdown(updatedDropdown);
  };

  const dropdownOptions = [
    require("../../assets/shirt1.png"),
    require("../../assets/jeans1.png"),
    require("../../assets/shoes1.png"),
  ];

  const renderDropdown = (index) => {
    return (
      <View style={styles.dropdown}>
        {dropdownOptions.map((option, optionIndex) => (
          <TouchableOpacity key={optionIndex} onPress={() => handleOptionSelect(option, index)}>
            <Image source={option} style={styles.dropdownOptionImage} />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {[...Array(8)].map((_, index) => (
        <View key={index} style={styles.container2}>
          <TouchableOpacity onPress={() => toggleDropdown(index)}>
            <Image
              source={selectedOptions[index] || require("../../assets/blue.png")}
              style={styles.main}
            />
          </TouchableOpacity>
          {showDropdown[index] && renderDropdown(index)}
        </View>
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#010001",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#010001",
  },
  container2: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    position: "relative",
  },
  main: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    borderRadius: 10,
  },
  side: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    borderRadius: 10,
    marginLeft: 10,
  },
  dropdown: {
    position: "absolute",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    elevation: 5,
    flexDirection: "row",
    justifyContent: "space-around",
    width: 200,
  },
  dropdownOptionImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
});

export default Create;
