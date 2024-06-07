import React from 'react';
import { View, Text } from 'react-native';
import { Cart, CartProductTypes, ProductTypes } from '../../constant/types';


interface Props {
  item: CartProductTypes; // Định nghĩa props item kiểu ProductTypes
}

const Repurchase: React.FC<Props> = ({item}) => {
  return (
    <View>
      {/* <Text>{item.nameShop}</Text>
      <Text>{item.id}</Text> */}
    </View>
  );
};

export default Repurchase;

