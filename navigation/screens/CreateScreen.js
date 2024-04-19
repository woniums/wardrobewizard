
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Image,
  useWindowDimensions,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { SelectList } from "react-native-dropdown-select-list";

const TextInputButton = ({ onTag, uri, getNextImage }) => {
  const [selectedValue, setSelectedValue] = useState("");
  const handleTag = () => {
    if (selectedValue) {
      onTag({ uri, tag: selectedValue });
      setSelectedValue("");
      getNextImage();
    }
  };
  //https://www.npmjs.com/package/react-native-dropdown-select-list
  return (
    <SafeAreaView >
      <SelectList style = {{backgroundColor: "white"}}
        setSelected={(val) => setSelectedValue(val)}
        data={[
          { key: "1", value: "Top" },
          { key: "2", value: "Bottom" },
          { key: "3", value: "Shoes" },
          { key: "4", value: "Accessory" },
        ]}
        boxStyles = {{backgroundColor: "white"}}
        dropdownItemStyles = {{backgroundColor: "white"}}
        save="value"
      />
      <TouchableOpacity onPress={handleTag} style={styles.button}>
        <Text>Tag Image</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const Tag = () => {
  const [currIndex, setCurrIndex] = useState(0);
  const [tags, setTags] = useState({});
  const route = useRoute();
  const images = route.params?.images || [];
  const windowHeight = useWindowDimensions().height;
  const windowWidth = useWindowDimensions().width;

  const handleTag = ({ uri, tag }) => {
    setTags((prevTags) => ({
      ...prevTags,
      [uri]: tag,
    }));
  };

  const getNextImage = () => {
    if (currIndex < images.length - 1) {
      setCurrIndex(currIndex + 1);
    }
  };
  const getPrevImage = () => {
    if (currIndex > 0) {
      setCurrIndex(currIndex - 1);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 , backgroundColor: '#90d7f8' }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {images.length === 0 ? (
            <Text>No Images to display</Text>
          ) : (
            <>
              <TouchableOpacity onPress={getPrevImage} style={{ paddingHorizontal: 5}}>
                <Icon name="arrow-left" size={30} color="#a7699e" />
              </TouchableOpacity>
              <Image
                source={{ uri: images[currIndex] }}
                style={{
                  width: Math.min(windowWidth * 0.8, windowHeight * 0.8),
                  height: Math.min(windowWidth * 0.8, windowHeight * 0.8),
                  aspectRatio: 1,
                }}
              />
              <TouchableOpacity onPress={getNextImage} style={{ paddingHorizontal: 5}}>
                <Icon name="arrow-right" size={30} color="#a7699e" />
              </TouchableOpacity>
            </>
          )}
        </View>
        <TextInputButton onTag={handleTag} uri={images[currIndex]} getNextImage={getNextImage} />
        {console.log(tags)}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    backgroundColor: "#a7699e",
    alignItems: "center",
    padding: 10,
  },
});

export default Tag;
*/