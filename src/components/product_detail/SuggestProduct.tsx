import {StyleSheet, Text, View, VirtualizedList} from 'react-native';
import React from 'react';
import {SIZES} from '../../constant/theme';
import {productsListFormatted} from '../../data/Product';
import {ScrollView} from 'react-native-gesture-handler';
import Product from './ProductSuggest';

type ProductTypes = {
  id: number;
  name: string;
  imgUrl: string;
  price: string;
  address: string;
  sold: number;
  sales: number;
};

const SuggestProduct = () => {
  const getItemCount = () => productsListFormatted.length;
  const getItem = (productsListFormatted: ProductTypes[], index: number) =>
    productsListFormatted[index];
  const Item = ({item}: {item: ProductTypes}) => (
    <Product
      imgUrl={item.imgUrl}
      name={item.name}
      price={item.price}
      sold={item.sold}
      address={item.address}
    />
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
      {/* <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{height: '70%', marginBottom: 7}}>
        {productsListFormatted.map((item, index) => (
          <Product
            key={index}
            imgUrl={item.imgUrl}
            name={item.name}
            price={item.price}
            sold={item.sold}
            address={item.address}
          />
        ))}
      </ScrollView> */}
    </View>
  );
};

export default SuggestProduct;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingLeft: '2%',
    marginBottom: 3,
    marginTop: 3,
    height: SIZES.height / 3.5,
  },
});
