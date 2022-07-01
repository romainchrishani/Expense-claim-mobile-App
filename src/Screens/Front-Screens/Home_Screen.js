import * as React from 'react';
import { View, Text, StyleSheet,Pressable,TextInput,Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomButton from '../../Components/Button';

export default function HomeScreen({navigation}) {
    // const onPressHandlerExpense = () => {
    //     //navigation.navigate('Screen-Exp');
    //     navigation.navigate('Expense Claim');
    //   }
  
    // const onPressHandlerOPD = () => {
    //   //navigation.navigate('Screen-OPD');
    //   navigation.navigate('OPD');
    // }

    // const onPressHandlerRandR = () => {
    //     //navigation.navigate('Screen-RandR');
    //     navigation.navigate('Reward And Recognition');
    //   }

    // const onPressHandlerLogOut = () => {

    // }

    
    
    return (
        
        <View style={styles.body}>

            <View style={styles.view}>
                <Text style={styles.text}>Persistent System Lanka (PVT) LTD</Text>
            </View>

            <View style={styles.view}>
                <Text style={styles.text}>Dashboard</Text>
            </View>    


            <View style={styles.action2}>
                <CustomButton onPressFunction={onPressHandlerExpense} title="Expense Claim" style={{margin:20,width:200}}/>
                {/* <FontAwesome5
                    name={'money-check'}
                    size={30}
                    color={'#ffffff'}
                /> */}
            </View>

            <View style={styles.action2}>
                <CustomButton onPressFunction={onPressHandlerOPD} title="OPD Claim" style={{margin:20,width:200}}/>
                {/* <FontAwesome5 style={styles.plus}
                    name={'hospital-user'}
                    size={30}
                    color={'#ffffff'}
                /> */}
            </View>

            <View style={styles.action2}>
                <CustomButton onPressFunction={onPressHandlerRandR} title="RandR Claim" style={{margin:20,width:200}}/>
                {/* <FontAwesome5 style={styles.plus}
                    name={'grin-stars'}
                    size={30}
                    color={'#ffffff'}
                /> */}
            </View>

            <View style={styles.view}>
                <Pressable
                    onPress={onPressHandlerLogOut}
                    style={({ pressed }) => ({ 
                        backgroundColor: pressed ? '#ddd' : '#fff' 
                    })}
            >
                    <Text style={styles.text}>Log Out</Text>
                </Pressable>
            </View>

        </View>
    );

}

const styles = StyleSheet.create({
    body : {
      flex: 1, 
      alignItems: 'center', 
      //justifyContent: 'center',
      backgroundColor: '#fff',
    },
    text: {
      fontSize: 20,
      fontWeight: 'bold',
      margin: 10,
      color: '#000'
    },
    view:{
        margin:10,
      },
      input: {
        width: 200,
        borderWidth: 1,
        borderColor: '#555',
        borderRadius: 5,
        textAlign: 'center',
        fontSize: 20,   
      },
      
  })