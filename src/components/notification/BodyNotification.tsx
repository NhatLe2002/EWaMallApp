import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { InterfaceAccountState, InterfaceNotification } from '../../constant/interface';
import axios from 'axios';
import { setNewNotificationReceived } from '../../redux/slice/notificationSlice';
import Feather from 'react-native-vector-icons/Feather';

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
  const [iconColors, setIconColors] = useState<string[]>([]); // State để lưu trữ màu của mỗi thông báo

  const fetchData = async () => {
    try {
      const apiURL = `https://ewamallbe.onrender.com/api/Notification/GetAllNotificationByUserId/${username}`;
      const response = await axios.get(apiURL);
      const data: Notification[] = response.data;
      setNotifications(data);

      // Tạo màu sắc cho các thông báo
      const newIconColors = data.map((notification) => getIconColor(notification.title));
      setIconColors(newIconColors);
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
  }, [username, newNotificationReceived]); // Dependencies

  const getIconName = (title: string) => {
    switch (title) {
      case 'Mở kênh người bán':
        return 'bell';
      case 'Ưu đãi mới':
        return 'gift';
      case 'Thông tin Tài chính':
        return 'dollar-sign';
      case 'Cập nhật tính năng mới':
        return 'refresh-cw';
      case 'EWaMall Xin chào tất cả quý khách':
        return 'award';
      default:
        return 'package';
    }
  };

  const mainYellow = '#E9BB45'; // Màu mainYellow (vàng)
  const lightBrown = '#A52A2A'; // Màu nâu sáng
  const orange = '#ff8c00'; // Màu vàng cam
  const blue = '#1e90ff'; // Màu xanh dương

  const getIconColor = (title: string) => {
    switch (title) {
      case 'Mở kênh người bán':
        return orange; // Màu cam cho bell
      case 'Ưu đãi mới':
        return blue; // Màu xanh dương cho gift
      case 'Cập nhật tính năng mới':
        return lightBrown; // Màu nâu sáng cho refresh
      case 'EWaMall Xin chào tất cả quý khách':
        return mainYellow; // Màu mainYellow cho award
      default:
        return orange; // Màu vàng cam cho các thông báo khác
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {notifications.map((notification, index) => (
          <View style={styles.notificationItem} key={index}>
            <View style={styles.iconContainer}>
              <Feather name={getIconName(notification.title)} size={24} color={iconColors[index]} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.notificationTitle} numberOfLines={1}>
                {notification.title}
              </Text>
              <Text style={styles.notificationMessage}>{notification.message}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export default BodyNotification;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: 'white',
    flex: 1, // Đảm bảo phần body chiếm không gian còn lại
  },
  scrollView: {
    paddingBottom: 10,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5, // Giảm khoảng cách giữa các thông báo
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 5, // Giảm phần đệm trên và dưới
  },
  iconContainer: {
    width: 30, // Giảm kích thước biểu tượng
    height: 30, // Giảm kích thước biểu tượng
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 14, // Giảm kích thước font của tiêu đề
    fontWeight: 'bold',
    marginBottom: 2,
    width: '100%',
    color: 'black', // Màu sắc tiêu đề
  },
  notificationMessage: {
    fontSize: 12, // Giảm kích thước font của tin nhắn
    color: '#888', // Màu sắc tin nhắn
  },
});
