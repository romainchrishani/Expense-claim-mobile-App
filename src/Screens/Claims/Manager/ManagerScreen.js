import { createStackNavigator } from '@react-navigation/stack';
import React , {useEffect,useState} from 'react'; //usestate for hooks
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
  } from 'react-native';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  
  const Stack = createStackNavigator();
  
 export default function SelectingPageManager({navigation}){
  
  const onPressHandler1= () =>{
   navigation.navigate('ECManager');
  }
  const onPressHandler2= () =>{
    navigation.navigate('OPDManager');
  }
  const onPressHandler3= () =>{
    navigation.navigate('Reward And Recognition Manager');
  }
  const onPressHandler4= () =>{
    navigation.navigate('Employee Details');
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
    <View style={styles.body}>
      <View style={styles.header}>
      <Image source={require('../Picture1.png')}
             style={{
              width:420,
              height:200,
          }}/>

      </View>
      <View style={styles.container}>
      <TouchableOpacity style={styles.background}
      onPress={onPressHandler1}>
        <Text style={styles.textB}>
          Expense Claim
        </Text>
        <FontAwesome5
          name={'money-check'}
          size={30}
          color={'#000000'}
          />
      </TouchableOpacity>

      <TouchableOpacity style={styles.background}
      onPress={onPressHandler2}>
        <Text style={styles.textB}>
          OPD
        </Text>
        <FontAwesome5 style={styles.plus}
          name={'hospital-user'}
          size={30}
          color={'#000000'}
          />
      </TouchableOpacity>

      <TouchableOpacity style={styles.background}
      onPress={onPressHandler3}>
        <Text style={styles.textB}>
          Reward and Recognition
        </Text>
        <FontAwesome5 style={styles.plus}
          name={'grin-stars'}
          size={30}
          color={'#000000'}
          />
      </TouchableOpacity>

      <TouchableOpacity style={styles.background}
      onPress={onPressHandler4}>
        <Text style={styles.textB}>
          Employee Details
        </Text>
        <FontAwesome5 style={styles.plus}
          name={'info-circle'}
          size={30}
          color={'#000000'}
          />
      </TouchableOpacity>
      </View>
      </View>
  )
}
const styles = StyleSheet.create({
  body:{
    flex:1,
    backgroundColor:'#000000',
  },
  header:{
    flex:2,
    backgroundColor:'#000000',
  },
  text:{
    fontSize:50,
    fontWeight:'bold',
    margin:40,
    color:'#ffffff',
  },
  background:{
    backgroundColor: '#FFDED5',
    width:'70%',
    height: '15%',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:60,
    elevation:30,
    marginTop:30,
    marginHorizontal:60,
    marginVertical:10,
    paddingHorizontal:20,
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
  container:{
    flex:6,
    backgroundColor:'#FFDED5',
    borderTopRightRadius:30,
    borderTopLeftRadius:30,
    marginTop:10,
  }
  
})