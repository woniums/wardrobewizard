import React from 'react';
import { View, Text, Button, SafeAreaView, StyleSheet, TextInput , FlatList, Image, Dimensions} from "react-native";
import red from "../../assets/red.png";
import blue from "../../assets/blue.png";
import shirt1 from "../../assets/shirt1.png";
import jeans1 from "../../assets/jeans1.png";


const data = [
  { id: '1', src: require("../../assets/shirt1.png") },
  { id: '2', src: require("../../assets/shirt1.png") },
  { id: '3', src: require("../../assets/shirt1.png") },
  { id: '4', src: require("../../assets/jeans1.png") },
  { id: '5', src: require("../../assets/jeans1.png") },
  { id: '6', src: require("../../assets/jeans1.png") },
  { id: '7', src: require("../../assets/shoes1.png") },
  { id: '8', src: require("../../assets/shoes1.png") },
  { id: '9', src: require("../../assets/shoes1.png") },
];
const { width } = Dimensions.get('window');
const numColumns = 3;
const itemWidth = width / numColumns;


const Profile = () => {
  const renderItem = ({ item }) => (
    <Image source={item.src} style={styles.postImage} />
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topHalf}>
      <Image
        source={require("../../assets/blue.png")}
        style={styles.pfp}
      />
      </View>
      <TextInput
        style={styles.username}
        placeholder='Username'
      />
      <TextInput
        multiline
        maxLength={66}
        style={styles.bio}
        placeholder="Enter Bio Here:"
      />
      
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={numColumns}

      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#010010',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topHalf: {
    alignItems: "screenLeft",
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#caa5c5',
    padding: 5,
    borderRadius: 10,
  },
  postImage: {
    width: 120,
    height: 120,
    borderRadius:10,
    margin: 2,
    backgroundColor: '#caa5c5',
    
  },
  bio: {
    width: 350,
    margin: 10,
    fontSize: 16,
    borderWidth: 1,
    height: 70,
    padding: 10,
    backgroundColor: '#caa5c5',
    borderRadius: 10,

  }, 
  pfp: {
    width: 75,
    height: 75,
    borderRadius: 100,
    margin: 10,

  }
});


export default Profile;