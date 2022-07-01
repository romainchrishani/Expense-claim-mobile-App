import React , { useEffect, useState } from 'react'; //usestate for hooks
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import { ActivityIndicator, FlatList, Text,} from 'react-native';


export default function RAndRAdmin({navigation}){

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getGivenRAndRs = async  () => {
    var axios = require('axios');
    
     var config = {
     method: 'get',
     url: 'http://10.0.2.2:8080/api/v3/randr/getRAndRs',
     headers: { 
    'Content-Type': 'application/json'
    },
   //data : data
   };

    axios(config).then(function (response) {
    console.log(JSON.stringify(response.data));
    setData(response.data);
     // setData(response.data);
   }).catch(function (error) {
   console.log(error);
    });
    }
    useEffect(() => {
    getGivenRAndRs();
     }, []);

    return(
        <View style={styles.body}>
        <View style={styles.header}>
        <Text style={styles.text}>
          Given R&Rs
        </Text>
        </View>
        <View style={styles.container}>
        {/* {isLoading ? <ActivityIndicator/> : ( */}
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.row}>
              {/* // onPress={()=>{
              //   navigation.navigate('Edit OPD');
              // }} */}
              <FontAwesome5 
               name={'star'}
               size={30}
               color={'#F89880'}
              />
              <Text style={styles.rowText}>
              R and R ID:{item.randrgiving_id}
              </Text>
              <Text style={styles.rowText}>
              Employee ID:{item.employee_id}
              </Text>
              <Text style={styles.rowText}>
              R and R amount:{item.randramount}
              </Text>
              </TouchableOpacity>
            )}
          />
        {/* )} */}
           <TouchableOpacity style={styles.button} 
            onPress={()=>{
            navigation.navigate('Give new R And R');
          }}
          >
            <FontAwesome5 style={styles.plus}
            name={'plus'}
            size={30}
            color={'#F89880'}
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
        backgroundColor:'#000000',
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
        margin:35,
        color:'#000000',
      },
      container:{
        flex:5,
        backgroundColor:'#F89880',
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
  
  
    
  