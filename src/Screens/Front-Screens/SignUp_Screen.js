import React, {useState} from 'react';
import {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import CustomButton from '../../Components/Button';


import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {RadioButton} from 'react-native-paper';


import axios from 'axios';

export default function SignUpScreen({navigation}) {
  const {colors} = useTheme();

  const [data, setData] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneN, setPhoneN] = useState('');
  const [password, setPassword] = useState('');

  const [checked, setChecked] = React.useState('');

  const onPressHandlerFinish = () => {
    var axios = require('axios');

    var data = JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      username: userName,
      email: email,
      phoneNumber: phoneN,
      password: password,
      role : [
        checked
      ]
    });

    var config = {
      method: 'post',
      url: 'http://10.0.2.2:8080/api/auth/signup',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
        window.alert("username/email is already exist.Try again");
        window.location.reload()
      });

    //alert(message)
    navigation.navigate('Screen-Login');
  };

  const onPressHandlerSignIn = () => {
    navigation.navigate('Screen-Login');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.topic}>Sign Up</Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={30} />
          <TextInput
            placeholder="First Name"
            style={[styles.textInput, {color: colors.text}]}
            underlineColorAndroid="transparent"
            value={data.firstName}
            onChangeText={setFirstName}
          />
        </View>

        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={30} />
          <TextInput
            placeholder="Last Name"
            style={[styles.textInput, {color: colors.text}]}
            underlineColorAndroid="transparent"
            value={data.lastName}
            onChangeText={setLastName}
          />
        </View>

        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={30} />
          <TextInput
            placeholder="User Name"
            style={[styles.textInput, {color: colors.text}]}
            underlineColorAndroid="transparent"
            //value={setLastName}
            value={data.userName}
            onChangeText={setUserName}
          />
        </View>

        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={30} />
          <TextInput
            placeholder="E-mail"
            style={[styles.textInput, {color: colors.text}]}
            underlineColorAndroid="transparent"
            value={data.email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={30} />
          <TextInput
            placeholder="Phone Number"
            style={[styles.textInput, {color: colors.text}]}
            underlineColorAndroid="transparent"
            value={data.phoneN}
            onChangeText={setPhoneN}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={30} />
          <TextInput
            placeholder="Password"
            style={[styles.textInput, {color: colors.text}]}
            underlineColorAndroid="transparent"
            value={data.password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        {/* <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={30} />
          <TextInput
            placeholder="Confirm Password"
            style={[styles.textInput, {color: colors.text}]}
            underlineColorAndroid="transparent"
            value={data.password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View> */}

        <View style={{flexDirection:'row'}}>
          <RadioButton.Item
            label="User"
            value="user"
            status={checked === 'user' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('user')}
          />

          <RadioButton.Item
            label="Manager"
            value="manager"
            status={checked === 'manager' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('manager')}
          />

          <RadioButton.Item
            label="Admin"
            value="admin"
            status={checked === 'admin' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('admin')}
          />
          <Text>{console.log(checked)}</Text>
          

          {/* <Picker
            selectedValue={selectedValue}
            style={{height: 50, width: 150}}
            mode={"dialog"}
            onValueChange={(itemValue) => setSelectedValue(itemValue)}
            // onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)
            // .then(console.log(setSelectedValue))}
            
          >
            <Picker.Item label="User" value="User" color="orange" />
            <Picker.Item label="Manager" value="Manager" color="orange" />
            <Picker.Item label="Admin" value="Admin"  color="orange"/>
          </Picker> */}
        </View>

        <View style={styles.action2}>
          <CustomButton onPressFunction={onPressHandlerFinish} title="Finish" />
        </View>

        <Text>Already Have an account?</Text>
        <View style={styles.action2}>
          <TouchableOpacity onPress={onPressHandlerSignIn}>
            <Text style={{color: '#009387', marginTop: -10}}>Sign In</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
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

  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
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

  pickerContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
});
