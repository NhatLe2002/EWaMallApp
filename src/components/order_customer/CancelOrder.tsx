import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { OrderAllByUserId } from '../../constant/types';
interface Props {
    item: OrderAllByUserId;
  }
const CancelOrder: React.FC<Props> = ({item}) => {
  return (
    <View>
      <Text>CancelOrder</Text>
    </View>
  );
};

export default CancelOrder;

const styles = StyleSheet.create({});
