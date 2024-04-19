import React, { useState, useRef } from "react";
import {
  Button,
  Image,
  View,
  useWindowDimensions,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { SelectList } from "react-native-dropdown-select-list";
import { insertImageWithTag } from "../../database";

const HandleTagImage = ({ onTag, uri }) => {
  const [selectedValue, setSelectedValue] = useState("");
  const handleTag = () => {
    if (selectedValue) {
      onTag({ uri, tag: selectedValue });
      setSelectedValue("");
    }
  };
  //https://www.npmjs.com/package/react-native-dropdown-select-list
  return (
    <SafeAreaView>
      <SelectList
        style={{ backgroundColor: "white" }}
        setSelected={(val) => setSelectedValue(val)}
        data={[
          { key: "1", value: "T-Shirt" }, 
          { key: "2", value: "Shirt" }, 
          { key: "3", value: "Blouse" }, 
          { key: "4", value: "Dress Shirt" }, 
          { key: "6", value: "Tank Top"}, 
          { key: "7", value: "Halter Top"},
          { key: "8", value: "Tube Top"}, 
          { key: "10", value: "Jersey"}, 
          { key: "11", value: "Pant"}, 
          { key: "12", value: "Dress Pant"}, 
          { key: "13", value: "Sweatpant"}, 
          { key: "14", value: "Short"}, 
          { key: "15", value: "Jeans"}, 
          { key: "16", value: "Leggings"}, 
          { key: "14", value: "Skirt"}, 
          { key: "15", value: "Jacket"}, 
          { key: "16", value: "Cardigan"}, 
          { key: "17", value: "Coat" }, 
          { key: "18", value: "Flannel" }, 
          { key: "19", value: "Sweatshirt" }, 
          { key: "20", value: "Cardigan" }, 
          { key: "21", value: "Crew Neck"}, 
          { key: "22", value: "Turtle Neck"}, 
          { key: "23", value: "Sneakers"}, 
          { key: "24", value: "Dress Shoes"}, 
          { key: "25", value: "Heels"}, 
          { key: "26", value: "Flats"}, 
          { key: "27", value: "Boots"}, 
          { key: "28", value: "Flip Flops"}, 
          { key: "29", value: "Beanie"}, 
          { key: "30", value: "Cap"}, 
          { key: "31", value: "Sun Hat"}, 
          { key: "32", value: "Hat"}, 
          { key: "33", value: "Athletic Wear"}, 
          { key: "34", value: "SwimWear"}, 
          { key: "35", value: "Scarf"}, 
          { key: "36", value: "Jewelery"}, 
          { key: "37", value: "Business Casual"}
        ]}
        boxStyles={{ backgroundColor: "white" }}
        dropdownItemStyles={{ backgroundColor: "white" }}
        save="value"
      />
      <TouchableOpacity onPress={handleTag}>
        <Text>Tag Image</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default function CameraScreen({ navigation }) {
  //https://docs.expo.dev/versions/latest/sdk/imagepicker/
  const navigator = useNavigation();
  const [images, setImage] = useState([]);

  const [currIndex, setCurrIndex] = useState(0);
  const [tags, setTags] = useState({});
  const [selectedTag, setSelectedTag] = useState("");

  const windowHeight = useWindowDimensions().height;
  const windowWidth = useWindowDimensions().width;
  const photoTaken = useRef(false);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage([...images, result.assets[0].uri]);
      setCurrIndex(currIndex + 1);
      photoTaken.current = true;
    }
  };

  const takeImage = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      aspect: [1, 1],
      cameraType: ImagePicker.CameraType.back,
      UIImagePickerControllerQualityType: ImagePicker.UIImagePickerControllerQualityType.High,
    });

    if (!result.canceled) {
      setImage([...images, result.assets[0].uri]);
      setCurrIndex(currIndex + 1);
      photoTaken.current = true;
    }
  };

  const handleTag = ({ uri, tag }) => {
    setTags((prevTags) => ({
      ...prevTags,
      [uri]: tag,
    }));
  };

  const sendToDatabase = () => {
    if ((photoTaken.current = true)) {
      Object.entries(tags).forEach(([uri, tag]) => {
        insertImageWithTag(uri, tag);
      });
      photoTaken.current = false;
    }
  };

  const goToCreateScreen = () => {
    navigator.navigate("Create", { images });
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#90d7f8",
      }}
    >
      {images.length > 0 && ( // if images array is not empty
        <Image
          source={{ uri: images[images.length - 1] }} // Displays last image
          style={{
            width: Math.min(windowWidth * 0.8, windowHeight * 0.8),
            height: Math.min(windowWidth * 0.8, windowHeight * 0.8),
            aspectRatio: 1,
            borderWidth: 1,
            borderColor: "#a7699e",
            borderRadius: 10,
            padding: 15,
            alignItems: "center",
          }}
        />
      )}
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {images.length > 0 && <HandleTagImage onTag={handleTag} uri={images[currIndex - 1]} />}
        {console.log(tags)}
        {sendToDatabase()}
      </View>
      <View style={{ flexDirection: "row", position: "absolute", bottom: 20 }}>
        <Button title="Upload Image" onPress={pickImage} color="#a7699e" />
        <Button title="Take Photo" onPress={takeImage} color="#a7699e" />
        <Button title="Create" onPress={goToCreateScreen} color="#a7699e" />
      </View>
    </View>
  );
}
