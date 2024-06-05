import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../constant/theme';

interface DiscountItemProps {
  title: string;
  conditions: string;
  code: string;
}

const DiscountItem: React.FC<DiscountItemProps> = ({ title, conditions, code }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.conditions}>{conditions}</Text>
      </View>
      <TouchableOpacity style={styles.right}>
        <Text style={styles.code}>{code}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    marginVertical: 8,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  left: {
    flex: 3,
  },
  right: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  title: {
    color: COLORS.black,
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
  },
  conditions: {
    color: COLORS.secondary,
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
  },
  code: {
    color: COLORS.primary,
    fontSize: 14,
    fontFamily: 'Roboto-Bold',
  },
});

export default DiscountItem;
