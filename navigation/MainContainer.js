import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Screens
import FeedScreen from "./screens/FeedScreen";
import CameraScreen from "./screens/CameraScreen";
import CreateScreen from "./screens/CreateScreen";
import ProfileScreen from "./screens/ProfileScreen";
import AlbumsScreen from "./screens/AlbumsScreen";
import LoginScreen from "./screens/LoginScreen";

const FeedName = "Feed";
const CameraName = "Camera";
const ProfileName = "Profile";
const CreateName = "Create";
const AlbumsName = "Albumns";
const LoginName = "Login";

//creates the bottom navigation bar on each of the screens
const Tab = createBottomTabNavigator();

function MainContainer() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleUserLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <NavigationContainer>
      {!isLoggedIn ? (
        <LoginScreen onLogin={handleUserLogin} />
      ) : (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen name={FeedName} component={FeedScreen} />
          <Tab.Screen name={CreateName} component={CreateScreen} />
          <Tab.Screen name={CameraName} component={CameraScreen} />
          <Tab.Screen name={AlbumsName} component={AlbumsScreen} />
          <Tab.Screen name={ProfileName} component={ProfileScreen} />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}

export default MainContainer;
