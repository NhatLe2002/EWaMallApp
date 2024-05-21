import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {SIZES} from '../../../constant/theme';
import {ScrollView} from 'react-native-gesture-handler';
import TitleProduct from '../../../components/product_detail/TitleProduct';
import DeliveryPrice from '../../../components/product_detail/DeliveryPrice';
import ShopInfor from '../../../components/product_detail/ShopInfor';
import {useNavigation} from '@react-navigation/native';
import ProductList from '../../../reusables/list_item/ProductList';
import SuggestProduct from '../../../components/product_detail/SuggestProduct';
import Description from '../../../components/product_detail/Description';
import RatingProduct from '../../../components/product_detail/RatingProduct';

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
    height: SIZES.height / 2.7,
    marginBottom: 3,
  },
});
