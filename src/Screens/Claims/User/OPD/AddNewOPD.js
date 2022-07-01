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

export default function Add_OPD(){

  const [id,setId] = useState("");
  const [amount,setAmount]=useState("");
  const [particulars,setParticulars]=useState("");
  const [date,setDate]=useState("");

  const navigation=useNavigation();

  const [data, setData] = useState([]);

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
  async function claimOPD() {
    var axios = require('axios');
    if (!amount.trim()) {
      alert('Please Enter the amount');
      return;
    }
    if (!particulars.trim()) {
      alert('Please Enter particulars');
      return;
    }
    if (!date.trim()) {
      alert('Please Enter the date');
      return;
    }
    
      alert('OPD claimed successfully')
      navigation.navigate('OPD' )
      var config = {
        method: 'post',
        url: 'http://10.0.2.2:8080/opd/',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : JSON.stringify({
          id,
          amount,
          particulars,
          date,
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
        // getOPDAmount();
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
        Add a new OPD
        </Text>
        <Text style={styles.text2}>
        Total OPD amount:
        </Text>
       <Text style={styles.text2}>
       Expiration Date:
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
          onPress={claimOPD} >
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
      backgroundColor:'#BBBBBB',
    },
    background:{
      backgroundColor: '#BBBBBB',
      marginBottom:20,
      marginTop:40,
      marginLeft: '25%',
      width:'50%',
      height: '10%',
      justifyContent:'center',
      alignItems:'center',
      borderRadius:60,
    },
    text2:{
      fontSize:15,
      fontWeight:'bold',
      color:'#000000',
      marginTop:1,
      marginLeft:30,
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
      flex:3,
      backgroundColor:'#000000',
    },
  })
  