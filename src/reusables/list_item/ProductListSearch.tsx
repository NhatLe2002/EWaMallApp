import { FlatList, StyleSheet, View, Image, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS } from '../../constant/theme';
import { SIZES } from '../../constant/theme';
import Feather from 'react-native-vector-icons/Feather';
import { productsListFormatted } from '../../data/Product';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from '../../redux/slice/productSlice';
import { InterfaceProductState } from '../../constant/interface';
import { Product } from '../../constant/types';
import { formatPriceToVND } from '../../config/FixPrice';
import { updateProductListWithImages } from '../../features/GetImage';

type ProductTypes = {
  products: Product[]
};
const ProductListSearch = (props: ProductTypes) => {
  const [updatedProductList, setUpdatedProductList] = useState<Product[]>([]);
  console.log(props.products)
  const navigation = useNavigation<any>();
  useEffect(() => {
    const fetchProductImages = async () => {
      const updatedList = await updateProductListWithImages(props.products);
      setUpdatedProductList(updatedList);
    };

    fetchProductImages();
  }, [props.products]);

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.product}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ProductDetail', { productId: item.id });
        }}>
        <Image
          style={styles.image}
          source={{
            uri: item.imageUrl ? String(item.imageUrl) : 'defaultImageUrl',
          }}
        />
        <View style={styles.containter}>
          <Text style={styles.nameProduct} numberOfLines={2}>
            {item.productName}
          </Text>
          <View style={styles.subContainer}>
            {/* Thêm Field */}
            <Text style={styles.price}>{formatPriceToVND(item?.minPrice)}</Text>
            {/* <Text style={styles.sold}> Đã bán {item.sold}</Text> */}
          </View>
          <View style={styles.subAddressContainer}>
            <Feather name="map-pin" size={14} color="#B9B9B9" />
            <Text style={styles.address}>{item?.sellerAddress}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
    
  );

  return (
    <>
      <FlatList
        style={{ backgroundColor: COLORS.background_list }}
        data={updatedProductList}
        scrollEnabled={false}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
      />
    </>
  );
};

export default ProductListSearch;

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: '5%',
  },
  product: {
    flex: 1,
    margin: 5,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.border_product,
    shadowOffset: { width: 4, height: 4 },
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
    color: COLORS.gray_2,
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
