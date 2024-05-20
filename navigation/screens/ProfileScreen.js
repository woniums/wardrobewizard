import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getAllOutfits } from "../../FirebaseFunctions/firebaseDatabaseFunctions";
import * as Sharing from "expo-sharing";

const { width } = Dimensions.get("window");
const numColumns = 3;
const itemWidth = width / numColumns;

export default function ProfileScreen({ navigation }) {
  const [outfitSet, setOutfitSet] = useState({});
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      getAllOutfits()
        .then((data) => {
          setOutfitSet(data);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Error fetching user tags and images:", error);
          setLoading(false);
        });
    }, [])
  );
  const shareClothing = async (item) => {
    Alert.alert("Do you want to share this piece of clothing?", "", [
      {
        text: "No",
        onPress: () => console.log("User cancelled"),
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: async () => {
          await Sharing.shareAsync(item, { UTI: "image" });
          console.log("Link shared");
        },
      },
    ]);
  };
  //This creates a Flatlist inside of Flatlist so that the outfits are able to be strung vertically
  const renderOutfit = ({ item }) => {
    return (
      <FlatList
        data={item}
        horizontal={false}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => shareClothing(item)}>
            <Image source={{ uri: item }} style={styles.outfitItem} />
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.outfitContainer}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topHalf}>
        <Image source={require("../../assets/blue.png")} style={styles.pfp} />
      </View>
      <TextInput style={styles.username} placeholder="Username" />
      <TextInput multiline maxLength={66} style={styles.bio} placeholder="Enter Bio Here:" />

      {loading ? (
        <ActivityIndicator size="large" color="#90d7f8" />
      ) : (
        <FlatList
          data={Object.values(outfitSet)}
          numColumns={numColumns}
          renderItem={renderOutfit}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.flatListContent}
        />
      )}
    </SafeAreaView>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#010010",
    justifyContent: "center",
    alignItems: "center",
  },
  topHalf: {
    alignItems: "flex-start",
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "#caa5c5",
    padding: 5,
    borderRadius: 10,
  },
  bio: {
    width: 350,
    margin: 10,
    fontSize: 16,
    borderWidth: 1,
    height: 70,
    padding: 10,
    backgroundColor: "#caa5c5",
    borderRadius: 10,
  },
  pfp: {
    width: 75,
    height: 75,
    borderRadius: 100,
    margin: 10,
  },
  outfitContainer: {
    justifyContent: "space-around",
    alignItems: "center",
  },
  outfitItem: {
    width: 120,
    height: 120,
    borderRadius: 10,
    margin: 2,
    backgroundColor: "#caa5c5",
  },
};
