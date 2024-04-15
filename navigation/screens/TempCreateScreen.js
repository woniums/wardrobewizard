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
      <Image source={require('./pathToHeadwearImage')} style={styles.image} />
      <Image source={require('./pathToShirtImage')} style={styles.image} />
      <Image source={require('./pathToNeckAccessoryImage')} style={styles.image} />
      <Image source={require('./pathToMidAccessoryImage')} style={styles.image} />
      <Image source={require('./pathToWristAccessoryImage')} style={styles.image} />
      <Image source={require('./pathToPantsImage')} style={styles.image} />
      <Image source={require('./pathToFootwearImage')} style={styles.image} />
      <Image source={require('./pathToAdditionalAccessoryImage')} style={styles.image} />
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
  image: {
    width: 100,
    height: 100,
    margin: 10,
    resizeMode: 'contain',
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
