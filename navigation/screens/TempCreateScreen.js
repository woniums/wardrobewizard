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
import { useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { SelectList } from "react-native-dropdown-select-list";

const Create = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={temp1}
      />
      <Image
        source={temp2}
      />
      <Image
        source={temp3}
      />
      <Image
        source={temp4}
      />
      <Image
        source={temp5}
      />
      <Image
        source={temp6}
      />
      <Image
        source={temp7}
      />
      <Image
        source={temp8}
      />
    </SafeAreaView>
  );
};

// temp1: headwear
// temp2: shirt/top
// temp3: neck accessory(tie, chain, etc.)
// temp4: mid accessory(belt, bag, etc.)
// temp5: wrist/arm accessory
// temp6: pants/bottom
// temp7: footwear
// temp8: additional accessory
