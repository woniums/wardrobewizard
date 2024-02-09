import * as React from "react";
import { View, Text } from "react-native";

export default function FeedScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 26, fontWeight: "bold" }}>Feed Screen</Text>
    </View>
  );
}
