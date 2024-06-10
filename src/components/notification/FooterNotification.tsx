import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const FooterNotification = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.iconAndText, styles.border]}>
        <View style={styles.iconsContainer}>
          <MaterialCommunityIcons name="cart-arrow-down" size={24} color="black" style={styles.icon} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.text}>Mua sắm ngay</Text>
        </View>
      </View>
    </View>
  );
}

export default FooterNotification;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: 70, // Điều chỉnh chiều cao của footer
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    justifyContent: 'center', // Đưa các thành phần về giữa theo chiều dọc
  },
  iconAndText: {
    flexDirection: 'column',
    alignItems: 'center', // Căn các thành phần trong iconAndText theo trục dọc
  },
  titleContainer: {
    justifyContent: 'center', // Căn chữ "Mua sắm ngay" theo chiều dọc
  },
  text: {
    textAlign: 'center',
    color: '#ebba34',
  },
  iconsContainer: {
    marginRight: 10,
  },
  icon: {
    color: '#ebba34',
  },
  border: {
    borderWidth: 2,
    borderColor: '#ebba34',
    borderRadius: 5,
  },
});
