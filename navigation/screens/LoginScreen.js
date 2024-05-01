import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, Alert } from "react-native";
import { attemptLogin, attemptSignup, resetPassword } from "../../FirebaseFunctions/firebaseLogin";

export default function LoginScreen({ navigation, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUpMode, setIsSignUpMode] = useState(true); // Default state is signup mode

  const handleAuthentication = async () => {
    if (isSignUpMode) {
      // If in signup mode, call attemptSignup
      await attemptSignup(
        email,
        password,
        (message) => {
          console.log(message);
          onLogin(); // Call onLogin if signup is successful
        },
        (errorMessage) => console.error("Signup error:", errorMessage)
      );
    } else {
      // If in login mode, call attemptLogin
      await attemptLogin(email, password, onLogin, passwordReset);
    }
  };
  const passwordReset = (message) => {
    Alert.alert("Incorrect Password?", message, [
      { text: "Cancel" },
      {
        text: "Reset",
        onPress: () => {
          resetPassword(email);
        },
      },
    ]);
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
          marginBottom: 10,
        }}
        placeholder="Email"
        onChangeText={(value) => setEmail(value)}
      />
      <TextInput
        style={{
          height: 50,
          width: "80%",
          backgroundColor: "white",
          borderRadius: 10,
          fontSize: 15,
          marginBottom: 10,
        }}
        placeholder="Password"
        onChangeText={(value) => setPassword(value)}
        secureTextEntry
      />
      <TouchableOpacity
        style={{
          backgroundColor: isSignUpMode ? "#6db29a" : "#a7699e", // Change color based on mode
          width: "80%",
          height: 50,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 10,
        }}
        onPress={handleAuthentication}
      >
        <Text style={{ color: "white", fontSize: 15, fontWeight: "bold" }}>
          {isSignUpMode ? "Sign Up" : "Login"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: "#a7699e",
          width: "80%",
          height: 50,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => setIsSignUpMode(!isSignUpMode)} // Toggle between signup and login mode
      >
        <Text style={{ color: "white", fontSize: 15, fontWeight: "bold" }}>
          {isSignUpMode ? "Already have an account? Login" : "Don't have an account? Sign Up"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
