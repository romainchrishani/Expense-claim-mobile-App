import React , { useEffect, useState } from 'react'; //usestate for hooks
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList, Text,} from 'react-native';

export default function OPD({navigation}){

  const [data, setData] = useState([]);

  const deleteOPD = async (id) => {
    console.log(id)
    console.log(`opd/${id}`);
    
      var config = {
        method: 'delete',
        url: `http://10.0.2.2:8080/opd/${id}`,
        headers: { }
      };
      
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        alert("Claim Deleted successfully")
        setData([]);
        getExpenseClaims();
      })
      .catch(function (error) {
        console.log(error);
      });
      
    }

  const getExpenseClaims = async  () => {
    var axios = require('axios');
    
     var config = {
     method: 'get',
     url: 'http://10.0.2.2:8080/opd/',
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
    const showOptionToEditOrDelete =(item)=>{
      Alert.alert(
        'Alert',
        'Edit or Delete?',
        [
          {text: 'cancel'},
          {text: 'Edit',  onPress: () => navigation.navigate('Edit OPD', {
            itemdetails: item,}
          )},
          {text: 'Delete',onPress:()=>deleteOPD(item.id)},
         
        ]
      );
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
  
    useEffect(() => {
    getExpenseClaims();
    getData();
     }, []);

     let filterListByUserId =[]
     filterListByUserId=data.filter(el=>{return el.employee==userId})
     console.log(data);

    return(
      <View style={styles.body}>
      <View style={styles.header}>
      <Text style={styles.text1}>
        Claimed OPDs
      </Text>
      </View>
      <View style={styles.container}>
      {/* {isLoading ? <ActivityIndicator/> : ( */}
        <FlatList
          data={filterListByUserId}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.row}
            onPress={()=>{showOptionToEditOrDelete(item)}}>
          <FontAwesome5 
            name={'hospital-alt'}
            size={30}
            color={'#ffffff'}
          />
            <Text style={styles.rowText}>
            OPD ID:{item.id}
            </Text>
            <Text style={styles.rowText}>
            Employee ID:{item.employee}
            </Text>
            <Text style={styles.rowText}>
            Amount:{item.amount}
            </Text>
            <Text style={styles.rowText}>
            Particulars:{item.particulars}
            </Text>
            <Text style={styles.rowText}>
            date:{item.date}
            </Text>
            <Text style={styles.rowText}>
            status:{item.sta_tus}
            </Text>
            </TouchableOpacity>
          )}
        />
      {/* )} */}
         <TouchableOpacity style={styles.button} 
        onPress={()=>{
          navigation.navigate('Claim a new OPD');
        }}
        >
          <FontAwesome5 style={styles.plus}
          name={'plus'}
          size={30}
          color={'#000000'}
          />
        </TouchableOpacity>
      </View>
      </View>
    )
  }

  const styles = StyleSheet.create({
   
    button:{
      width:60,
      height:60,
      borderRadius:30,
      backgroundColor:'#BBBBBB',
      justifyContent:'center',
      position:'absolute',
      bottom:25,
      right:5,
      elevation:5,
    },
    plus:{
      left:15,
    },
    body:{
      flex:1,
      backgroundColor:'#BBBBBB',
    },
    header:{
      flex:1,
      backgroundColor:'#BBBBBB',
    },
    text1:{
      fontSize:25,
      fontWeight:'bold',
      color:'#000000',
      marginTop:30,
      marginBottom:1,
      marginLeft:20,
    },
    container:{
      flex:5,
      backgroundColor:'#BBBBBB',
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
      fontSize:14,
      margin:1,
    }
  })


  
