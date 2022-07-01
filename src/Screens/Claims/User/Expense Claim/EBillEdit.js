import React , {useState,useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native'; 
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EBillEdit({route}){

  const data = route.params;

  useEffect(() => {
   
    if(data !=null){
      setId(data.itemdetails.id)
      setAmount(data.itemdetails.amount)
      setExtensionNo(data.itemdetails.extensionNo)
      setParticulars(data.itemdetails.particulars)
      setExpense(data.itemdetails.expense)
      setSta_tus(data.itemdetails.sta_tus)
    }
    getData();
     }, [data]);
     
  
  const [id,setId] = useState("");
  const [ amount,setAmount]=useState("");
  const [ extensionNo,setExtensionNo]=useState("");
  const [ particulars,setParticulars]=useState("");
  const [ expense,setExpense]=useState("");
  const [sta_tus,setSta_tus] = useState("");

  const navigation=useNavigation();

  async function updateEBill() {
    var axios = require('axios');
  
    var config = {
      method: 'put',
      url: `http://10.0.2.2:8080/expensebill/update/${id}`,
      headers: { 
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
        extensionNo,
        amount,
        particulars,
        id,
        sta_tus,
        expense,
      })
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      alert("Updated successfully!")
      navigation.navigate('Expense bill details')
    
    })
    .catch(function (error) {
      console.log(error);
    });
    console.log('ggggg');
  }

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
      <View style={styles.body}>
        <View style={styles.header}>
        <Text style={styles.text}>
        Edit Expense Bill Details
        </Text>
        </View>
        <View style={styles.container}>

        <TextInput  onChangeText={newText => setAmount(newText)} style={styles.input}
        placeholder='Amount'
        value={amount}
        />
        <TextInput  onChangeText={newText => setParticulars(newText)} style={styles.input}
        placeholder='Particulars'
        value={particulars}
        />
        <TextInput  onChangeText={newText => setExtensionNo(newText)} style={styles.input}
        placeholder='Extension No'
        value={extensionNo}
        />
        <TouchableOpacity style={styles.background}
          onPress={updateEBill}>
        <Text style={styles.textB}>
          Submit
        </Text>
        </TouchableOpacity>

        </View>
      </View>
    );
  }

  const styles = StyleSheet.create({
  
    input:{
      height: 40,
      width:200,
      margin: 5,
      borderRadius:10,
      padding: 10,
      marginLeft: '25%',
      marginBottom: 10,
      backgroundColor:'#BB9981',
    },
    background:{
      backgroundColor: '#BB9981',
      marginBottom:20,
      marginTop:20,
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
      // justifyContent:'center',
      // alignItems:'center',
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
      flex:5,
      backgroundColor:'#000000',
      marginTop:10,
    },
    picker:{
      height:1,
      width:200,
      marginLeft: '25%',
      marginBottom: 10,
      backgroundColor:'#BB9981',
    },
  
  })
  