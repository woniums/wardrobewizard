import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import shirt1 from "../../assets/shirt1.png";
import blue from "../../assets/blue.png";
import Icon from "react-native-vector-icons/Entypo";
import Icon2 from "react-native-vector-icons/SimpleLineIcons";
import Icon3 from "react-native-vector-icons/Feather";
import { FontAwesome } from '@expo/vector-icons';

const windowSize = Dimensions.get("window").width;
const Post = ({ post }) => {
  const [showTag, setShowTag] = React.useState(false);
  const navigator = useNavigation();

  const showTags = () => {
    setShowTag(!showTag);
  };
  const goToProfile = () => {
    navigator.navigate("Profile");
  };
  const goToComments = () => {
    navigator.navigate("Comment");
  };
  const [iconName, setIconName] = useState('heart-o');
  const switchIcon = () => {
    setIconName(prevIconName => (prevIconName === 'heart-o' ? 'heart' : 'heart-o'));
  };
  
  return (
    <SafeAreaView>
      <View
        style={{
          flex: 1,
          paddingEnd: 10,
        }}
      >
        <View style={{ flex: 1, flexDirection: "row", paddingLeft: 15 }}>
          <TouchableOpacity onPress={goToProfile}>
            <Image
              source={blue}
              style={{ width: 55, height: 55, borderRadius: 100, marginRight: 15 }}
            />
          </TouchableOpacity>
          <View>
            <TouchableOpacity onPress={goToProfile}>
              <Text style={{ color: "#BB8BB2", fontSize: 30 }}>{post.username}</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{ color: "#BB8BB2", fontSize: 20 }}>
                Purchased From: {post.purchasedFrom}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity onPress={showTags} style={{ marginVertical: 10, paddingLeft: 10 }}>
            <View style={{ position: "relative", overflow: "hidden" }}>
              <Image
                source={post.image}
                style={{ width: windowSize, height: windowSize, borderRadius: 50 }}
              />
            </View>
          </TouchableOpacity>
          {showTag && (
            <View>
              <Text style={{ color: "#BB8BB2" }}>Tagged as: {post.tag}</Text>
            </View>
          )}
        </View>
        <View style={{ flex: 1, flexDirection: "row", paddingLeft: 15 }}>
          <TouchableOpacity onPress={switchIcon}>
            <FontAwesome name={iconName} size={45} color="#90d7f8" />
          </TouchableOpacity>
          <TouchableOpacity onPress={goToComments}>
            <Icon2 name={"bubble"} size={45} color={"#90d7f8"}></Icon2>
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon3 name={"share"} size={45} color={"#90d7f8"}></Icon3>
          </TouchableOpacity>
        </View>
        <Text style={{ color: "#BB8BB2", fontSize: 20, paddingLeft: 15 }}>
          {post.username}: {post.caption}
        </Text>
      </View>
      <View style={{ paddingBottom: 50 }}></View>
    </SafeAreaView>
  );
};

const GroupPostings = ({ posts }) => {
  return (
    <View style={{ marginBottom: 20 }}>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </View>
  );
};

postInfo = [
  {
    id: 1,
    username: "ucasmk122",
    image: shirt1,
    tag: "Shirt",
    caption:
      "Awesome caption Awesome caption Awesome caption Awesome caption Awesome caption Awesome caption ",
    purchasedFrom: "xyz",
  },
  {
    id: 2,
    username: "Lucasmk122",
    image: shirt1,
    tag: "Shirt",
    caption:
      "Awesome caption Awesome caption Awesome caption Awesome caption Awesome caption Awesome caption ",
    purchasedFrom: "xyz",
  },
];
const FeedScreen = ({ navigation }) => {
  return (
    <ScrollView
      style={{ backgroundColor: "#010000" }}
      contentContainerStyle={{ paddingVertical: 20 }}
    >
      <GroupPostings posts={postInfo}></GroupPostings>
    </ScrollView>
  );
};

export default FeedScreen;
