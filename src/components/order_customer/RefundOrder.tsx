import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {OrderAllByUserId} from '../../constant/types';
interface Props {
  item: OrderAllByUserId;
}
const RefundOrder: React.FC<Props> = ({item}) => {
  return (
    <View>
      <Text>RefundOrder</Text>
    </View>
  );
};

export default RefundOrder;

const styles = StyleSheet.create({});
