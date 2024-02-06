import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Screens
import FeedScreen from "./screens/FeedScreen";
import CameraScreen from "./screens/CameraScreen";
import OutfitsScreen from "./screens/OutfitsScreen";
import ProfileScreen from "./screens/ProfileScreen";

//Screen names
const FeedName = "Feed";
const CameraName = "Camera";
const ProfileName = "Profile";
const OutfitsName = "Outfit";

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={FeedName}
        screenOptions={({ route }) => ({
          tabBar: () => {
            let rn = route.name;
            let tn = "";
            if (rn === FeedName) {
              tn = "Feed";
            } else if (rn === CameraName) {
              tn = "Camera";
            } else if (rn === OutfitsName) {
              tn = "Outfit";
            } else if (rn === ProfileName) {
              tn = "Profile";
            }

            // You can return any component that you like here!
            return <Text style={{ fontSize: 20, color: "blue" }}>{tn}</Text>;
          },
        })}
      >
        <Tab.Screen name={FeedName} component={FeedScreen} />
        <Tab.Screen name={CameraName} component={CameraScreen} />
        <Tab.Screen name={OutfitsName} component={OutfitsScreen} />
        <Tab.Screen name={ProfileName} component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;
