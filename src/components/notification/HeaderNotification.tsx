import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const HeaderNotification = () => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.text}>Thông báo</Text>
      </View>
      <View style={styles.iconsContainer}>
        <Icon name="cart" size={24} color="black" style={styles.icon} />
        <Icon name="mail" size={24} color="black" style={styles.icon} />
      </View>
    </View>
  );
}

export default HeaderNotification;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: 50,
    borderBottomWidth: 10,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  titleContainer: {
    flex: 1, // Chia tỉ lệ của không gian sẵn có cho text
    justifyContent: 'center', // Căn giữa theo chiều ngang
    paddingLeft : 50 // Dịch chữ "Thông báo" qua phải
  },
  text: {
    fontSize: 18,
    color: "black",
    textAlign: 'center',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
    color: "#ebba34"
  },
});
