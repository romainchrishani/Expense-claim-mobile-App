import { createStackNavigator } from '@react-navigation/stack';
import React , {useState} from 'react'; //usestate for hooks
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import {
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity,
  } from 'react-native';
  
  const Stack = createStackNavigator();
  
 export default function SelectingPageAdmin({navigation}){
  const onPressHandler1= () =>{
    navigation.navigate('Reward And Recognition Admin');
  }
  return(
    <View style={styles.body}>
      <View style={styles.header}>
      </View>
      <View style={styles.container}>
      <TouchableOpacity style={styles.background}
      onPress={onPressHandler1}>
        <Text style={styles.textB}>
          Reward and Recognition
        </Text>
        <FontAwesome5
          name={'money-check'}
          size={30}
          color={'#ffffff'}
          />
      </TouchableOpacity>
      </View>
      </View>
    // </View>
  )
}
const styles = StyleSheet.create({
  body:{
    flex:1,
    // justifyContent:'center',
    // alignItems:'center',
    backgroundColor:'#F89880',
  },
  header:{
    flex:2,
    backgroundColor:'#F89880',
    // borderRadius:50,
    // marginLeft:10,
    // marginRight:10,
    // marginBottom:10,
    // marginTop:20,
  },
  // headerSub:{
  //   backgroundColor:'eaa9ac',
  //   borderRadius:40,
  //   marginLeft:20,
  //   marginRight:20,
  //   marginBottom:20,
  //   marginTop:30,
  // },
  text:{
    fontSize:50,
    fontWeight:'bold',
    margin:40,
    color:'#ffffff',
  },
  background:{
    backgroundColor: '#000000',
    // marginBottom:20,
    // marginTop:40,
    // // margin:0,
    // marginLeft: '15%',
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
    // textAlign:'left',
    marginLeft:10,
    color:'#ffffff',
    fontWeight:'bold',
  },
  container:{
    flex:6,
    backgroundColor:'#F89880',
    // borderRadius:50,
    // marginLeft:20,
    // marginRight:20,
    // marginBottom:30,
    borderTopRightRadius:30,
    borderTopLeftRadius:30,
    marginTop:10,
  }
  
})