import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../constant/theme';

interface DiscountItemProps {
  title: string;
  conditions: string;
  description: string;
}

const DiscountItem: React.FC<DiscountItemProps> = ({ title, conditions, description }) => {
  const navigation = useNavigation();
  const label = title.toLowerCase().includes('freeship') ? 'Mã vận chuyển' : 'EWAMALL';
  const labelStyle = title.toLowerCase().includes('freeship') ? styles.labelTransport : styles.labelMall;

  const handlePress = () => {
    navigation.navigate('Home'as never); // Điều hướng về trang Home
  };

  return (
    <View style={styles.container}>
      <View style={styles.newLabelContainer}>
        <Text style={styles.newLabelText}>Mới!</Text>
      </View>
      <View style={styles.leftContainer}>
        <Text style={labelStyle}>{label}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.conditions}>{conditions}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={styles.rightContainer}>
        <TouchableOpacity onPress={handlePress} style={styles.button}>
          <Text style={styles.buttonText}>Dùng sau</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    padding: 10,
    marginVertical: 5, // Giảm khoảng trống giữa các phần tử
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    borderLeftWidth: 5,
    borderLeftColor: '#008f68',
  },
  newLabelContainer: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: COLORS.yellowMain, // Sử dụng màu vàng từ COLORS
    paddingHorizontal: 3,
    paddingVertical: 2,
    borderRadius: 3,
  },
  newLabelText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  leftContainer: {
    flex: 2,
    paddingRight: 10,
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  labelTransport: {
    fontSize: 14,
    color: '#008f68', // Màu xanh cho "Mã vận chuyển"
    fontWeight: 'bold',
    marginBottom: 5,
  },
  labelMall: {
    fontSize: 14,
    color: '#FFB74D', // Màu vàng sáng pha cam cho "EWAMALL"
    fontWeight: 'bold',
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555', // Màu xám đậm hơn
  },
  conditions: {
    fontSize: 12,
    color: '#666',
  },
  description: {
    fontSize: 12,
    color: COLORS.yellowMain, // Sử dụng màu vàng từ COLORS
    marginVertical: 5,
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderColor: COLORS.yellowMain, // Sử dụng màu vàng từ COLORS
    borderWidth: 1,
    borderRadius: 5,
  },
  buttonText: {
    color: COLORS.yellowMain, // Sử dụng màu vàng từ COLORS
    textAlign: 'center',
    fontSize: 14,
  },
});

export default DiscountItem;
