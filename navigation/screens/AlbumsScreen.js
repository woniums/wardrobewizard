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
  ScrollView,
} from "react-native";
import {
  getUserTagsAndImages,
  getAllOutfits,
} from "../../FirebaseFunctions/firebaseDatabaseFunctions";
import { useFocusEffect } from "@react-navigation/native";
import Icon1 from "react-native-vector-icons/FontAwesome5";

export default function AlbumsScreen({ navigation }) {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [selectedOutfit, setSelectedOutfit] = useState(null);
  const windowSize = Dimensions.get("window").width;
  const [dataSet, setDataSet] = useState([{ tag: "", images: [{ uri: "", uri: "" }] }]);
  const [outfitSet, setOutfitSet] = useState({ "": [""] });
  const [pageType, setPageType] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      // Gets user images with tags from the database
      getUserTagsAndImages()
        .then((data) => {
          // Stores return data in state
          setDataSet(data);
        })
        .catch((error) => {
          console.error("Error fetching user tags and images:", error);
        });
    }, [])
  );
  useFocusEffect(
    React.useCallback(() => {
      // Gets user outfits from the database
      getAllOutfits()
        .then((data) => {
          setOutfitSet(data);
        })
        .catch((error) => {
          console.error("Error fetching user tags and images:", error);
        });
    }, [])
  );

  const setAlbum = (albumName) => {
    setSelectedAlbum(albumName);
  };
  const share = (item) => {
    console.log("Sharing image", item);
  };
  const switchPage = () => {
    setPageType(!pageType);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <TouchableOpacity onPress={switchPage}>
        <Icon1 name="sync-alt" size={40} color="#a7699e" />
      </TouchableOpacity>
      {pageType ? (
        <>
          {Object.keys(dataSet).length !== 0 && (
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
          )}
          {selectedAlbum && (
            <FlatList
              ListHeaderComponent={
                <Text style={{ fontSize: 30, textAlign: "center", color: "#90d7f8" }}>
                  {selectedAlbum}
                </Text>
              }
              data={dataSet.find((item) => item.tag === selectedAlbum).images}
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
        </>
      ) : (
        <>
          {Object.keys(outfitSet).length !== 0 && (
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={Object.keys(outfitSet)}
              style={{ marginTop: 15 }}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => setSelectedOutfit(item)}>
                  <Text style={{ color: "white", marginHorizontal: 10, fontSize: 30 }}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          )}
          {selectedOutfit && (
            <>
              <Text
                style={{
                  fontSize: 30,
                  textAlign: "center",
                  color: "#90d7f8",
                  marginVertical: 10,
                }}
              >
                {selectedOutfit}
              </Text>
              <FlatList
                data={outfitSet[selectedOutfit]}
                horizontal={false}
                numColumns={2}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => share(item)}>
                    <Image
                      source={{ uri: item }}
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
            </>
          )}
        </>
      )}
    </SafeAreaView>
  );
}
