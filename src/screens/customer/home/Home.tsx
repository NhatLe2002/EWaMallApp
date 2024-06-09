import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import HeaderHome from '../../../components/home/HeaderHome';
import { COLORS, FONTS, SIZES } from '../../../constant/theme';
import CategoryHome from '../../../components/home/CategoryHome';
import HeightSpacer from '../../../reusables/height_spacer/HeightSpacer';
import FlashSaleHome from '../../../components/home/FlashSaleHome';
import ProductList from '../../../reusables/list_item/ProductList';
import ReusableText from '../../../reusables/Text/ReusableText';

const Home: React.FC = () => (
  <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContainer}>
    <HeaderHome />
    <HeightSpacer height={SIZES.height / 18} />
    <CategoryHome />
    <FlashSaleHome />
    <HeightSpacer height={SIZES.height / 70} />
    <ReusableText
      text="Có thể bạn thích"
      size={20}
      color={COLORS.black}
      font={FONTS.roboto_medium}
    />
    <HeightSpacer height={SIZES.height / 70} />
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
