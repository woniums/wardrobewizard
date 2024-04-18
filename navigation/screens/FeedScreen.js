import * as React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import shirt1 from "../../assets/shirt1.png";
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
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity onPress={goToProfile}>
        <Text>{post.username}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={showTags} style={{ marginVertical: 10 }}>
        <View style={{ position: "relative", overflow: "hidden" }}>
          <Image source={post.image} style={{ width: windowSize, height: windowSize }} />
          {showTag && (
            <View>
              <Text style={{ color: "#a7699e" }}>{post.tags[0]}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
      <Text style={{ color: "#a7699e" }}>
        {post.username}:{post.caption}
      </Text>
      <Text style={{ color: "#a7699e" }}>Purchased From: {post.purchasedFrom}</Text>
    </View>
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
    username: "Hi",
    image: shirt1,
    tag: "Shirt",
    caption: "Awesome caption",
    purchasedFrom: "xyz",
  },
];
const FeedScreen = ({ navigation }) => {
  return (
    <ScrollView
      style={{ backgroundColor: "#90d7f8" }}
      contentContainerStyle={{ paddingVertical: 20 }}
    >
      <GroupPostings posts={postInfo}></GroupPostings>
    </ScrollView>
  );
};

export default FeedScreen;
