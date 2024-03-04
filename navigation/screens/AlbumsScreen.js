import * as React from "react";
import { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import shirt1 from "../../assets/shirt1.png";

export default function AlbumsScreen({ navigation }) {
  const data = [
    { src: shirt1 },
    { src: shirt1 },
    { src: shirt1 },
    { src: shirt1 },
    { src: shirt1 },
    { src: shirt1 },
    { src: shirt1 },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({ item }) => (
          <Image
            source={item.src}
            style={{
              width: 200,
              height: 200,
              borderWidth: 1,
              borderColor: "blue",
              resizeMode: "contain",
              marginHorizontal: 5,
            }}
          />
        )}
      />
    </SafeAreaView>
  );
}
