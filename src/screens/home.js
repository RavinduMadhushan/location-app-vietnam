import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  StatusBar
} from "react-native";

class HomeScreen extends Component {
  state = {
    id: ""
  };

  constructor(props) {
    super(props);

    this.state = { id: "" };
  }

  static navigationOptions = {
    title: "Machine Management System",
    headerStyle: {
      backgroundColor: "#018786"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

  componentDidMount() {
    const id = this.props.navigation.getParam("id", "");
    this.setState({
      id: id
    });
   
  }
  render() {
    let width = Dimensions.get("window").width - 40;
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#ececec"
        }}
      >
        <StatusBar backgroundColor="#018786" barStyle="light-content" />
        <TouchableOpacity
          style={[
            { margin: 20 },
            {
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "skyblue",
              width: width,
              borderRadius: 10
            }
          ]}
          onPress={() =>
            this.props.navigation.navigate("Breakdown", { id: this.state.id })
          }
          activeOpacity={0.8}
        >
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>Location</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default HomeScreen;
