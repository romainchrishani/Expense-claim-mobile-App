import React , { useEffect, useState } from 'react'; //usestate for hooks
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native'; 
import {  Text,} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import axios from "axios";
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

export default function AddRRBill({route}){

    const [data, setData] = useState('');

    const RRId = route.params;

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
        'http://10.0.2.2:8080/upload-rr-bill',
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

    const [ extensionNo,setExtensionNo]=useState("");
    const [ amount,setAmount]=useState("");
    const [ particulars,setParticulars]=useState("");
    const [ sta_tus,setSta_tus]=useState("");
    const [ id,setId]=useState("");
    const [ rr,setRR]=useState("");
    const [ date,setDate]=useState("");

    const navigation=useNavigation();

    async function uploadBill() {
        var axios = require('axios');
        if (!extensionNo.trim()) {
          alert('Please Enter extension number');
          return;
        }
        if (!amount.trim()) {
          alert('Please Enter àmount');
          return;
        }
        if (!particulars.trim()) {
          alert('Please Enter particulars');
          return;
        }   
        if (!date.trim()) {
          alert('Please Enter date');
          return;
        }   
          alert('Expense claimed successfully')
          navigation.navigate('RR bill details' )
          var config = {
            method: 'post',
            url: 'http://10.0.2.2:8080/rrbill/',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : JSON.stringify({
              extensionNo,
              amount,
              particulars,
              id,
              rr:RRId,
              date,
              sta_tus,
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
        Add R and R Bill
      </Text>
      </View>
      <View style={styles.container}>
      <TextInput  onChangeText={newText => setExtensionNo(newText)} style={styles.input}
        placeholder='Extension No'
        keyboardType='numeric'
        value={extensionNo}
        />
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
        <TouchableOpacity style={styles.button}
        onPress={openGallery}>
          <Text> Attach Bill</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}
        onPress={uploadBill}>
          <Text> Upload Bill</Text>
      </TouchableOpacity>
      </View>
      </View>
    </TouchableWithoutFeedback>
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
        margin:30,
        color:'#000000',
      },
      container:{
        flex:3,
        backgroundColor:'#000000',
      },
      input:{
        height: 40,
        width:200,
        margin: 5,
        padding: 10,
        borderRadius:10,
        marginLeft: '25%',
        marginBottom: 10,
        backgroundColor:'#C1A57B',
      },
      button:{
        backgroundColor:'#C1A57B',
        borderRadius:10,
        marginVertical:10,
        marginHorizontal:100,
        width:200,
        height:40,
        justifyContent:'center',
      },
  })


  
