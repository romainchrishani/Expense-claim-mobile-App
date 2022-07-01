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

export default function ViewEBill({navigation,route}){

  console.log(route.params)
    const EId = route.params;
    console.log(EId)


  const [data, setData] = useState([]);

  const getExpenseBills = async  () => {
    var axios = require('axios');
    console.log()
     var config = {
     method: 'get',
     url: `http://10.0.2.2:8080/expensebill/`,
     headers: { 
    'Content-Type': 'application/json'
    },
    data:JSON.stringify(
      {
        employee:userId,
        expense:EId,
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

    const deleteEBill = async (id) => {
      console.log(id)
      console.log(`expense/delete/${id}`);
      
        var config = {
          method: 'delete',
          url: `http://10.0.2.2:8080/expensebill/${id}`,
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

      const showOptionToEditOrDelete =(item)=>{
        Alert.alert(
          'Alert',
          'Edit or Delete?',
          [
            {text: 'cancel'},
            {text: 'Edit',  onPress: () => navigation.navigate('Edit EBill', {
              itemdetails: item,}
            )},
            {text: 'Delete',onPress:()=>deleteEBill(item.id)},
          ]
        );
      }
    useEffect(() => {
    getData();
    getExpenseBills();
     },[]);


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
    filterListByUserId=data.filter(el=>{return el.expense==EId})
    console.log(data);
  
    return(
      
      <View style={styles.body}>
      <View style={styles.header}>
      <Text style={styles.text}>
        View bill details
      </Text>
      </View>
      <View style={styles.container}>
      <FlatList 
          data={filterListByUserId}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.row}
             onPress={()=>{showOptionToEditOrDelete(item)}}>
              <FontAwesome5
              name={'file-alt'}
              size={30}
              color={'#ffffff'}
            />
            <Text style={styles.rowText}>
            Expense Bill ID:  {item.id}
            </Text>
            <Text style={styles.rowText}>
            Amount:  {item.amount}
            </Text>
            <Text style={styles.rowText}>
            Expense Claim ID:  {item.expense}
            </Text>
            <Text style={styles.rowText}>
            Extension No:  {item.extensionNo},
            </Text>
            <Text style={styles.rowText}>
            Particulars:  {item.particulars}
            </Text>
            </TouchableOpacity>
          )}
        />
      <TouchableOpacity style={styles.button} 
          onPress={()=>{
          navigation.navigate('Add expense bill',EId);
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
      backgroundColor:'#BB9981',
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
      backgroundColor:'#BB9981',
    },
    header:{
      flex:1,
      backgroundColor:'#BB9981',

    },
    text:{
      fontSize:30,
      fontWeight:'bold',
      margin:35,
      color:'#000000',
    },
    container:{
      flex:5,
      backgroundColor:'#BB9981',
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
      width:150,
      height:30,
      justifyContent:'center',
    },
    bill_text:{
      color:'#000000',
      marginHorizontal:20,
    }
  })


  
