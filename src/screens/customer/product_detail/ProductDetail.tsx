import {Image, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {SIZES} from '../../../constant/theme';
import {ScrollView} from 'react-native-gesture-handler';
import TitleProduct from '../../../components/product_detail/TitleProduct';
import DeliveryPrice from '../../../components/product_detail/DeliveryPrice';
import ShopInfor from '../../../components/product_detail/ShopInfor';
import {useNavigation} from '@react-navigation/native';
import ProductList from '../../../reusables/list_item/ProductList';
import SuggestProduct from '../../../components/product_detail/SuggestProduct';

const ProductDetail = () => {
  const navigation = useNavigation();
  const [interraction, setInteraction] = useState(false);
  return (
    <>
      <ScrollView style={styles.container}>
        <View>
          <Image
            source={{uri: 'https://picsum.photos/200/300?random=1'}}
            style={styles.image}
          />
        </View>
        <TitleProduct />
        <DeliveryPrice />
        <ShopInfor />
        <SuggestProduct />
        <ProductList />
      </ScrollView>
    </>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#dcdcdc',
  },
  image: {
    width: '100%',
    height: SIZES.height / 3,
    marginBottom: 3,
  },
});
