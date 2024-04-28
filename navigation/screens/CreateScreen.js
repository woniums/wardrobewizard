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
import { SelectList } from 'react-native-dropdown-select-list'

const data = [
  {key:'1', value:'Mobiles', disabled:true},
  {key:'2', value:'Appliances'},
  {key:'3', value:'Cameras'},
  {key:'4', value:'Computers', disabled:true},
  {key:'5', value:'Vegetables'},
  {key:'6', value:'Diary Products'},
  {key:'7', value:'Drinks'},
]

const Create = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={require("../../assets/blue.png")} style={styles.main} />
      <SafeAreaView style={styles.container}>
        <Image source={require("../../assets/red.png")} style={styles.side} />
      </SafeAreaView>
      <SelectList 
        setSelected={(val) => setSelected(val)} 
        data={data} 
        save="value"
      />
      <Image source={require("../../assets/blue.png")} style={styles.main} />
      <SafeAreaView style={styles.container}>
        <Image source={require("../../assets/red.png")} style={styles.side} />
      </SafeAreaView>
      <Image source={require("../../assets/blue.png")} style={styles.main} />
      <SafeAreaView style={styles.container}>
        <Image source={require("../../assets/red.png")} style={styles.side} />
      </SafeAreaView>
      <Image source={require("../../assets/blue.png")} style={styles.main} />
      <SafeAreaView style={styles.container}>
        <Image source={require("../../assets/red.png")} style={styles.side} />
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    width: 150,
    height: 150,
    marginRight: 100,
    marginLeft: 70,
    marginTop: 10,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  side:{    
    width: 120,
    height:120,    
    marginLeft:60,
    top: 20,
    right: 100,
    borderRadius: 10,
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
