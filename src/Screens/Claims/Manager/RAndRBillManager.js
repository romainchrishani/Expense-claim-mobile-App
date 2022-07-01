import React , { useEffect, useState } from 'react'; //usestate for hooks
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { FlatList, Text,} from 'react-native';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RAndRBillManager({route}){

  console.log(route.params)
  const RRId = route.params;
  console.log(RRId)

  const [data, setData] = useState([]);

  const getExpenseClaims = async  () => {
    var axios = require('axios');
    
     var config = {
     method: 'get',
     url: 'http://10.0.2.2:8080/rrbill/',
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

    let filterListByUserId =[]
    filterListByUserId=data.filter(el=>{return el.rr==RRId})
    console.log(data);
  
  
    return(
      
      <View style={styles.body}>
      <View style={styles.header}>
      <Text style={styles.text}>
       R and R Bills
      </Text>
      </View>
      <View style={styles.container}>
        <FlatList 
          data={filterListByUserId}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.row}>
              <FontAwesome5
              name={'file-alt'}
              size={30}
              color={'#ffffff'}
            />
            <Text style={styles.rowText}>
            R and R ID:  {item.rr}
            </Text>
            <Text style={styles.rowText}>
            Bill ID:  {item.id}
            </Text>
            <Text style={styles.rowText}>
            Amount:  {item.amount}
            </Text>
            <Text style={styles.rowText}>
            Extension No:  {item.extensionNo},
            </Text>
            <Text style={styles.rowText}>
            Particulars:  {item.particulars}
            </Text>
            <Text style={styles.rowText}>
            Date:  {item.date}
            </Text>
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
  })


  
