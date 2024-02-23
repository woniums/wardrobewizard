import * as React from "react";
import { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import shirt1 from "../../assets/shirt1.png";

const OutfitsScreen = ({ navigator }) => {
  const data = [
    { src: shirt1 },
    { src: shirt1 },
    { src: shirt1 },
    { src: shirt1 },
    { src: shirt1 },
    { src: shirt1 },
    { src: shirt1 },
  ];
  const numColumns = data.length;

  return (
    <FlatList
      numColumns={numColumns}
      data={data}
      renderItem={({ item }) => (
        <Image
          source={item.src}
          style={{
            flex: 1 / numColumns,
            borderWidth: 1,
            borderColor: "blue",
            resizeMode: "contain",
            margin: 1,
          }}
        />
      )}
    />
  );
};

export default OutfitsScreen;
