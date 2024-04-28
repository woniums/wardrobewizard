import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native"; // Import View component
import Icon from "react-native-vector-icons/AntDesign";
import Icon2 from "react-native-vector-icons/Ionicons";
import Icon3 from "react-native-vector-icons/Entypo";

// Screens
import FeedScreen from "./screens/FeedScreen";
import CameraScreen from "./screens/CameraScreen";
import CreateScreen from "./screens/CreateScreen";
import ProfileScreen from "./screens/ProfileScreen";
import AlbumsScreen from "./screens/AlbumsScreen";

const FeedName = "Feed";
const CameraName = "Camera";
const ProfileName = "Profiles";
const CreateName = "Create";
const AlbumsName = "Albums";

// Creates the bottom navigation bar on each of the screens
const Tab = createBottomTabNavigator();

function MainContainer() {
 return (
   <NavigationContainer>
     <View style={{ flex: 1}}>
       <Tab.Navigator screenOptions={{ headerShown: false , tabBarStyle: { backgroundColor: '#010001' }}}>
         <Tab.Screen 
           name={FeedName} 
           component={FeedScreen} 
           options={{ 
             tabBarIcon: ({ color, size }) => ( //Icons and Color added by Kaylee 
               <Icon name= "home" size={30} color= "#90d7f8" />
             ),
             tabBarLabelStyle: { color: '#90d7f8' }
           }}  
         />
        
         <Tab.Screen 
           name={CreateName} 
           component={CreateScreen} 
           options={{ 
             tabBarIcon: ({ color, size }) => (
               <Icon2 name="shirt-outline" size={30} color= "#90d7f8" />
             ),
             tabBarLabelStyle: { color: '#90d7f8' }
           }}  
         />

         <Tab.Screen 
           name={CameraName} 
           component={CameraScreen} 
           options={{ 
             tabBarIcon: ({ color, size }) => (
               <Icon3 name="camera" size={30} color="#90d7f8" />
             ),
             tabBarLabelStyle: { color: '#90d7f8' }
           }}  
         />

         <Tab.Screen 
           name={AlbumsName} 
           component={AlbumsScreen} 
           options={{ 
             tabBarIcon: ({ color, size }) => (
               <Icon3 name="images" size={30} color="#90d7f8" />
             ),
             tabBarLabelStyle: { color: '#90d7f8' }
           }}  
         />

         <Tab.Screen 
           name={ProfileName} 
           component={ProfileScreen} 
           options={{ 
             tabBarIcon: ({ color, size }) => (
               <Icon name="meh" size={30} color= "#90d7f8" />
             ),
             tabBarLabelStyle: { color: '#90d7f8' }
           }}  
         />
       </Tab.Navigator>
     </View>
   </NavigationContainer>
   
   
   
 );
}

export default MainContainer;