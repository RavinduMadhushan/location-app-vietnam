import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Card, ListItem, Icon } from "react-native-elements";

class SupervisorDetails extends Component {
  state = {
    qrCodeData: "",
    id:"",
    data: {
      _id:"",
      name:"",
      lineSupervisor:""


    }
  };

  constructor(props) {
    super(props);

    this.state = { qrCodeData: " ", data: [],id:"" };
  }
  sendData() {
    const id = this.props.navigation.getParam("id", "");
    // alert(id);
    const machineInventory = this.props.navigation.getParam("machine", "");
    alert(machineInventory);
    const qrCodeData = this.props.navigation.getParam("data", "No data read");
    var date = new Date();

    date.setHours(0, 0, 0, 0);


 

    var data = {
        breakdownFinishDate: date.getTime(),
        breakdownFinishTime: Date.now(),
      machineInventoryID: machineInventory,
      mechnicId:id,
      superviser:qrCodeData
      };
      try {
       fetch(
      "http://192.168.8.100:3000/api/breakdown/update/",
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
          const data = res;

          this.props.navigation.navigate("Home")
        })
        .catch((error) => {
          alert(error);
        });
       
      } catch (errors) {
     
      alert(errors);
      } 
    
 
  }

  componentDidMount() {
    //The code bellow will receive the props passed by QRCodeScannerScreen
    const id = this.props.navigation.getParam("id", "");
    const qrCodeData = this.props.navigation.getParam("data", "No data read");
    const machineInventory = this.props.navigation.getParam("machineInventory", "");
    alert(machineInventory);
   
    // const scanner = this.props.navigation.getParam("scanner", () => false);

    this.setState({ qrCodeData: qrCodeData });
    this.setState({ id:id });

    const ID = qrCodeData;
    
    fetch(`http://192.168.8.100:3000/api/superviser/getbyID?id=${ID}`, {
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
  
    <Text style={styles.text}>Name : {this.state.data.name}</Text>
    <Text style={styles.text}>Company ID : {this.state.data.lineSupervisor}</Text>
  

  
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

export default SupervisorDetails;
