import React from 'react';
import 'react-native-gesture-handler'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabNavigation from './src/navigator/BottomTabNavigation';
import LoginScreen from './src/screens/customer/login/LoginScreen';
import SellerHome from './src/screens/sellser/home/SellerHome';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="BottomNav" component={BottomTabNavigation} />
        <Stack.Screen name="Login" component={LoginScreen} />



        {/* seller navigate */}
        <Stack.Screen name="SellerHome" component={SellerHome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
