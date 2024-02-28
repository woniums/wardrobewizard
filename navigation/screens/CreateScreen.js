import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import { useRoute } from "@react-navigation/native";

const TextInputButton = () => {
  const [number, onChangeNumber] = useState("");

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Enter something..."
        keyboardType="default"
      />
    </SafeAreaView>
  );
};

const Tag = () => {
  const [showTextInput, setShowTextInput] = useState(false);
  const handleClick = () => {
    setShowTextInput(true);
  };
  const route = useRoute();
  const { images } = route.params;

  return (
    <View>
      {showTextInput && <TextInputButton />}
      <TouchableOpacity onPress={handleClick} style={styles.button}>
        <Text>Click me</Text>
      </TouchableOpacity>
      <View>
        {images.length > 0 &&
          images.map((image, index) => (
            <Image
              key={index}
              source={{ uri: image }}
              style={{ width: 200, height: 200, marginBottom: 10 }}
            />
          ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    backgroundColor: "#DDDDDD",
    alignItems: "center",
    padding: 10,
  },
});

export default Tag;
