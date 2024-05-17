import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
} from "react-native";
import { getImagesIntoCategory } from "../../FirebaseFunctions/firebaseDatabaseFunctions";

const ImageList = ({ images, selectedImage, onPressImage }) => (
  <View style={{ alignItems: "center", marginBottom: 12, marginTop: 12 }}>
    {selectedImage ? (
      <TouchableOpacity onPress={() => onPressImage(null)}>
        <View
          style={{
            justifyContent: "center",
            alignContent: "center",
            borderRadius: 15,
            borderWidth: 8,
            borderColor: "#BB8BB2 ",
          }}
        >
          <Image source={{ uri: selectedImage.url }} style={{ width: 125, height: 125 }} />
        </View>
      </TouchableOpacity>
    ) : (
      <ScrollView horizontal>
        {images.map((image, idx) => (
          <TouchableOpacity key={idx} onPress={() => onPressImage(image)}>
            <Image source={{ uri: image.url }} style={{ width: 125, height: 125 }} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    )}
  </View>
);

const Create = () => {
  const [selectedImages, setSelectedImages] = useState({});
  const [dataSet, setDataSet] = useState([]);

  useEffect(() => {
    getImagesIntoCategory()
      .then((data) => {
        setDataSet(data);
      })
      .catch((error) => {
        console.error("Error fetching user images:", error);
      });
  }, []);
  const handleImageSelect = (category, selectedImage) => {
    if (selectedImages[category] === selectedImage) {
      setSelectedImages((prevState) => ({
        ...prevState,
        [category]: null,
      }));
    } else {
      setSelectedImages((prevState) => ({
        ...prevState,
        [category]: selectedImage,
      }));
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#010000" }}>
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          {dataSet.map((category, index) => (
            <View key={index}>
              <ImageList
                images={category.images}
                selectedImage={selectedImages[category.category]}
                onPressImage={(image) => handleImageSelect(category.category, image)}
              />
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Create;
