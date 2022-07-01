import React, {useState} from 'react';
import {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import CustomButton from '../../Components/Button';
import {useNavigation} from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import axios from 'axios';

export default function LoginScreen({navigation}) {
  const {colors} = useTheme();

  const [data, setData] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const onPressHandlerSignUp = () => {
    navigation.navigate('Screen-SignUp');
  };

  const onPressHandlerSignIn = () => {
    var axios = require('axios');

    var data = JSON.stringify({
      username: userName,
      password: password,
    });

    var config = {
      method: 'post',
      url: 'http://10.0.2.2:8080/api/auth/signin',
      headers: {
          
        'Content-Type': 'application/json'
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        let accessToken = response.data.accessToken;
        let a = "Bearer "
        AsyncStorage.setItem("accessToken",a+accessToken);
            let firstName =response.data.firstName;
            AsyncStorage.setItem("firstName",firstName);
            let lastName =response.data.lastName;
            AsyncStorage.setItem("lastName",lastName);
            let userId =response.data.id;
            AsyncStorage.setItem("userId",JSON.stringify(userId))
            let roles =response.data.roles[0];
            AsyncStorage.setItem("roles",roles);
            console.log(JSON.stringify(response.data)) 

            AsyncStorage.getItem('roles')
                .then(value => {
                    if (value === "ROLE_USER") {
                      navigation.navigate('UserScreen');
                      console.log(roles)                                       
                    }else if(value === "ROLE_ADMIN"){
                      navigation.navigate('AdminScreen');
                      console.log(roles)
                    }else if(value === "ROLE_MANAGER"){
                      navigation.navigate('ManagerScreen');
                      console.log(roles)
                  }
                })

      })
      .catch(function (error) {
        console.log(error);
        window.alert("wrong username/password.Try again");
        window.location.reload()
      });

    
  };

  const onPressHandlerForgetPass = () => {
    navigation.navigate('Screen-ForgetPass1');
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.topic}>Persistent System Lanka (PVT) LTD</Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={30} />
          <TextInput
            placeholder="User Name"
            style={[styles.textInput, {color: colors.text}]}
            underlineColorAndroid="transparent"
            value={data.userName}
            onChangeText={setUserName}
          />
        </View>

        <View style={styles.action}>
          <FontAwesome name="lock" color={colors.text} size={30} />
          <TextInput
            placeholder="Password"
            style={[styles.textInput, {color: colors.text}]}
            underlineColorAndroid="transparent"
            value={data.password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <View style={styles.action2}>
          <CustomButton
            onPressFunction={onPressHandlerSignIn}
            title="Sign In"
          />
        </View>

        <View style={styles.action2}>
          <TouchableOpacity onPress={onPressHandlerForgetPass}>
            <Text style={{color: '#009387', marginTop: 15}}>
              Forgot password?
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.action2}>
          <CustomButton
            onPressFunction={onPressHandlerSignUp}
            title="Sign Up"
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    alignItems: 'center',
    flex: 3,
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

  text_footer: {
    color: '#05375a',
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
    margin: 10,
    flexDirection: 'row',
  },
  textInput: {
    flex: 1,
    marginTop: -12,
    paddingLeft: 10,
    color: '#05375a',
  },
});
