import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { InterfaceAccountState } from '../../constant/interface';
import axios from 'axios';

const BodyNotification = () => {
  const { username } = useSelector(
    (state: InterfaceAccountState) => state.accountReducer,
  );
  console.log(username);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiURL = `https://ewamallbe.onrender.com/api/Notification/GetAllNotificationByUserId/${username}`;
        const response = await axios.get(apiURL);
        const data = response.data;
        setNotifications(data);
        console.log('Data from API:', data); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 5000); // Gọi lại fetchData mỗi 5 giây

    return () => clearInterval(intervalId); // Xóa interval khi component bị unmount
  }, [username]); // Thêm username vào mảng dependencies của useEffect để useEffect được gọi lại khi username thay đổi

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
