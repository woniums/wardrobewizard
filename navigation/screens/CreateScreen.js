import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import Icon2 from "react-native-vector-icons/Ionicons";
import {
  getAllOutfits,
  getImagesIntoCategory,
  getOutfit,
  saveOutfit,
} from "../../FirebaseFunctions/firebaseDatabaseFunctions";
import { useFocusEffect } from "@react-navigation/native";

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

  useFocusEffect(
    React.useCallback(() => {
      // Fetch user tags from the database
      getImagesIntoCategory()
        .then((data) => {
          // Store transformed data in state
          setDataSet(data);
        })
        .catch((error) => {
          console.error("Error fetching user images:", error);
        });
    }, [])
  );

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

  const createOutfit = async () => {
    try {
      //Credit ChatGPT
      //Tests to see if the user has any unselected categories and then alert them
      const hasNullUrls = Object.values(selectedImages).some((image) => !image || !image.url);
      if (hasNullUrls) {
        Alert.alert("Cannot Create Outfit!", "Please select a photo for each category.");
        return;
      }

      //Prompt the user for a name for the outfit (makes storing easier rn)
      const userInputPromise = new Promise((resolve, reject) => {
        Alert.prompt("Enter Outfit Name", "Please enter an outfit name:", [
          {
            text: "Cancel",
            onPress: () => reject("User cancelled"),
            style: "cancel",
          },
          {
            text: "OK",
            onPress: (inputText) => {
              const outfitName = inputText.trim();
              if (outfitName !== "") {
                resolve(outfitName);
              }
              reject("Invalid");
            },
          },
        ]);
      });

      const outfitName = await userInputPromise;

      await saveOutfit(outfitName, selectedImages);
    } catch (error) {
      console.log(error);
    }
  };

  const getExisting = async () => {
    try {
      //Prompt the user for a name for the outfit (makes storing easier rn)
      const userInputPromise = new Promise((resolve, reject) => {
        Alert.prompt("Enter Outfit Name", "Please enter an outfit name:", [
          {
            text: "Cancel",
            onPress: () => reject("User cancelled"),
            style: "cancel",
          },
          {
            text: "OK",
            onPress: (inputText) => {
              const outfitName = inputText.trim();
              if (outfitName !== "") {
                resolve(outfitName);
              }
              reject("Invalid");
            },
          },
        ]);
      });

      const outfitName = await userInputPromise;

      overrideSelection = await getOutfit(outfitName);
      setSelectedImages(overrideSelection);
    } catch (error) {
      console.log(error);
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
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <View style={{ alignItems: "center", marginRight: 10 }}>
              <TouchableOpacity onPress={getExisting}>
                <Icon2 name="shirt" size={70} color="#a7699e" />
                <Text style={{ textAlign: "center", color: "#d66391", marginTop: 5 }}>
                  Change Existing
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: "center", marginRight: 10 }}>
              <TouchableOpacity onPress={createOutfit}>
                <Icon2 name="shirt" size={70} color="#a7699e" />
                <Text style={{ textAlign: "center", color: "#d66391", marginTop: 5 }}>
                  Create Outfit
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity>
                <Icon2 name="shirt" size={70} color="#a7699e" />
                <Text style={{ textAlign: "center", color: "#d66391", marginTop: 5 }}>
                  Post Outfit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Create;
