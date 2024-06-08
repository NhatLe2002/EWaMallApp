import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { OrderAllByUserId } from '../../constant/types';
interface Props {
    item: OrderAllByUserId;
  }
const WaitingOrder:React.FC<Props> = ({item}) => {
  return (
    <View>
      <Text>WaitingOrder</Text>
    </View>
  );
};

export default WaitingOrder;

const styles = StyleSheet.create({});
