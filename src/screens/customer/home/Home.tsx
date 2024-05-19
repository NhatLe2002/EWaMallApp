import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import HeaderHome from '../../../components/customer/home/HeaderHome';
// import CategoryHome from '../../components/home/CategoryHome';
// import FlashSaleHome from '../../components/home/FlashSaleHome';
import {COLORS, SIZES} from '../../../constant/theme';
// import HeightSpacer from '../../components/reusables/HeightSpacer';
// import ProductList from '../../components/home/ProductList';

const Home: React.FC = () => (
  <ScrollView style={styles.scrollContainer}>
    <HeaderHome />
    {/* <HeightSpacer height={SIZES.height / 18} />
    <CategoryHome />
    <FlashSaleHome />
    <ProductList /> */}
  </ScrollView>
);

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: COLORS.white,
  },
});

export default Home;
