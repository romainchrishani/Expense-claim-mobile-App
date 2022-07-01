import React , {useState} from 'react'; //usestate for hooks
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

export default function GiveNewRAndR(){

  const [extension_no,setExtension_not] = useState("");
  const [customer ,setCustomer]=useState("");
  const [ location,setLocation]=useState("");
  const [ particulars,setParticulars]=useState("");
  const [ amount,setAmount]=useState("");


  const navigation=useNavigation();

  async function GiveRAndR() {
    var axios = require('axios');
    
    if (!employee_id.trim()) {
     alert('Please Enter Extension no');
      return;
    } 
    if (!randramount.trim()) {
      alert('Please Enter customer name');
      return;
    }

alert('R And R claimed successfully')
navigation.navigate('Give new R And R' )

var config = {
  method: 'post',
  url: 'http://10.0.2.2:8080/api/v3/randr/saveRAndR',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : JSON.stringify({
    employee_id,
    randramount,
  })
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
}
    return(
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} 
      accessible={false}>
      <View style={styles.body}>
        <View style={styles.header}>
        <Text style={styles.text}>
        Give a new R&R
        </Text>
        </View>
        <View style={styles.container}>

        <TextInput  onChangeText={newText => setCustomer(newText)} style={styles.input}
        placeholder='Employee ID'
        value={employee_id}
        />
        <TextInput  onChangeText={newText => setLocation(newText)} style={styles.input}
        placeholder='Amount'
        value={randramount}
        />
        <TouchableOpacity style={styles.background}
          onPress={GiveRAndR} >
        <Text style={styles.textB}>
          Submit
        </Text>
        </TouchableOpacity>
      </View>
      </View>
      </TouchableWithoutFeedback>
    );
  }
  

  const styles = StyleSheet.create({
    input:{
      height: 40,
      width:200,
      margin: 5,
      padding: 10,
      borderRadius:10,
      marginLeft: '25%',
      marginBottom: 10,
      backgroundColor:'#F89880',
    },
    background:{
      backgroundColor: '#F89880',
      marginBottom:20,
      marginTop:40,
      // margin:0,
      marginLeft: '25%',
      width:'50%',
      height: '10%',
      justifyContent:'center',
      alignItems:'center',
      borderRadius:60,
    },
    textB:{
      fontSize:16,
      marginBottom: 10,
      marginTop: 1,
      marginStart:1,
      // textAlign:'left',
      marginLeft:10,
      color:'#000000',
      fontWeight:'bold',
    },
    body:{
      flex:1,
      // justifyContent:'center',
      // alignItems:'center',
      backgroundColor:'#F89880',
    },
    header:{
      flex:1,
      backgroundColor:'#F89880',
    },
    text:{
      fontSize:30,
      fontWeight:'bold',
      margin:30,
      color:'#000000',
    },
    container:{
      flex:3,
      backgroundColor:'#000000',
      // borderTopLeftRadius: 60,
      // borderTopRightRadius: 60,
    },
  })
  