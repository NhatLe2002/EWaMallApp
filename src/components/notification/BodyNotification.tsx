import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { InterfaceAccountState, InterfaceNotification } from '../../constant/interface';
import axios from 'axios';
import { setNewNotificationReceived } from '../../redux/slice/notificationSlice';

// Define the notification interface
interface Notification {
  title: string;
  message: string;
}

const BodyNotification = () => {
  const { username } = useSelector(
    (state: InterfaceAccountState) => state.accountReducer,
  );

  const { newNotificationReceived } = useSelector(
    (state: InterfaceNotification) => state.notificationReducer,
  );

  const dispatch = useDispatch();

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [dataFetched, setDataFetched] = useState(false); // State để đánh dấu đã fetch data lần đầu tiên

  const fetchData = async () => {
    try {
      const apiURL = `https://ewamallbe.onrender.com/api/Notification/GetAllNotificationByUserId/${username}`;
      const response = await axios.get(apiURL);
      const data: Notification[] = response.data;
      setNotifications(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      dispatch(setNewNotificationReceived(false));
      setDataFetched(true); // Đánh dấu rằng dữ liệu đã được fetch lần đầu tiên
    }
  };

  useEffect(() => {
    if (!dataFetched) {
      fetchData(); // Fetch data lần đầu tiên nếu chưa fetch
    }
    if (username && newNotificationReceived) {
      fetchData(); // Fetch data khi có thông báo mới
    }
  }, [username, newNotificationReceived, dataFetched]); // Dependencies

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {notifications.map((notification, index) => (
          <View style={styles.notificationItem} key={index}>
            <Text style={styles.notificationTitle} numberOfLines={1}>
              {notification.title}
            </Text>
            <Text style={styles.notificationTime}>{notification.message}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export default BodyNotification;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
    height: '80%',
  },
  scrollView: {
    paddingBottom: 10,
  },
  notificationItem: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    height: 60,
    justifyContent: 'center',
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    width: '100%',
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
});
