import * as React from "react";
import { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Dimensions,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { getUserTagsAndImages } from "../../FirebaseFunctions/firebaseDatabaseFunctions";
import { useFocusEffect } from "@react-navigation/native";

export default function AlbumsScreen({ navigation }) {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const windowSize = Dimensions.get("window").width;
  const [dataSet, setDataSet] = useState([{ tag: "", images: [{ uri: "", uri: "" }] }]);

  useFocusEffect(
    React.useCallback(() => {
      // Fetch user tags from the database
      getUserTagsAndImages()
        .then((data) => {
          // Store transformed data in state
          setDataSet(data);
        })
        .catch((error) => {
          console.error("Error fetching user tags:", error);
        });
    }, [])
  );

  const setAlbum = (albumName) => {
    setSelectedAlbum(albumName);
  };
  const share = (item) => {
    console.log("Sharing image", item);
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <TouchableOpacity
        onPress={() => console.log("Add new album")}
        style={{ position: "absolute", top: 50, right: 25, zIndex: 1 }}
      >
        <Text style={{ fontSize: 40, color: "white" }}>+</Text>
      </TouchableOpacity>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={dataSet}
        style={{ marginTop: 15 }}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setAlbum(item.tag)}>
            <Image
              //setting first image to be album cover
              //could give user option later so im just marking it
              source={{
                uri: item.images[0].uri,
              }}
              style={{
                width: windowSize / 3,
                height: windowSize / 3,
                borderWidth: 7,
                borderColor: "#a7699e",
                resizeMode: "contain",
                marginHorizontal: 2,
                borderRadius: 15,
              }}
            />
          </TouchableOpacity>
        )}
      />
      {selectedAlbum && (
        <FlatList
          ListHeaderComponent={
            <Text style={{ fontSize: 30, textAlign: "center", color: "#90d7f8" }}>
              {selectedAlbum}
            </Text>
          }
          data={dataSet.find((item) => item.tag === selectedAlbum).images.slice(1)}
          horizontal={false}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => share(item.uri)}>
              <Image
                source={{ uri: item.uri }}
                style={{
                  marginVertical: 3,
                  width: windowSize / 2.5,
                  height: windowSize / 2.5,
                  borderWidth: 7,
                  borderColor: "#90d7f8",
                  resizeMode: "contain",
                  marginHorizontal: 3,
                  borderRadius: 15,
                }}
              />
            </TouchableOpacity>
          )}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      )}
    </SafeAreaView>
  );
}
