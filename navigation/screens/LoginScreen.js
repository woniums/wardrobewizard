import React, { useState, useEffect } from "react";
import { View, Image, Text, TextInput, TouchableOpacity, Alert, Button } from "react-native";
import { setAccountInfo, getLoginData } from "../../database";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen({ navigation, onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //Supposed to check if your login already exist but isnt really working
  useEffect(() => {
    const checkLogin = async () => {
      const loggedIn = await getLoginData(username, password);
      setIsLoggedIn(loggedIn);
    };
    checkLogin();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      onLogin();
    }
  }, [isLoggedIn, navigation]);

  const attemptLogin = () => {
    if (getLoginData(username, password)) {
      setIsLoggedIn(true);
    } else {
      if (username.length === 0 || password.length === 0) {
        console.log("Username or password is empty");
        return;
      }
      if (setAccountInfo(username, password)) {
        setIsLoggedIn(true);
      } else {
        console.log("Something went wrong with account creation");
      }
    }
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#90d7f8",
      }}
    >
      <TextInput
        style={{
          height: 50,
          width: "80%",
          backgroundColor: "white",
          borderRadius: 10,
          fontSize: 15,
        }}
        placeholder="Username"
        onChangeText={(value) => setUsername(value)}
      />
      <TextInput
        style={{
          height: 50,
          width: "80%",
          backgroundColor: "white",
          borderRadius: 10,
          fontSize: 15,
        }}
        placeholder="Password"
        onChangeText={(value) => setPassword(value)}
      />
      <TouchableOpacity
        styel={{
          backgroundColor: "#a7699e",
          width: "80%",
          height: 50,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={attemptLogin}
      >
        <Text style={{ color: "white", fontSize: 15, fontWeight: "bold" }}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}
