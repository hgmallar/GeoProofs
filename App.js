import React, { Component } from "react";
import { StyleSheet, Image, View, TouchableOpacity, Text, LogBox } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";

class App extends Component {
  state = {
    data: [
      { order: 1, label: "Quadrilateral ABCD" },
      { order: 2, label: "E and F are points on BC and AD" },
      { order: 3, label: "AGC and EGF are drawn" },
    ],
  };

  renderItem = ({ item, index, drag, isActive }) => {
    return (
      <TouchableOpacity
        style={{
          height: 100,
          backgroundColor: isActive ? "blue" : "grey",
          alignItems: "center",
          justifyContent: "center",
        }}
        onLongPress={drag}
      >
        <Text
          style={{
            fontWeight: "bold",
            color: "white",
            fontSize: 32,
          }}
        >
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require("./images/proof1.png")}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={{ flex: 1 }}>
          <DraggableFlatList
            data={this.state.data}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => `draggable-item-${index}`}
            scrollPercent={5}
            onDragEnd={({ data }) => this.setState({ data })}
          />
        </View>
      </View>
    );
  }
}

LogBox.ignoreLogs([
  'ReactNativeFiberHostComponent: Calling getNode() on the ref of an Animated component is no longer necessary. You can now directly use the ref instead. This method will be removed in a future release.',
]);

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    maxHeight: 200,
  },
});
