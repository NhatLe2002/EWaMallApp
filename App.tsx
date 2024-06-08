import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {useDispatch, useSelector } from 'react-redux';
import BottomTabNavigation from './src/navigator/BottomTabNavigation';
import { InterfaceAccountState } from './src/constant/interface';
import UnAuthNavigator from './src/navigator/UnAuthNavigator';
import AuthNavigator from './src/navigator/AuthNavigator';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PushNotification from 'react-native-push-notification';
import { Platform } from 'react-native';

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
        // storageService.removeInfo()
      } catch (error) {
        console.error('Failed to fetch data from storage', error);
      }
    };

    fetchData();
  }, [isLogin]);

  useEffect(() => {
    // Cấu hình Push Notification
    PushNotification.configure({
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
        // process the notification
        
      },
      requestPermissions: Platform.OS === 'ios',
    });

    // Tạo kênh thông báo
    PushNotification.createChannel(
      {
        channelId: "general_notifications", // ID của kênh
        channelName: "General Notifications", // Tên của kênh
        channelDescription: "A channel to categorise your notifications", // Mô tả của kênh
        soundName: "default", // Âm thanh mặc định
        importance: 4, // Độ quan trọng của thông báo
        vibrate: true, // Cho phép rung
      },
      (created) => console.log(`createChannel returned '${created}'`) // Xác nhận kênh được tạo thành công
    );
  }, [isLogin]);

  return (
    <NavigationContainer>
      {!isLogin ? <UnAuthNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default App;
