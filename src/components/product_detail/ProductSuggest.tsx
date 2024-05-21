import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {COLORS, SIZES} from '../../constant/theme';
import {Icon} from 'react-native-elements';

interface Item {
  imgUrl: string;
  name: string;
  price: string;
  sold: number;
  address: string;
}

const Product: React.FC<Item> = ({imgUrl, name, price, sold}: Item) => {
  const navigation = useNavigation();

  return (
    <View style={styles.product}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ProductDetail' as never);
        }}>
        <View style={styles.image}>
          <Image
            style={{
              width: '96%',
              height: '96%',
            }}
            source={{uri: imgUrl}}
          />
        </View>

        <View style={styles.containter}>
          <Text style={styles.nameProduct} numberOfLines={2}>
            {name}
          </Text>
          <Text style={styles.price}>{price}</Text>
          <View style={{flexDirection: 'row'}}>
            <Icon name="grade" color="#EAC452" size={12} />
            <Icon name="grade" color="#EAC452" size={12} />
          </View>
          <Text style={styles.sold}> Đã bán {sold}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  product: {
    borderRadius: 8,
    width: SIZES.width / 3,
    marginRight: '1%',
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: '60%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containter: {
    padding: '5%',
  },
  nameProduct: {
    fontSize: 11,
    paddingBottom: '3%',
    color: '#7d7769',
  },
  subContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: '5%',
  },
  price: {
    fontSize: 12,
    color: COLORS.price,
  },
  sold: {
    fontSize: 10,
    color: '#565656',
  },
});
