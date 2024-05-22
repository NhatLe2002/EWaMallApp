import {Image, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, SIZES} from '../../../constant/theme';
import {ScrollView} from 'react-native-gesture-handler';
import TitleProduct from '../../../components/product_detail/TitleProduct';
import DeliveryPrice from '../../../components/product_detail/DeliveryPrice';
import ShopInfor from '../../../components/product_detail/ShopInfor';
import {useNavigation, useRoute} from '@react-navigation/native';
import ProductList from '../../../reusables/list_item/ProductList';
import SuggestProduct from '../../../components/product_detail/SuggestProduct';
import HeaderSearch from '../../../components/product_detail/HeaderSearch';
import FooterProductDetail from '../../../components/product_detail/FooterProductDetail';
import {useDispatch, useSelector} from 'react-redux';
import {getProductById} from '../../../redux/slice/productSlice';
import {InterfaceProductState} from '../../../constant/interface';

const ProductDetail = () => {
  const route = useRoute<any>();
  const {productId} = route.params;
  const {product} = useSelector(
    (state: InterfaceProductState) => state.productReducer,
  );
  console.log(productId)
  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(getProductById(productId));
  }, []);
  const productFormat = product.length > 0 ? product[0] : null;
  return (
    <View style={styles.container}>
      <HeaderSearch />
      <ScrollView style={styles.content}>
        <View>
          <Image
            source={{uri: 'https://picsum.photos/200/300?random=1'}}
            style={styles.image}
          />
        </View>
        <TitleProduct productName={productFormat.productName} price={productFormat.price} />
        <DeliveryPrice />
        <ShopInfor />
        <SuggestProduct />
        <ProductList />
      </ScrollView>
      <FooterProductDetail />
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  content: {
    backgroundColor: COLORS.background_list,
  },
  image: {
    width: '100%',
    height: SIZES.height / 3,
    marginBottom: 3,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative',
  },
});
