import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {COLORS, FONTS, SIZES} from '../../constant/theme';
import HeaderHome from '../../components/home/HeaderHome';
import HeightSpacer from '../../reusables/height_spacer/HeightSpacer';
import CategoryHome from '../../components/home/CategoryHome';
import FlashSaleHome from '../../components/home/FlashSaleHome';
import ReusableText from '../../reusables/Text/ReusableText';
import ProductList from '../../reusables/list_item/ProductList';
import BottomTabGuest from '../../navigator/BottomTabGuest';

const HomeGuest: React.FC = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
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
      <BottomTabGuest />
    </View>
  );
};

export default HomeGuest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContainer: {
    paddingBottom: 100, 
  },
});
