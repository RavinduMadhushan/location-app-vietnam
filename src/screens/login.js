import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  AsyncStorage
} from "react-native";

class LoginScreen extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

    this.state = { mechanicID: " ", data: [], mechanic: "" };
  }

  state = {
    mechanicID: "",
    mechanic: "",
    data: []
  };

  sendData() {
    const mechanicID = this.state.mechanic;

    var data = {
      line:this.state.mechanic
      };
      try {
       fetch(
      "http://192.168.8.103:3000/api/line/getId/",
      {
      method: "POST",
      headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
      }
      ) .then(res => res.json())
        .then(res => {
     
          if (!res.length==0) {
            const data = res;

            var k=data[0]
            // console.log(data.length)
            console.log(data[0]);
  
            // this.setState({
            //   mechanicID: res.mechanicID
            // });
            // alert(data[0].mechanicID);

            this.props.navigation.navigate("Home", {
              id: data[0]
            });
          } else {
            alert("No user for this Id");
          }
        })
        .catch(err => {
          alert(err);
        });
       
      } catch (errors) {
     
      alert(errors);
      } 
    
 
  }
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Image
          style={{ width: 160, height: 90, marginTop: 150 }}
          source={require("../images/final.png")}
        />

        <TextInput
          style={{
            height: 40,
            borderColor: "#BCE0FD",
            borderWidth: 1,
            marginTop: 32,
            width: 288,
            borderRadius: 6
          }}
          onChangeText={mechanic => this.setState({ mechanic })}
          value={this.state.onChangeText}
          placeholder="  User Id"
        />

        <View
          style={{ height: 48, width: 295, marginTop: 28, borderRadius: 6 }}
        >
          <Button title="Log In" onPress={this.sendData.bind(this)} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center"
  }
});

export default LoginScreen;
