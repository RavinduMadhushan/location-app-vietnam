import React, { Component } from "react";
import { View, FlatList ,Button,StyleSheet,Dimensions} from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import { Card, ListItem, Icon } from "react-native-elements";

var details=[];
class BreakdownScreen extends Component {

  static navigationOptions = {
    title: "Back",
    headerTintColor: ""
   
  };
  state = {
    machineID: "",
    data: [],
    // k:false
  };
  sendData() {
   
      try {
       fetch(
      "http://192.168.8.103:3000/api/location/new/",
      {
      method: "POST",
      headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.data)
      }
      ) .then(res => res.json())
        .then(res => {
          this.props.navigation.navigate("Home")
          
        })
        .catch((error) => {
          alert(error);
        });
       
      } catch (errors) {
     
      alert(errors);
      } 
    
 
  }
  


  addmachines() {
    var obj = [];
    const id = this.props.navigation.getParam("id", "");
    console.log(details);

    details.push({
      machineId:this.state.machineID,
      lineNumber:id,
      updatedDate:Date.now()
    })
    console.log(details.length);
    
    for ( var i=0; i < details.length; i++ )
    obj[details[i]['machineId']] = details[i];

details = new Array();
for ( var key in obj )
    details.push(obj[key]);
    this.setState({
      data:details
    })
    console.log(details);

  }

  componentDidMount() {
    this.setState({data:[]});
    details=[];
  }
  onSuccess = async e => {
    const id = this.props.navigation.getParam("id", "");
    if (e.data) {
      this.setState({machineID:e.data});
      
    } else {
      alert("No Machine for this QR");
    }
  };
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };

  render() {
    return (
      

     
<View>


     
      <View style={styles.container}> 
        <QRCodeScanner
          onRead={this.onSuccess}
          reactivate={true}
          showMarker={true}
          checkAndroid6Permissions={true}
          ref={elem => {
            this.scanner = elem;
          }}
          cameraStyle={{ height: 400}}
        
        />

</View> 
        
       
<FlatList
        data={this.state.data}
        renderItem={({ item }) => (
          <ListItem
            
            title={item.machineId}
            
          />
        )}
        keyExtractor={item => item.machine}
        ItemSeparatorComponent={this.renderSeparator}
      
      />



<Button
    icon={<Icon name='code' color='#ffffff' />}
    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 10}}
    title='Add'
    onPress={this.addmachines.bind(this)} />
    <Button
    icon={<Icon name='code' color='#ffffff' />}
    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
    title='Confirm'
    onPress={this.sendData.bind(this)} />




       
</View> 
         
        


  


     
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5FCFF",
    justifyContent:"flex-start",
    flex:1
  }
});


export default BreakdownScreen;
