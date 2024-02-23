import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Screens
import FeedScreen from "./screens/FeedScreen";
import CameraScreen from "./screens/CameraScreen";
import AlbumsScreens from "./screens/AlbumsScreen";
import ProfileScreen from "./screens/ProfileScreen";

const FeedName = "Feed";
const CameraName = "Camera";
const ProfileName = "Profile";
const AlbumsName = "Albumn";

//creates the bottom navigation bar on each of the screens
const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name={FeedName} component={FeedScreen} />
        <Tab.Screen name={CameraName} component={CameraScreen} />
        <Tab.Screen name={AlbumsName} component={OutfitsScreen} />
        <Tab.Screen name={ProfileName} component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;
