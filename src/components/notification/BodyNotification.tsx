import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';

const BodyNotification = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {Array(12).fill(null).map((_, index) => (
          <View style={styles.notificationItem} key={index}>
            <Text style={styles.notificationTitle} numberOfLines={1}>
              {index % 3 === 0 ? "Đơn hàng của bạn đã được giao" : index % 3 === 1 ? "Khuyến mãi đặc biệt: Giảm 50% cho đơn hàng mới" : "Mời bạn tham gia chương trình 'Mua hàng cùng bạn bè, nhận ngay quà'"}
            </Text>
            <Text style={styles.notificationTime}>{index % 3 === 0 ? "1 giờ trước" : index % 3 === 1 ? "2 giờ trước" : "Hôm qua"}</Text>
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

     // Khi gắn api
// const BodyNotification = () => {
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     // Giả sử đây là URL của API của bạn
//     const apiURL = 'https://api.example.com/notifications';

//     // Hàm lấy dữ liệu từ API
//     const fetchData = async () => {
//       try {
//         const response = await fetch(apiURL);
//         const data = await response.json();
//         setNotifications(data); // Cập nhật state với dữ liệu từ API
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollView}>
//         {notifications.map((notification, index) => (
//           <View style={styles.notificationItem} key={index}>
//             <Text style={styles.notificationTitle} numberOfLines={1}>
//               {notification.title}
//             </Text>
//             <Text style={styles.notificationTime}>{notification.time}</Text>
//           </View>
//         ))}
//       </ScrollView>
//     </View>
//   );
// }