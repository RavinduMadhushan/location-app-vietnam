import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    AsyncStorage
  } from "react-native";
  import QRCodeScanner from "react-native-qrcode-scanner";

class LocationScreen extends Component {

    static navigationOptions = {
        title: "Back",
        headerTintColor: ""
       
      };
      state = {
        machineID: "",
        data: [],
        // k:false
      };

      onSuccess = async e => {
        // const id = this.props.navigation.getParam("id", "");
        if (e.data) {
          alert(e.data);
          
        } else {
          alert("No Machine for this QR");
        }
      };


      render() {
        const { navigation } = this.props;

        return (
            

  <QRCodeScanner
            onRead={this.onSuccess}
            showMarker={true}
            checkAndroid6Permissions={true}
            ref={elem => {
              this.scanner = elem;
            }}
          
          />
         
              
          
 




           
           )


      }






}

export default LocationScreen;