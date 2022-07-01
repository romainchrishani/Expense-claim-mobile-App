import React , {useState,useEffect} from 'react'; //usestate for hooks
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import axios from "axios";
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary} from 'react-native-image-picker';

const options={
  title:'Select Image',
  type:'library',
  options:{
  maxHeight:200,
  maxWidth:200,
  selectionLimit:1,
  mediaType:'photo',
  includeBase64:false,
}
}

export default function Add_OPD2({route}){

  const openGallery =async()=>{
    const images = await launchImageLibrary(options);
    console.log(images.assets[0])
    const formdata = new FormData ()
    formdata.append('file',{
      uri:images.assets[0].uri,
      type:images.assets[0].type,
      name:images.assets[0].fileName,
    })
    let res = await fetch(
      'http://10.0.2.2:8080/upload-opd-bill',
      {
        method: 'post',
        body: formdata,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    let responseJson = await res.json();
    console.log(responseJson,"responseJson")
  }

  const data = route.params;

  useEffect(() => {
   
    if(data !=null){
      console.log(data.itemdetails.description)
      setParticulars(data.itemdetails.particulars)
      setAmount(data.itemdetails.amount)
      setDate(data.itemdetails.data)
      setSta_tus(data.itemdetails.sta_tus)
      setId(data.itemdetails.id)
    }
    getData();
  }, [data]);

  const [id,setId] = useState("");
  const [amount,setAmount]=useState("");
  const [particulars,setParticulars]=useState("");
  const [date,setDate]=useState("");
  const [sta_tus,setSta_tus] = useState("");

  const navigation=useNavigation();

  async function updateOPD() {
    var axios = require('axios');

    var config = {
      method: 'put',
      url: `http://10.0.2.2:8080/opd/update/${id}`,
      headers: { 
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
        id,
        amount,
        particulars,
        date,
        sta_tus,
        employee:userId,
      })
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      alert("Updated successfully!")
      navigation.navigate('OPD')
    
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
      Edit OPD
      </Text>
      </View>
      <View style={styles.container}>
        <TextInput  onChangeText={newText => setAmount(newText)} style={styles.input}
        placeholder='Amount'
        keyboardType='numeric'
        value={amount}
        />
        <TextInput  onChangeText={newText => setParticulars(newText)} style={styles.input}
        placeholder='Particulars'
        value={particulars}
        />
        <TextInput  onChangeText={newText => setDate(newText)} style={styles.input}
        placeholder='Date'
        value={date}
        />
      <TouchableOpacity style={styles.background}
        onPress={openGallery}>
          <Text> Attach Bill</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.background}
        onPress={updateOPD}>
      <Text style={styles.textB}>
        Update
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
        // marginHorizontal:150,
        marginLeft: '25%',
        marginBottom: 10,
        backgroundColor:'#BBBBBB',
      },
      background:{
        backgroundColor: '#BBBBBB',
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
        // textAlign:'left',
        marginLeft:10,
        color:'#000000',
        fontWeight:'bold',
      },
      body:{
        flex:1,
        // justifyContent:'center',
        // alignItems:'center',
        backgroundColor:'#BBBBBB',
      },
      header:{
        flex:1,
        backgroundColor:'#BBBBBB',
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
        backgroundColor:'#BBBBBB',
      },
    
    })
    