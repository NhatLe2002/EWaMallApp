// import { useEffect, useRef, useState } from 'react';
// import * as signalR from '@microsoft/signalr';
// import PushNotification from 'react-native-push-notification';
// import { useDispatch, useSelector } from 'react-redux';
// import { InterfaceNotification } from '../constant/interface';
// import { setNewNotificationReceived } from '../redux/slice/notificationSlice';



// const SetSignalR = (username: string | undefined, roleId: number | undefined, connection : React.MutableRefObject<signalR.HubConnection | null> ) => {

//   const dispatch = useDispatch();
//   const { newNotificationReeived } = useSelector((state: InterfaceNotification) => state.notificationReducer);

//     if (username && roleId) {
//       connection.current = new signalR.HubConnectionBuilder()
//         .withUrl("https://ewamallbe.onrender.com/notificationHub", {
//           skipNegotiation: true,
//           transport: signalR.HttpTransportType.WebSockets
//         })
//         .build();

//       const startConnection = async () => {
//         try {
//           await connection.current?.start();
//           console.log("Connected to NotificationHub");
//           await connection.current?.invoke("SaveUserConnection", username, roleId);

//           connection.current?.on("ReceivedNotification", (title, message) => {
//             console.log("Nhận thông báo:", title, message);
//             PushNotification.localNotification({
//               channelId: "general_notifications",
//               title: title,
//               message: message,
//             });
//             dispatch(setNewNotificationReceived(true)); // Đánh dấu có thông báo mới được nhận
//           });

//           connection.current?.on("ReceivedPersonalNotification", (title, message) => {
//             console.log("Nhận thông báo cá nhân:", title, message);
//             PushNotification.localNotification({
//               channelId: "general_notifications",
//               title: title,
//               message: message,
//             });
//             dispatch(setNewNotificationReceived(true)); // Đánh dấu có thông báo mới được nhận
//           });
//         } catch (error) {
//           console.error("SignalR Connection Error: ", error);
//         }
//       };

//       startConnection();

//       return () => {
//         connection.current?.stop().then(() => console.log("Disconnected from NotificationHub"));
//       };
//     }
// };

// export default SetSignalR;

import * as signalR from '@microsoft/signalr';
import PushNotification from 'react-native-push-notification';
import { Dispatch } from 'redux';
import { setNewNotificationReceived } from '../redux/slice/notificationSlice';

const SetSignalR = (
  username: string | undefined, 
  roleId: number | undefined, 
  connection: React.MutableRefObject<signalR.HubConnection | null>, 
  dispatch: Dispatch
) => {

  if (username && roleId) {
    connection.current = new signalR.HubConnectionBuilder()
      .withUrl("https://ewamallbe.onrender.com/notificationHub", {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .build();

    const startConnection = async () => {
      try {
        await connection.current?.start();
        console.log("Connected to NotificationHub");
        await connection.current?.invoke("SaveUserConnection", username, roleId);

        connection.current?.on("ReceivedNotification", (title, message) => {
          console.log("Nhận thông báo:", title, message);
          PushNotification.localNotification({
            channelId: "general_notifications",
            title: title,
            message: message,
          });
          dispatch(setNewNotificationReceived(true)); // Đánh dấu có thông báo mới được nhận
        });

        connection.current?.on("ReceivedPersonalNotification", (title, message) => {
          console.log("Nhận thông báo cá nhân:", title, message);
          PushNotification.localNotification({
            channelId: "general_notifications",
            title: title,
            message: message,
          });
          dispatch(setNewNotificationReceived(true)); // Đánh dấu có thông báo mới được nhận
        });
      } catch (error) {
        console.error("SignalR Connection Error: ", error);
      }
    };

    startConnection();

    return () => {
      connection.current?.stop().then(() => console.log("Disconnected from NotificationHub"));
    };
  }
};

export default SetSignalR;
