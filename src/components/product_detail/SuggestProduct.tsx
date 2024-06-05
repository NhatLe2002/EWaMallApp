import {StyleSheet, Text, View, VirtualizedList} from 'react-native';
import React from 'react';
import {SIZES} from '../../constant/theme';
import {productsListFormatted} from '../../data/Product';
import Product from './ProductSuggest';

type ProductTypes = {
  id: number;
  name: string;
  imgUrl: string;
  price: string;
  address: string;
  sold: number;
  sales: number;
  rate: number;
};

const SuggestProduct = () => {
  const getItemCount = () => productsListFormatted.length;
  const getItem = (productsListFormatted: ProductTypes[], index: number) =>
    productsListFormatted[index];
  const Item = ({item}: {item: ProductTypes}) => (
    <View style={{width: SIZES.width / 2.9}}>
      <Product
        imgUrl={item.imgUrl}
        name={item.name}
        price={item.price}
        sold={item.sold}
        address={item.address}
        rate={4.6}
      />
    </View>
  );
  return (
    <View style={styles.container}>
      <Text
        style={{
          height: '15%',
          fontSize: 16,
          color: 'black',
          fontWeight: '700',
          paddingTop: 5,
        }}>
        Gợi ý thêm từ shop
      </Text>
      <VirtualizedList
        initialNumToRender={4}
        renderItem={Item}
        keyExtractor={item => item.id.toString()}
        getItemCount={getItemCount}
        getItem={getItem}
        data={productsListFormatted}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default SuggestProduct;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: '4%',
    paddingBottom: 4,
    marginVertical: 3,
    height: SIZES.height / 3.5,
  },
});
