import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import BottomTabNavigation from './BottomTabNavigation';
const Stack = createNativeStackNavigator();
const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="BottomTab"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="BottomTab" component={BottomTabNavigation} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
