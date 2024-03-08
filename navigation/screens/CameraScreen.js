import React, { useState } from "react";
import { Button, Image, View, useWindowDimensions } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

export default function CameraScreen({ navigation }) {
  //https://docs.expo.dev/versions/latest/sdk/imagepicker/
  const navigator = useNavigation();
  const [images, setImage] = useState([]);
  const windowHeight = useWindowDimensions().height;
  const windowWidth = useWindowDimensions().width;



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
      UIImagePickerControllerQualityType:
        ImagePicker.UIImagePickerControllerQualityType.High,
    });

    if (!result.canceled) {
      setImage([...images, result.assets[0].uri]);
    }
  };

  const goToCreateScreen = () => {
    navigator.navigate("Create", { images });
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: '#90d7f8' }}>
      {images.length > 0 && ( // if images array is not empty
        <Image
          source={{ uri: images[images.length - 1] }} // Displays last image
          style={{
            width: Math.min(windowWidth * 0.8, windowHeight * 0.8),
            height: Math.min(windowWidth * 0.8, windowHeight * 0.8),
            aspectRatio: 1,
            borderWidth: 1, borderColor: '#a7699e', borderRadius: 10, padding: 15, alignItems: 'center',
          }}
        />
      )}
      <View style={{ flexDirection: "row", position: "absolute", bottom: 20 }}>
        <Button title="Upload Image" onPress={pickImage} color='#a7699e' />
        <Button title="Take Photo" onPress={takeImage} color='#a7699e'/>
        <Button title="Create" onPress={goToCreateScreen} color='#a7699e'/>
      </View>
    </View>
  );
}
