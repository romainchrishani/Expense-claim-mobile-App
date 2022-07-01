import React , {useState,useEffect} from 'react'; //usestate for hooks
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import RAndR from './R&R';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddNew_RAndR2({route}){

  const data = route.params;

  useEffect(() => {
   
    if(data !=null){
      console.log(data.itemdetails.extensionNo)
      setExtensionNo(data.itemdetails.extensionNo)
      setCustomer(data.itemdetails.customer)
      setLocation(data.itemdetails.location)
      setSta_tus(data.itemdetails.sta_tus)
      setId(data.itemdetails.id)
    }
  }, [data]);


  const [extensionNo,setExtensionNo] = useState("");
  const [customer ,setCustomer]=useState("");
  const [ location,setLocation]=useState("");
  const [ id,setId]=useState("");
  const [ sta_tus,setSta_tus]=useState("");


  const navigation=useNavigation();

  async function updateRAndR() {
    var axios = require('axios');

alert('R And R claimed successfully')
navigation.navigate('Reward And Recognition' )

var config = {
  method: 'put',
  url: `http://10.0.2.2:8080/rr/update/${id}`,
  headers: { 
    'Content-Type': 'application/json'
  },
  data : JSON.stringify({
    id,
    extensionNo,
    customer,
    location,
    sta_tus,
    employee:userId,
  })
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
  alert("Updated successfully!")
  navigation.navigate(RAndR)
})
.catch(function (error) {
  console.log(error);
});
}

useEffect(() => {
  getData();
   }, []);

const getData = () => {
  try{
    AsyncStorage.getItem("userId")
      .then(value => {
        if(value != null) {
          setUserId(value);
        }
      })
  }
  catch(error) {
    console.log(error);       
  };
}
const [userId, setUserId] = useState('');

    return(
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} 
      accessible={false}>
      <View style={styles.body}>
        <View style={styles.header}>
        <Text style={styles.text}>
        Edit R&R
        </Text>
        </View>
        <View style={styles.container}>

        <TextInput  onChangeText={newText => setExtensionNo(newText)} style={styles.input}
        placeholder='Extension no'
        keyboardType='numeric'
        value={extensionNo}
        />  
        <TextInput  onChangeText={newText => setCustomer(newText)} style={styles.input}
        placeholder='Customer'
        value={customer}
        />
        <TextInput  onChangeText={newText => setLocation(newText)} style={styles.input}
        placeholder='Location'
        value={location}
        />
        <TouchableOpacity style={styles.background}
          onPress={updateRAndR} >
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
      backgroundColor:'#C1A57B',
    },
    background:{
      backgroundColor: '#C1A57B',
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
      backgroundColor:'#C1A57B',
    },
    header:{
      flex:1,
      backgroundColor:'#C1A57B',
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
  