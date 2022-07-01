import React , {useState,useEffect} from 'react'; //usestate for hooks
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

export default function AddNewE_Claim(){

  const [data, setData] = useState('');

  const [buOrDept,setBuOrDept] = useState("");
  const [ project,setProject]=useState("");
  const [ extensionNo,setExtensionNo]=useState("");
  const [ customer,setCustomer]=useState("");
  const [ location,setLocation]=useState("");
  const [ billability,setBillability]=useState("");

  const navigation=useNavigation();

  async function claimExpense() {
    var axios = require('axios');
    if (!buOrDept.trim()) {
      alert('Please Enter Bu/Dep');
      return;
    }
    if (!project.trim()) {
      alert('Please Enter project');
      return;
    }
    if (!extensionNo.trim()) {
      alert('Please Enter extension number');
      return;
    }
    if (!customer.trim()) {
      alert('Please Enter customer name');
      return;
    }
    if (!location.trim()) {
      alert('Please Enter location');
      return;
    }
    if (!billability.trim()) {
      alert('Please Enter Billability');
      return;
    }

      alert('Expense claimed successfully')
      navigation.navigate('Expense Claim' )
      var config = {
        method: 'post',
        url: 'http://10.0.2.2:8080/expense/',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : JSON.stringify({
          buOrDept,
          project,
          extensionNo,
          customer,
          location,
          billability,
          employee:userId,
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
        Add a new claim
        </Text>
        </View>
        <View style={styles.container}>
        <TextInput  onChangeText={newText => setBuOrDept(newText)} style={styles.input}
        placeholder='BU/Dept'
        value={buOrDept}
        />
        <TextInput  onChangeText={newText => setProject(newText)} style={styles.input}
        placeholder='Project'
        value={project}
        />
        <TextInput  onChangeText={newText => setExtensionNo(newText)} style={styles.input}
        placeholder='Extension No'
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
        <TextInput  onChangeText={newText => setBillability(newText)} style={styles.input}
        placeholder='Particulars'
        value={billability}
        />
        <TouchableOpacity style={styles.background}
          onPress={claimExpense}>
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
      backgroundColor:'#BB9981',
    },
    background:{
      backgroundColor: '#BB9981',
      marginBottom:20,
      marginTop:40,
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
      marginLeft:10,
      color:'#000000',
      fontWeight:'bold',
    },
    body:{
      flex:1,
      backgroundColor:'#BB9981',
    },
    header:{
      flex:1,
      backgroundColor:'#BB9981',
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
    },
  })
  