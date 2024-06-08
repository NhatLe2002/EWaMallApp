import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { OrderAllByUserId } from '../../constant/types';
interface Props {
    item: OrderAllByUserId;
  }
const PendingOrder: React.FC<Props> = ({item}) => {
    console.log("object",item?.totalCost)
  return (
    <View style={styles.container}>
      <Text>{item?.totalCost}</Text>
    </View>
  );
};

export default PendingOrder;

const styles = StyleSheet.create({
    container:{
        flex:1
    }
});
