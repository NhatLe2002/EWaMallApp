import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, SIZES} from '../../../constant/theme';
import {ScrollView} from 'react-native-gesture-handler';
import TitleProduct from '../../../components/product_detail/TitleProduct';
import DeliveryPrice from '../../../components/product_detail/DeliveryPrice';
import ShopInfor from '../../../components/product_detail/ShopInfor';
import {useNavigation, useRoute} from '@react-navigation/native';
import ProductList from '../../../reusables/list_item/ProductList';
import SuggestProduct from '../../../components/product_detail/SuggestProduct';
import Description from '../../../components/product_detail/Description';
import RatingProduct from '../../../components/product_detail/RatingProduct';
import HeaderSearch from '../../../components/product_detail/HeaderSearch';
import FooterProductDetail from '../../../components/product_detail/FooterProductDetail';
import {useDispatch, useSelector} from 'react-redux';

import {InterfaceProductState} from '../../../constant/interface';
import { getProductById } from '../../../redux/slice/productSlice';


const ProductDetail = () => {
  const route = useRoute<any>();
  const {productId} = route.params;
  const {product} = useSelector(
    (state: InterfaceProductState) => state.productReducer,
  );
  console.log(productId);
  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(getProductById(productId));
  }, []);
  const productFormat = product && product.length > 0 ? product[0] : null;
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
        <TitleProduct
          productName={productFormat?.productName}
          price={productFormat?.price}
        />
        <DeliveryPrice />
        <ShopInfor />
        <SuggestProduct />
        <Description description="Hom nay la mot nay dep troi nen la hay mua toi di! Chan thanh va cam on <3" />
        <RatingProduct />
        <View>
          <Text
            style={{
              backgroundColor: 'white',
              height: '4%',
              fontSize: 16,
              color: 'black',
              paddingTop: 5,
              fontWeight: '600',
              paddingHorizontal: '4%',
              marginTop: 5,
            }}>
            Có thể bạn cũng thích
          </Text>
          <ProductList />
        </View>
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
    height: SIZES.height / 2.7,
    marginBottom: 3,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative',
  },
});
