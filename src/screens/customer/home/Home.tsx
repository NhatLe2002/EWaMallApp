import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import HeaderHome from '../../../components/home/HeaderHome';
import {COLORS, SIZES} from '../../../constant/theme';
import CategoryHome from '../../../components/home/CategoryHome';
import HeightSpacer from '../../../reusables/height_spacer/HeightSpacer';
import FlashSaleHome from '../../../components/home/FlashSaleHome';
import ProductList from '../../../reusables/list_item/ProductList';

const Home: React.FC = () => (
  <ScrollView style={styles.scrollContainer}>
    <HeaderHome />
    <HeightSpacer height={SIZES.height / 18} />
    <CategoryHome />
    <FlashSaleHome />
    <ProductList />
  </ScrollView>
);

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: COLORS.white,
  },
});

export default Home;
