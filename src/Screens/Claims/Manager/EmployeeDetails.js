import React , { useEffect, useState } from 'react'; //usestate for hooks
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { FlatList, Text,} from 'react-native';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icons from 'react-native-vector-icons/Ionicons';

export default function EmployeeDetails({navigation}){

    const [data, setData] = useState([]);
   
    const [ employee,setEmployee]=useState([]);

    useEffect(() => {
    getData();
    getEmployees();
     }, []);

     const getEmployeeById = async  (id) => {
      var axios = require('axios');
      console.log()
       var config = {
       method: 'get',
       url: `http://10.0.2.2:8080/employee/${id}`,
       headers: { 
      'Content-Type': 'application/json'
      },
      data:JSON.stringify(
        {
          employee:userId,
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

     const getEmployees = async  () => {
        var axios = require('axios');
        console.log()
         var config = {
         method: 'get',
         url: 'http://10.0.2.2:8080/employee/',
         headers: { 
        'Content-Type': 'application/json'
        },
        data:JSON.stringify(
          {
            employee:userId,
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
        Employee Details 
      </Text>
      </View>
      <View style={styles.headerFlex}>
      <TextInput 
      placeholder="Search..." 
      placeholderTextColor="#333"
      style={styles.searchBox}
      onChangeText={newText => setEmployee(newText)}
      />
       <TouchableOpacity
      >
        <Icons name="search-outline" size={30} color="#333" style={styles.searchIcon}  onPress={() => getEmployeeById(employee)}/>
      </TouchableOpacity>
    </View>

    <View style={styles.container}>
        <FlatList 
          data={[data]}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.row2}>
            <Text style={styles.rowText2}>
            Employee ID:{item.id}
            </Text>
            <Text style={styles.rowText2}>
            First Name:  {item.firstName}
            </Text>
            <Text style={styles.rowText2}>
            Last Name:  {item.lastName}
            </Text>
            <Text style={styles.rowText2}>
            E-mail:  {item.email}
            </Text>
            <Text style={styles.rowText2}>
            User Name:  {item.userName}
            </Text>
            <Text style={styles.rowText2}>
            Phone Number:  {item.phoneNumber}
            </Text>
            </TouchableOpacity>
          )}
        />
        <FlatList 
          data={data}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.row}>
            <Text style={styles.rowText}>
            Employee ID:{item.id}
            </Text>
            <Text style={styles.rowText}>
            First Name:  {item.firstName}
            </Text>
            <Text style={styles.rowText}>
            Last Name:  {item.lastName}
            </Text>
            <Text style={styles.rowText}>
            E-mail:  {item.email}
            </Text>
            <Text style={styles.rowText}>
            User Name:  {item.userName},
            </Text>
            <Text style={styles.rowText}>
            Phone Number:  {item.phoneNumber}
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
        backgroundColor:'#DFF0EA',
      },
      header:{
        flex:2,
        backgroundColor:'#DFF0EA',
  
      },
      text:{
        fontSize:30,
        fontWeight:'bold',
        margin:35,
        color:'#000000',
      },
      container:{
        flex:9,
        backgroundColor:'#DFF0EA',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
      },
      row:{
        marginHorizontal:20,
        marginVertical:20,
        paddingHorizontal:10,
        backgroundColor:'#000000',
        justifyContent:'center',
        borderRadius:10,
        elevation:8,
      },
      row2:{
        marginHorizontal:25,
        marginVertical:15,
        paddingHorizontal:15,
        justifyContent:'center',
        borderRadius:10,
      },
      rowText:{
        color:'#ffffff',
        fontSize:15,
        margin:1,
      },
      rowText2:{
        color:'#000000',
        fontSize:15,
        margin:1,
      },
      headerFlex: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      searchBox:{
        width: 350,
        height:  50,
        backgroundColor:"#ffffff",
        marginHorizontal:25,
        // marginTop:-125,
        borderRadius:25,
        fontSize:15,
        color:"#333",
        paddingHorizontal:15,
        position:"relative"
      },
      searchIcon:{
        position:"absolute",
        bottom: -15,
        right: 35,
      },
  
  })


  
