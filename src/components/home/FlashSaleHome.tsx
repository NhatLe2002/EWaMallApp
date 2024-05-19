import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {COLORS, FONTS, SIZES} from '../../constant/theme';
import Svg, {Defs, ClipPath, Path, Rect} from 'react-native-svg';
import CountDown from 'react-native-countdown-component';
import ProductSale from './ProductSale';
import {productsFormatted} from '../../data/Product';
import HeightSpacer from '../../reusables/height_spacer/HeightSpacer';
const FlashSaleHome: React.FC = () => {
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.contentSub}>
            <Text style={styles.text}>F</Text>
            <Svg height="25" width="16">
              <Defs>
                <ClipPath id="clip">
                  {/* <Path d="M0,0 L5,9 L14,9 L4,20 L6,10 L2,10 L10,0 Z" /> */}
                  <Path d="M7,0 L2,12 L7,12  ,L4,25  L16,10 L13,7  L16,0 Z" />
                </ClipPath>
              </Defs>
              <Rect
                x="0"
                y="0"
                width="16"
                height="25"
                fill="#F01D00"
                clipPath="url(#clip)"
              />
            </Svg>
            <Text style={styles.text}>ASH SALE</Text>
          </View>

          <CountDown
            until={9 * 60 * 60}
            size={10}
            digitStyle={{backgroundColor: COLORS.black}}
            digitTxtStyle={{
              color: COLORS.white,
              fontFamily: FONTS.roboto_medium,
              fontSize: 17,
            }}
            separatorStyle={{color: COLORS.black}}
            showSeparator
            timeToShow={['H', 'M', 'S']}
            timeLabels={{h: undefined, m: undefined, s: undefined}}
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.textSub}>Xem thêm</Text>
          <Feather name="chevron-right" size={16} color={COLORS.gray_2} />
        </View>
      </View>
      <HeightSpacer height={SIZES.height / 60} />
      <ProductSale data={productsFormatted} />
    </View>
  );
};

export default FlashSaleHome;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  contentSub: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1,
  },
  text: {
    fontSize: 20,
    color: COLORS.yellowMain,
    fontFamily: FONTS.roboto_bold,
  },
  textSub: {
    fontSize: 12,
    color: COLORS.gray_2,
    fontFamily: FONTS.inter_regular,
  },
});
