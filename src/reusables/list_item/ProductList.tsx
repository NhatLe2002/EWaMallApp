import {FlatList, StyleSheet, View, Image, Text} from 'react-native';
import React from 'react';
import {COLORS} from '../../constant/theme';
import {SIZES} from '../../constant/theme';
import Feather from 'react-native-vector-icons/Feather';
import {productsListFormatted} from '../../data/Product';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
type ProductTypes = {
  id: number;
  name: string;
  imgUrl: string;
  price: string;
  address: string;
  sold: number;
  sales: number;
};
const ProductList = () => {
  const navigation = useNavigation();
  const renderItem = ({item}: {item: ProductTypes}) => (
    <View style={styles.product}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ProductDetail' as never);
        }}>
        <Image style={styles.image} source={{uri: item.imgUrl}} />
        <View style={styles.containter}>
          <Text style={styles.nameProduct} numberOfLines={2}>
            {item.name}
          </Text>
          <View style={styles.subContainer}>
            <Text style={styles.price}>{item.price}</Text>
            <Text style={styles.sold}> Đã bán {item.sold}</Text>
          </View>
          <View style={styles.subAddressContainer}>
            <Feather name="map-pin" size={14} color="#B9B9B9" />
            <Text style={styles.address}>{item.address}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <FlatList
        style={{backgroundColor: COLORS.background_list}}
        data={productsListFormatted}
        scrollEnabled={false}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
      />
    </>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: '5%',
  },
  product: {
    flex: 1,
    margin: 10,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.border_product,
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 0.6,
    shadowRadius: 5,
  },
  image: {
    width: '100%',
    height: SIZES.height / 5,
  },
  containter: {
    padding: '5%',
  },
  nameProduct: {
    fontSize: 14,
  },
  subContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: '5%',
  },
  price: {
    fontSize: 16,
    color: COLORS.price,
  },
  sold: {
    fontSize: 12,
    color: '#565656',
  },
  address: {
    fontSize: 12,
    color: '#B9B9B9',
  },
  subAddressContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});
