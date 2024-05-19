/* eslint-disable react/no-unstable-nested-components */
import {StyleSheet, Text, View, Image, VirtualizedList} from 'react-native';
import React from 'react';
import * as Progress from 'react-native-progress';
import {COLORS, FONTS, SIZES} from '../../constant/theme';

type ItemProps = {
  id: number;
  name: string;
  category: string;
  imgUrl: string;
  price: string;
  description: string;
};

type ProductSaleProps = {
  data: ItemProps[];
};

const ProductSale: React.FC<ProductSaleProps> = ({data}) => {
  const getItemCount = () => data.length;
  const getItem = (data: ItemProps[], index: number) => data[index];

  const Item = ({item}: {item: ItemProps}) => (
    <View style={styles.item}>
      <Image style={styles.image} source={{uri: item.imgUrl}} />
      <View style={styles.price}>
        <Text style={styles.priceText}>{item.price}</Text>
      </View>
      <View style={styles.containerProgressBar}>
        <Progress.Bar
          color="red"
          unfilledColor={COLORS.progressBar}
          borderWidth={0}
          progress={0.3}
          width={SIZES.width / 3.5}
          height={SIZES.height / 85}
        />
        <Text style={styles.textProgressBar}>ĐANG BÁN CHẠY</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <VirtualizedList
        initialNumToRender={4}
        renderItem={Item}
        keyExtractor={item => item.id.toString()}
        getItemCount={getItemCount}
        getItem={getItem}
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 8,
  },
  item: {
    flexDirection: 'column',
    gap: 8,
    marginHorizontal: 8,
    borderColor: COLORS.border_1,
    borderWidth: 1,
    alignItems: 'center',
    paddingBottom: 10,
  },
  image: {
    width: SIZES.width / 3,
    height: SIZES.height / 8,
  },
  price: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    fontSize: 16,
    fontFamily: FONTS.roboto_bold,
    color: COLORS.red_price,
  },
  priceText: {
    fontSize: 16,
    fontFamily: FONTS.roboto_bold,
    color: COLORS.red_price,
  },
  containerProgressBar: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBar: {
    position: 'relative',
  },
  textProgressBar: {
    position: 'absolute',
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '700',
  },
});

export default ProductSale;
