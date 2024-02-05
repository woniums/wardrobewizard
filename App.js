import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.blackBackground}>
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            style={styles.squareButton}
            onPress={() => console.log("Button 1 pressed")}
          >
            <Text style={styles.buttonText}>1</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.squareButton}
            onPress={() => console.log("Button 2 pressed")}
          >
            <Text style={styles.buttonText}>2</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.squareButton}
            onPress={() => console.log("Button 3 pressed")}
          >
            <Text style={styles.buttonText}>3</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.squareButton}
            onPress={() => console.log("Button 4 pressed")}
          >
            <Text style={styles.buttonText}>4</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.squareButton}
            onPress={() => console.log("Button 5 pressed")}
          >
            <Text style={styles.buttonText}>5</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center",
  },
  blackBackground: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: "2%",
    width: "100%",
  },
  squareButton: {
    width: "20%",
    aspectRatio: 1,
    borderRadius: 10,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontSize: 16,
  },
});
