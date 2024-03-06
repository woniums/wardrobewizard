import * as React from "react";
import { useState } from "react";
import {
  View,
  FlatList,
  Dimensions,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import shirt1 from "../../assets/shirt1.png";
import jeans1 from "../../assets/jeans1.png";
import shoes1 from "../../assets/shoes1.png";

export default function AlbumsScreen({ navigation }) {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const windowSize = Dimensions.get("window").width;

  const data = [
    {
      name: "Shirts",
      images: [
        { src: shirt1 },
        { src: shirt1 },
        { src: shirt1 },
        { src: shirt1 },
        { src: shirt1 },
        { src: shirt1 },
        { src: shirt1 },
      ],
    },
    {
      name: "Jeans",
      images: [
        { src: jeans1 },
        { src: jeans1 },
        { src: jeans1 },
        { src: jeans1 },
        { src: jeans1 },
        { src: jeans1 },
        { src: jeans1 },
      ],
    },
    {
      name: "Shoes",
      images: [
        { src: shoes1 },
        { src: shoes1 },
        { src: shoes1 },
        { src: shoes1 },
        { src: shoes1 },
        { src: shoes1 },
        { src: shoes1 },
      ],
    },
  ];

  const setAlbum = (albumName) => {
    setSelectedAlbum(albumName);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setAlbum(item.name)}>
            <Image
              //setting first image to be albumn cover
              //could give user option later so im just marking it
              source={item.images[0].src}
              style={{
                width: windowSize / 3,
                height: windowSize / 3,
                borderWidth: 1,
                borderColor: "blue",
                resizeMode: "contain",
                marginHorizontal: 2,
              }}
            />
          </TouchableOpacity>
        )}
      />
      {selectedAlbum && (
        <FlatList
          ListHeaderComponent={
            <Text style={{ fontSize: 30, textAlign: "center", color: "black" }}>
              {selectedAlbum}
            </Text>
          }
          data={data.find((item) => item.name === selectedAlbum).images.slice(1)}
          horizontal={false}
          numColumns={3}
          renderItem={({ item }) => (
            <Image
              source={item.src}
              style={{
                marginVertical: 3,
                width: windowSize / 3,
                height: windowSize / 3,
                borderWidth: 1,
                borderColor: "blue",
                resizeMode: "contain",
                marginHorizontal: 1,
              }}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}
