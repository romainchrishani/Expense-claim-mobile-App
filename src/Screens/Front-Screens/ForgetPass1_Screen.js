import React, {useState} from 'react';
import {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import {useTheme} from 'react-native-paper';
import CustomButton from '../../Components/Button';
import {Picker} from '@react-native-picker/picker';

import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import axios from 'axios';

export default function LoginScreen({navigation}) {

  const [userName, setUserName] = useState('');
  const [selectedValue, setSelectedValue] = useState('User');
  
  const {colors} = useTheme();

  const onPressHandler = () => {
    navigation.navigate('Screen-Login');
  }

  const onPressHandlerSubmit = () => {
      navigation.navigate('Screen-ForgetPass2');
  }

  return (
    <ScrollView style={styles.container}>
      
        <View style={styles.header}>
            <Text style={styles.topic}>Reset Password</Text>
        </View>

        <View style={styles.footer}>


        <View style={styles.action}>
            <TextInput
                style={[styles.textInput,{
                color: colors.text,
              },
            ]}
            placeholder="Enter User Name"
            //value={data.name}
            onChangeText={setUserName}
            underlineColorAndroid="transparent"
            
          />
        </View>

        <View style={{ marginTop:20,marginBottom:10}}>
          <Text style={{width: 200,marginRight:50,marginLeft:50}}>Send Verification Code To : </Text>
          <Picker
            selectedValue={selectedValue}
            style={{height: 50, width: 180,marginRight:50,marginLeft:50,borderColor:'#000'}}
            //mode={"dialog"}
            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            //onValueChange={(itemValue, itemIndex) => console.log(itemValue)}
          >
            <Picker.Item label="E-mail" value="E-mail" color="orange" />
            <Picker.Item label="Mobile Number" value="Mobile Number" color="orange" />
            
          </Picker>
        </View>

        <View style={styles.row}>
          <View style={{flexDirection: 'row',flex:1}}>
            <CustomButton onPressFunction={onPressHandlerSubmit} title="Send" style={{width : '75%'}} />
          </View>
          <View style={{flexDirection: 'row',flex:1}}>
            <CustomButton onPressFunction={onPressHandlerSubmit} title="Re-Send" style={{width : '75%'}} />
          </View>                    
        </View>
        
            {/* <View style={styles.row}>
                <View style={styles.col}>
                    <View style={styles.action2}>
                    <Text>E-mail</Text>
                    </View>

                    <View style={styles.action2}>
                    <Text>Mobile</Text>
                    </View>

                </View>



            </View> */}
        



        <View style={styles.action}>
            <TextInput
                style={[styles.textInput,{
                color: colors.text,
              },
            ]}
            placeholder="Enter Verification Code Here"
            //onChangeText={(password) => this.setState({password}) }
            onChangeText={password => setPassword}
            underlineColorAndroid="transparent"
            secureTextEntry
          />
        </View>

        <View style={styles.action2}>
            <CustomButton onPressFunction={onPressHandlerSubmit} title="Submit" />
        </View>

        <Text>Remember Password ? </Text>
        <View style={styles.action2}>
            <TouchableOpacity onPress={onPressHandler}>
            <Text style={{color: '#F89880', marginTop: -10}}>Sign In</Text>
            </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F89880',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 40,
  },
  footer: {
    alignItems: 'center',
    flex: 5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },

  topic: {
    fontSize: 30,
    fontWeight: 'bold',
    margin: 10,
    color: '#fff',
    textAlign: 'center',
  },

  col:{
    flex:1,
    flexDirection:'column'
  },

  row:{
    flex:1,
    flexDirection:'row',
  },

  text: {
    color: '#000',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  
  action2: {
    margin:20,
    flexDirection: 'row',


  },
  textInput: {
    
    marginTop: -50,
    paddingLeft: 10,
    color: '#05375a',
    alignItems:'center'
  },

  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: -12,
    paddingLeft: 10,
    color: '#05375a',
  },


});
