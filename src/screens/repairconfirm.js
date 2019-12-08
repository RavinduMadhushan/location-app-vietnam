import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Card, ListItem, Icon } from "react-native-elements";

class RepairScreen extends Component {
  state = {
    qrCodeData: "",
    id:"",
    data: {
      _id:"",
 
      machineInventory: "",
      purchaseCountry: "",
      companyName: "",
      serialNumber: "",
      location: "",
      machineType: ""
    }
  };

  constructor(props) {
    super(props);

    this.state = { qrCodeData: " ", data: [],id:"" };
  }
  sendData() {
    const id = this.props.navigation.getParam("id", "");
    const qrCodeData = this.props.navigation.getParam("data", "No data read");
    alert(qrCodeData);
    this.props.navigation.navigate("Superviser", {
        id:id,
        machine:qrCodeData
      });

    
 
  }

  componentDidMount() {
    //The code bellow will receive the props passed by QRCodeScannerScreen
    const id = this.props.navigation.getParam("id", "");
    const qrCodeData = this.props.navigation.getParam("data", "No data read");
   
   
    // const scanner = this.props.navigation.getParam("scanner", () => false);

    this.setState({ qrCodeData: qrCodeData });
    this.setState({ id:id });

    const ID = qrCodeData;
    // alert(ID);
    fetch(`http://192.168.8.100:3000/api/machine/getbyID?id=${ID}`, {
      method: "POST"
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: JSON.parse(JSON.stringify(res))
        });

        // alert(this.state.data);
      })
      .catch(err => {
        alert(err);
      });

    // alert(this.state.data[0].companyName);
  }

  render() {
    return (
      <View style={styles.container}>
      <Card
  title={this.state.data.machineInventory}
  titleStyle={{textAlign:"center"}}
  >
  
  <Text style={styles.text}>Serial No : {this.state.data.serialNumber}</Text>
    <Text style={styles.text}>Machine Type : {this.state.data.machineType.machineType}</Text>
    <Text style={styles.text}>Purchase Country : {this.state.data.supplier.supplierCountry}</Text>
    <Text style={styles.text}>Company Name : {this.state.data.supplierName}</Text>
    <Text style={styles.text}>Location : {this.state.data.location}</Text>


  
  <Button
    icon={<Icon name='code' color='#ffffff' />}
    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
    title='Confirm'
    onPress={this.sendData.bind(this)} />
</Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    width:"95%"
  },
  text: {
    fontSize: 15,
    textAlign: "left",
    fontWeight: 'bold',
  }
});

export default RepairScreen;
