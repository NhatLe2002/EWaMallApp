// import React, {useEffect} from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import {useSelector} from 'react-redux';
// import BottomTabNavigation from './src/navigator/BottomTabNavigation';
// import {InterfaceAccountState} from './src/constant/interface';
// import UnAuthNavigator from './src/navigator/UnAuthNavigator';
// import AuthNavigator from './src/navigator/AuthNavigator';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import PushNotification from 'react-native-push-notification';
// const Stack = createNativeStackNavigator();
// const App: React.FC = () => {
//   const {isLogin} = useSelector(
//     (state: InterfaceAccountState) => state.accountReducer,
//   );

//   return (
//     <NavigationContainer>
//       {!isLogin ? <UnAuthNavigator /> : <AuthNavigator />}
//     </NavigationContainer>
//   );
// };

// export default App;
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import BottomTabNavigation from './src/navigator/BottomTabNavigation';
import { InterfaceAccountState } from './src/constant/interface';
import UnAuthNavigator from './src/navigator/UnAuthNavigator';
import AuthNavigator from './src/navigator/AuthNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PushNotification from 'react-native-push-notification';
import { Platform } from 'react-native';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  const { isLogin } = useSelector(
    (state: InterfaceAccountState) => state.accountReducer,
  );

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
  }, []);

  return (
    <NavigationContainer>
      {!isLogin ? <UnAuthNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default App;
