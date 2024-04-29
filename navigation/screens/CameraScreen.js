import React, { useState, useRef } from "react";
import {
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
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/Ionicons";

const HandleTagImage = ({ onTag, uri }) => {
  const [selectedValue, setSelectedValue] = useState("");
  const windowWidth = useWindowDimensions().width;

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
        style={{ backgroundColor: "#a7699e" }}
        setSelected={(val) => setSelectedValue(val)}
        data={[
          { key: "1", value: "T-Shirt" },
          { key: "2", value: "Shirt" },
          { key: "3", value: "Blouse" },
          { key: "4", value: "Dress Shirt" },
          { key: "6", value: "Tank Top" },
          { key: "7", value: "Halter Top" },
          { key: "8", value: "Tube Top" },
          { key: "10", value: "Jersey" },
          { key: "11", value: "Pant" },
          { key: "12", value: "Dress Pant" },
          { key: "13", value: "Sweatpant" },
          { key: "14", value: "Short" },
          { key: "15", value: "Jeans" },
          { key: "16", value: "Leggings" },
          { key: "14", value: "Skirt" },
          { key: "15", value: "Jacket" },
          { key: "16", value: "Cardigan" },
          { key: "17", value: "Coat" },
          { key: "18", value: "Flannel" },
          { key: "19", value: "Sweatshirt" },
          { key: "20", value: "Cardigan" },
          { key: "21", value: "Crew Neck" },
          { key: "22", value: "Turtle Neck" },
          { key: "23", value: "Sneakers" },
          { key: "24", value: "Dress Shoes" },
          { key: "25", value: "Heels" },
          { key: "26", value: "Flats" },
          { key: "27", value: "Boots" },
          { key: "28", value: "Flip Flops" },
          { key: "29", value: "Beanie" },
          { key: "30", value: "Cap" },
          { key: "31", value: "Sun Hat" },
          { key: "32", value: "Hat" },
          { key: "33", value: "Athletic Wear" },
          { key: "34", value: "SwimWear" },
          { key: "35", value: "Scarf" },
          { key: "36", value: "Jewelery" },
          { key: "37", value: "Business Casual" },
        ]}
        boxStyles={{ marginHorizontal: 150, backgroundColor: "white" }}
        dropdownStyles={{ maxHeight: 80 }}
        dropdownItemStyles={{ backgroundColor: "white", marginHorizontal: 0 }}
        dropdownTextStyles={{ textAlign: "center", fontWeight: "bold", color: "#90d7f8" }}
        save="value"
      />
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity onPress={handleTag}>
          <Icon name="tag" size={50} color="#a7699e" />
          <Text style={{ textAlign: "center", color: "#d66391" }}>Tag </Text>
        </TouchableOpacity>
      </View>
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
        backgroundColor: "#010001",
      }}
    >
      <View style={{ marginTop: 1 }}>
        {images.length > 0 && ( // if images array is not empty
          <Image
            source={{ uri: images[images.length - 1] }} // Displays last image
            style={{
              marginTop: 1,
              width: Math.min(windowWidth * 0.9, windowHeight * 0.9),
              height: Math.min(windowWidth * 0.9, windowHeight * 0.9),
              aspectRatio: 1,
              borderWidth: 20,
              borderColor: "#90d7f8",
              borderRadius: 10,
              padding: 1,
              alignItems: "center",
            }}
          />
        )}
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {images.length > 0 && <HandleTagImage onTag={handleTag} uri={images[currIndex - 1]} />}

        {sendToDatabase()}
      </View>
      <View
        style={{
          flexDirection: "row",
          position: "absolute",
          bottom: 30,
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <View style={{ alignItems: "center", marginRight: 40 }}>
          <TouchableOpacity onPress={pickImage}>
            <Icon2 name="albums-sharp" size={70} color="#a7699e" />
            <Text style={{ textAlign: "center", color: "#d66391", marginTop: 5 }}>Upload</Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center", marginRight: 40 }}>
          <TouchableOpacity onPress={takeImage}>
            <Icon name="camera" size={70} color="#a7699e" />
            <Text style={{ textAlign: "center", color: "#d66391", marginTop: 5 }}>Take Photo</Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity onPress={goToCreateScreen}>
            <Icon2 name="shirt" size={70} color="#a7699e" />
            <Text style={{ textAlign: "center", color: "#d66391", marginTop: 5 }}>Create</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
