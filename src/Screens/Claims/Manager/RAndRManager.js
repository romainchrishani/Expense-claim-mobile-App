import React , { useEffect, useState } from 'react'; //usestate for hooks
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { FlatList, Text,} from 'react-native';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RAndRManager({navigation}){


  const acceptOrDelete = async  (id,sta_tus) => {
    var axios = require('axios');
    
     var config = {
     method: 'post',
     url: `http://10.0.2.2:8080/managerrr/`,
     headers: { 
    'Content-Type': 'application/json'
    },
    data:JSON.stringify(
      {
        employee:userId,
        rrId:id,
        sta_tus,
      }
    )
   };

    axios(config).then(function (response) {
    console.log(JSON.stringify(response.data.payload[0]));
    setData(response.data.payload[0]);
  }).catch(function (error) {
   console.log(error);
    });
    }
  

  const [data, setData] = useState([]);

  const getExpenseClaims = async  () => {
    var axios = require('axios');
    
     var config = {
     method: 'get',
     url: 'http://10.0.2.2:8080/rr/',
     headers: { 
    'Content-Type': 'application/json'
    },
   };
    axios(config).then(function (response) {
    console.log(JSON.stringify(response.data.payload[0]));
    setData(response.data.payload[0]);
  }).catch(function (error) {
   console.log(error);
    });
    }
  
const showOptionToAcceptOrReject =(item)=>{
  Alert.alert(
    'Alert',
    'Edit or Delete?',
    [
      {text: 'cancel'},
      {text: 'Accept',onPress:()=>acceptOrDelete(item.id,item.sta_tus='accepted')},
      {text: 'Reject',onPress:()=>acceptOrDelete(item.id,item.sta_tus='rejected')},
    ]
  );
}
    useEffect(() => {
    getExpenseClaims();
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
      
      <View style={styles.body}>
      <View style={styles.header}>
      <Text style={styles.text}>
        Claimed R and Rs
      </Text>
      </View>
      <View style={styles.container}>
        <FlatList 
          data={data}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.row}
            onPress={()=>{showOptionToAcceptOrReject(item)}}>
              <FontAwesome5
              name={'money-check-alt'}
              size={30}
              color={'#ffffff'}
            />
           <Text style={styles.rowText}>
            R and R ID:{item.id}
            </Text>
            <Text style={styles.rowText}>
            Employee ID:{item.employee}
            </Text>
            <Text style={styles.rowText}>
            Extension No:{item.extensionNo}
            </Text>
            <Text style={styles.rowText}>
            Customer:{item.customer}
            </Text>
            <Text style={styles.rowText}>
            Location:{item.location}
            </Text>
            <Text style={styles.rowText}>
            Status:{item.sta_tus}
            </Text>
            <TouchableOpacity style={styles.bill_button} 
            onPress={()=>{
            navigation.navigate('RAndR bill manager',item.id);
            }}>
              <Text style={styles.bill_text}>
                R and R bill Details
              </Text>
            </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
        </View>
      </View>
    )
  }

  const styles = StyleSheet.create({
    body:{
      flex:1,
      backgroundColor:'#C1A57B',
    },
    header:{
      flex:1,
      backgroundColor:'#C1A57B',

    },
    text:{
      fontSize:30,
      fontWeight:'bold',
      margin:35,
      color:'#000000',
    },
    container:{
      flex:5,
      backgroundColor:'#C1A57B',
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
    },
    row:{
      marginHorizontal:20,
      marginVertical:10,
      paddingHorizontal:10,
      backgroundColor:'#000000',
      justifyContent:'center',
      borderRadius:10,
      elevation:8,
    },
    rowText:{
      color:'#ffffff',
      fontSize:15,
      margin:1,
    },
    bill_button:{
      backgroundColor:'#ffffff',
      borderRadius:10,
      marginVertical:10,
      marginHorizontal:100,
      width:200,
      height:30,
      justifyContent:'center',
    },
    bill_text:{
      color:'#000000',
      marginHorizontal:20,
    }
  })


  
