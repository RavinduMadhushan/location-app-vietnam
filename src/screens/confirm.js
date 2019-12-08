import React, { Component } from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";

class ConfirmScreen extends Component {
  static navigationOptions = {
    title: "Back",
    headerTintColor: ""
  };
  onSuccess = async e => {
    const id = this.props.navigation.getParam("id", "");
    // alert(id);
    if (e.data) {
      await this.props.navigation.navigate("RepairConfirm", {
        data: e.data,
        scanner: this.scanner,
        id:id
      });
    } else {
      alert("No Machine for this QR");
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <QRCodeScanner
          onRead={this.onSuccess}
          showMarker={true}
          checkAndroid6Permissions={true}
          ref={elem => {
            this.scanner = elem;
          }}
          cameraStyle={{ height: Dimensions.get("window").height }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});

export default ConfirmScreen;
