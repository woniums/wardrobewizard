import React from 'react';
import { View, Text, Button, SafeAreaView, StyleSheet, TextInput , FlatList, Image} from "react-native";
import red from "../../assets/red.png";
import blue from "../../assets/blue.png";
import shirt1 from "../../assets/shirt1.png";
import jeans1 from "../../assets/jeans1.png";

const data = [
  {src: shirt1},
  {src: jeans1}
];

const pfp = [
  {src: blue}
];

const Profile = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={blue}
        style={styles.pfp}
      />
      <TextInput
        style={styles.username}
        placeholder='Username'
      />
      <TextInput
        style={styles.bio}
        placeholder="Enter Bio Here:"
      />
      <FlatList
        data={data}
        renderItem={({item}) => (
      <Image
        source={item.src}
        style={styles.postImage}
      />
      )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 15,
  },
  postImage: {
    width: 100,
    height: 100,
    marginLeft: 15,
  },
  bio: {
    width: 350,
    marginLeft: 15,
    margin: 10,
    borderWidth: 1,
    height: 50,
    padding: 10,
  },  
  pfp: {
    width: 75,
    height: 75,
    borderRadius: 100,
    marginLeft: 15,
  }
});


export default Profile;