import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import BottomTabNavigation from './src/navigator/BottomTabNavigation';
import {InterfaceAccountState} from './src/constant/interface';
import UnAuthNavigator from './src/navigator/UnAuthNavigator';
import AuthNavigator from './src/navigator/AuthNavigator';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import storageService from './src/api/storageService';
import {
  setIsLogin,
  setRole,
  setUserId,
  setUsername,
} from './src/redux/slice/accountSlice';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  const dispatch = useDispatch();
  const {isLogin, userId} = useSelector(
    (state: InterfaceAccountState) => state.accountReducer,
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const role = await storageService.getRole();
        const id = await storageService.getId();
        const name = await storageService.getUserName();
        if (role) {
          dispatch(setIsLogin(true));
          dispatch(setRole(role));
          dispatch(setUsername(name));
          dispatch(setUserId(id));
        }
      } catch (error) {
        console.error('Failed to fetch data from storage', error);
      }
    };

    fetchData();
  }, []);

  return (
    <NavigationContainer>
      {!isLogin ? <UnAuthNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default App;
