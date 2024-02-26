import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, TextInput, TouchableOpacity, Text } from 'react-native';

const Separator = () => <View style={styles.separator} />;

const TextInputButton = () => {
  const [number, onChangeNumber] = useState('');

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
  }

  return (
    <View>
      {showTextInput && <TextInputButton />}
      <TouchableOpacity onPress={handleClick} style={styles.button}>
        <Text>Click me</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin: 10
  }
});

export default Tag;