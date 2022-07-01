import * as React from 'react';
import { View, Text, StyleSheet,Pressable,TextInput,Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './Home_Screen';


const Stack = createNativeStackNavigator();

export default function WelcomeScreen({navigation}) {
    return (
        <NavigationContainer independent={true}>
  
        <Stack.Navigator
            screenOptions = {{
            header: () => null
            }}
        >
            <Stack.Screen 
                name="Home" 
                component={HomeScreen} 
            />


            
             {/* <Stack.Screen
                name="Claim a new OPD"
                component={Add_OPD}
            /> */}
            {/*<Stack.Screen
                name="Add new R And R"
                component={AddNew_RAndR}
            />
            <Stack.Screen
                name="Edit"
                component={AddNewE_Claim2}
            /> */}

           


  
        </Stack.Navigator>
  
      </NavigationContainer>
    );
    
}



