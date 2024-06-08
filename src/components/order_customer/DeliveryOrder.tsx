import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { OrderAllByUserId } from '../../constant/types';
interface Props {
  item: OrderAllByUserId;
}
const DeliveryOrder: React.FC<Props> = ({item}) => {
  return (
    <View>
      <Text>DeliveryOrder</Text>
    </View>
  );
};

export default DeliveryOrder;

const styles = StyleSheet.create({});
