import React , {useState,useEffect}from 'react'; //usestate for hooks
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function AddNew_RAndR(){

  

  const [extensionNo,setExtensionNo] = useState("");
  const [customer ,setCustomer]=useState("");
  const [ location,setLocation]=useState("");
  
  const navigation=useNavigation();

  async function claimRAndR() {

    var axios = require('axios');

    if (!extensionNo.trim()) {
      alert('Please Enter Extension no');
      return;
    }
    if (!customer.trim()) {
      alert('Please Enter customer name');
      return;
    }
    if (!location.trim()) {
      alert('Please Enter location');
      return;
    }

alert('R And R claimed successfully')
navigation.navigate('Reward And Recognition' )

var config = {
  method: 'post',
  url: 'http://10.0.2.2:8080/rr/',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : JSON.stringify({
          extensionNo,
          customer,
          location,
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


const [data, setData] = useState([]);

  const getRRAmount = async  () => {
    var axios = require('axios');
    console.log()
     var config = {
     method: 'get',
     url: `http://10.0.2.2:8080/reward/`,
     headers: { 
    'Content-Type': 'application/json'
    },
    // data:JSON.stringify(
    //   {
    //     expireDate,
    //     amount,
    //     addedDate,
    //     employee:userId,
    //   }
    // )
   };

    axios(config).then(function (response) {
    console.log(JSON.stringify(response.data.payload[0]));
    setData(response.data.payload[0]);
    console.log(data);
  }).catch(function (error) {
   console.log(error);
    });
    }


useEffect(() => {
  getData();
  getRRAmount();
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
        Add a new R&R
        </Text>
        <Text style={styles.text2}>
        Total OPD amount:{data.amount}
        </Text>
       <Text style={styles.text2}>
       Expiration Date:{data.expireDate}
       </Text>
        </View>
        <View style={styles.container}>

        <TextInput  onChangeText={newText => setExtensionNo(newText)} style={styles.input}
        placeholder='Extension no'
        keyboardType='numeric'
        value={extensionNo}
        />  
        <TextInput  onChangeText={newText => setCustomer(newText)} style={styles.input}
        placeholder='Customer'
        value={customer}
        />
        <TextInput  onChangeText={newText => setLocation(newText)} style={styles.input}
        placeholder='Location'
        value={location}
        />
        <TouchableOpacity style={styles.background}
          onPress={claimRAndR} >
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
      backgroundColor:'#C1A57B',
    },
    background:{
      backgroundColor: '#C1A57B',
      marginBottom:20,
      marginTop:40,
      // margin:0,
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
      // borderTopLeftRadius: 60,
      // borderTopRightRadius: 60,
    },
    text2:{
      fontSize:15,
      fontWeight:'bold',
      color:'#000000',
      marginTop:1,
      marginLeft:30,
    },
  })
  