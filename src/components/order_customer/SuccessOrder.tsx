import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {OrderAllByUserId} from '../../constant/types';
interface Props {
  item: OrderAllByUserId;
}
const SuccessOrder: React.FC<Props> = ({item}) => {
  return (
    <View>
      <Text>SuccessOrder</Text>
    </View>
  );
};

export default SuccessOrder;

const styles = StyleSheet.create({});
