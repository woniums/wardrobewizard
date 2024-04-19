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
  return (
    <SafeAreaView style={styles.container}>
      <Image source={require("../../assets/blue.png")} style={styles.main} />
      <Image source={require("../../assets/red.png")} style={styles.side} />
      <Image source={require("../../assets/blue.png")} style={styles.main} />
      <Image source={require("../../assets/red.png")} style={styles.side} />
      <Image source={require("../../assets/blue.png")} style={styles.main} />
      <Image source={require("../../assets/red.png")} style={styles.side} />
      <Image source={require("../../assets/blue.png")} style={styles.main} />
      <Image source={require("../../assets/red.png")} style={styles.side} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    width: 100,
    height: 100,
    margin: 10,
    resizeMode: 'contain',
  },
  side:{
    position: absolute,
    top: 20,
    right: 100,
  },
});

export default Create;

// temp1: headwear
// temp2: shirt/top
// temp3: neck accessory(tie, chain, etc.)
// temp4: mid accessory(belt, bag, etc.)
// temp5: wrist/arm accessory
// temp6: pants/bottom
// temp7: footwear
// temp8: additional accessory
