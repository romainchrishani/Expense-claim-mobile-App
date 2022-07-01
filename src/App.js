import * as React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LoginScreen from './Screens/Front-Screens/Login_Screen';
import SignUpScreen from './Screens/Front-Screens/SignUp_Screen';
import ForgetPass1Screen from './Screens/Front-Screens/ForgetPass1_Screen';
import ForgetPass2Screen from './Screens/Front-Screens/ForgetPass2_Screen';
import AdminScreen from './Screens/Claims/Admin/AdminScreen';
import RAndRAdmin from './Screens/Claims/Admin/RAndRAdmin';
import GiveNewRAndR from './Screens/Claims/Admin/GiveNewRAndR';
import UserScreen from './Screens/Claims/User/UserScreen';
import Expense_Claim from './Screens/Claims/User/Expense Claim/ExpenseClaim';
import AddNewE_Claim from './Screens/Claims/User/Expense Claim/AddNewEC';
import AddNewE_Claim2 from './Screens/Claims/User/Expense Claim/AddNewEC2';
import OPD from './Screens/Claims/User/OPD/OPD';
import Add_OPD2 from './Screens/Claims/User/OPD/AddNewOPD2';
import Add_OPD from './Screens/Claims/User/OPD/AddNewOPD';
import RAndR from './Screens/Claims/User/R&R/R&R';
import AddNew_RAndR from './Screens/Claims/User/R&R/AddNewR&R';
import AddNew_RAndR2	 from './Screens/Claims/User/R&R/AddNewR&R2';
import ViewEBill from './Screens/Claims/User/Expense Claim/ExpenseBillDetails';
import ManagerScreen from './Screens/Claims/Manager/ManagerScreen';
import EmployeeDetails from './Screens/Claims/Manager/EmployeeDetails';
import Expense_Claim_Manager from './Screens/Claims/Manager/ExpenseClaimManager';
import OPD_Manager from './Screens/Claims/Manager/OPDManager';
import RAndRManager from './Screens/Claims/Manager/RAndRManager';
import AddEBill from './Screens/Claims/User/Expense Claim/ExpenseBillUpload';
import EBillEdit from './Screens/Claims/User/Expense Claim/EBillEdit';
import EBillManager from './Screens/Claims/Manager/ExpenseBillManager';
import RAndRBillManager from './Screens/Claims/Manager/RAndRBillManager';
import ViewRRBill from './Screens/Claims/User/R&R/RRBillDetails';
import AddRRBill from './Screens/Claims/User/R&R/RRBillUpload';
import RRBillEdit from './Screens/Claims/User/R&R/RRBillEdit';


const Stack = createNativeStackNavigator();

function App() {
  return (
    // <NavigationContainer independent={true}>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: () => null,
        }}>
        <Stack.Screen
          name="Screen-Login"
          component={LoginScreen}
          // options = {{
          //   header: () => null
          // }}
        />

        <Stack.Screen name="Screen-SignUp" component={SignUpScreen} />

        {/* Stack.Screen name="Screen-Welcome" component={Home} /> */}

        <Stack.Screen name="Screen-ForgetPass1" component={ForgetPass1Screen} />
        <Stack.Screen name="Screen-ForgetPass2" component={ForgetPass2Screen} />
        <Stack.Screen name="AdminScreen" component={AdminScreen} />
        <Stack.Screen name="UserScreen" component={UserScreen} />     
        <Stack.Screen name="Expense Claim" component={Expense_Claim} />
        <Stack.Screen name="Add a new claim" component={AddNewE_Claim} />
        <Stack.Screen name="Edit EC" component={AddNewE_Claim2} />
        <Stack.Screen name="Edit" component={AddNewE_Claim2} />
        <Stack.Screen name="OPD" component={OPD} />        
        <Stack.Screen name="Claim a new OPD" component={Add_OPD} />
        <Stack.Screen name="Edit OPD" component={Add_OPD2} />
        <Stack.Screen name="Reward And Recognition" component={RAndR} />
        <Stack.Screen name="Edit RR" component={AddNew_RAndR2} />
        <Stack.Screen name="Add new R And R" component={AddNew_RAndR} />
        <Stack.Screen name="Add expense bill" component={AddEBill} />
        <Stack.Screen name="Expense bill details" component={ViewEBill} />
        <Stack.Screen name="ManagerScreen" component={ManagerScreen} />
        <Stack.Screen name="ECManager" component={Expense_Claim_Manager} />
        <Stack.Screen name="OPDManager" component={OPD_Manager} />
        <Stack.Screen name="Reward And Recognition Manager" component={RAndRManager} />
        <Stack.Screen name="Employee Details" component={EmployeeDetails} />
        <Stack.Screen name="Reward And Recognition Admin" component={RAndRAdmin} />
        <Stack.Screen name="Give new R And R" component={GiveNewRAndR} />
        <Stack.Screen name="Edit EBill" component={EBillEdit} />
        <Stack.Screen name="Expense bill manager" component={EBillManager} />
        <Stack.Screen name="RAndR bill manager" component={RAndRBillManager} />
        <Stack.Screen name="Edit RRBill" component={RRBillEdit} />
        <Stack.Screen name="RR bill details" component={ViewRRBill} />
        <Stack.Screen name="Add RR bill" component={AddRRBill} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Tab = createBottomTabNavigator();

function Home({navigation}) {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, size, color}) => {
            let iconName;

            if (route.name === 'Screen-Notifications') {
              iconName = 'bell';
              size = focused ? 25 : 20;
            } else if (route.name === 'Screen-Welcome') {
              iconName = 'house';
              size = focused ? 25 : 20;
            } else if (route.name === 'Screen-Settings') {
              iconName = 'fa-solid fa-gear';
              size = focused ? 25 : 20;
            }

            return <FontAwesome5 name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#f0f',
          inactiveTintColor: '#555',
          activeBackgroundColor: '#999',
          inactiveBackgroundColor: '#fff',
          showLabel: false,
          labelStyle: {fontSize: 14},
        }}>
        <Tab.Screen name="Screen-Welcome" component={WelcomeScreen} />
        <Tab.Screen
          name="Screen-Notifications"
          component={NotificationScreen}
        />

        <Tab.Screen name="Screen-Settings" component={SettingScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
export default App;
