import {
  Animated,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {COLORS, FONTS, SIZES} from '../../../constant/theme';
import HeaderCommonSub from '../../../reusables/header/HeaderCommonSub';
import HeightSpacer from '../../../reusables/height_spacer/HeightSpacer';
import ProductList from '../../../reusables/list_item/ProductList';
import HeaderDynamic from '../../../reusables/header/HeaderDynamic';
import {ClipPath, Defs, Path, Rect, Svg} from 'react-native-svg';
import CategoryFS from '../../../components/flash_sale/CategoryFS';
import TimeSale from '../../../components/flash_sale/TimeSale';
import {useDispatch, useSelector} from 'react-redux';
import {getAllIndustry} from '../../../redux/slice/industrySlice';
import {InterfaceIndustryState} from '../../../constant/interface';

const FlashSaleScreen: React.FC = () => {
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch<any>();
  const {industryList} = useSelector(
    (state: InterfaceIndustryState) => state.industryReducer,
  );
  useEffect(() => {
    dispatch(getAllIndustry());
  }, [dispatch]);
  const levelOneIndustries = industryList.filter(
    (industry: {level: number}) => industry.level === 1,
  );
  const updatedListIndustry = [
    ...levelOneIndustries,
    {
      industryName: 'Top các sản phẩm nổi bật',
      isActive: true,
      level: 1,
      isLeaf: false,
      path: '/top-products',
      parentNodeId: null,
      parentNode: null,
      industryDetails: [],
      id: -1, 
    },  ];

  console.log(updatedListIndustry);
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header]}>
        <HeaderDynamic
          title="Flash Sale"
          backgroundColor={COLORS.transparence}
          colorBack="white"
          colorTitle="white"
          scrollOffsetY={scrollOffsetY}
        />
      </Animated.View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {contentOffset: {y: scrollOffsetY}},
            },
          ],
          {useNativeDriver: false},
        )}>
        <Image
          style={styles.image}
          source={require('../../../assets/images/HeaderFlashSale1.png')}
        />

        <TimeSale />
        <HeightSpacer height={SIZES.height / 20} />
        <View style={styles.bannerContainer}>
          <Image
            source={require('../../../assets/images/BannerFlashSal.png')}
            style={{
              height: SIZES.height / 11,
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              borderRadius: 20,
              resizeMode:'cover',
              width:'100%'
            }}
          />
          <View style={{flexDirection: 'column', gap: 10}}>
            <View style={styles.contentSub}>
              <Text style={styles.textBanner}>F</Text>
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
              <Text style={styles.textBanner}>ASH SALE 03</Text>
            </View>
            <Text style={{color: '#C0C0C0', fontFamily: FONTS.roboto_medium}}>
              Chương ưu đãi hàng ngày hàng tháng
            </Text>
          </View>

          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              paddingHorizontal: '4%',
              paddingVertical: '2%',
            }}>
            <Text
              style={{
                fontSize: 18,
                color: '#182F68',
                fontFamily: FONTS.roboto_medium,
              }}>
              24{' '}
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: '#182F68',
                fontFamily: FONTS.roboto_medium,
              }}>
              Giờ{' '}
            </Text>
          </View>
        </View>
        <CategoryFS industryList={updatedListIndustry} />
        <ProductList />
        <ProductList />
        <ProductList />
        <ProductList />
      </ScrollView>
    </View>
  );
};

export default FlashSaleScreen;

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    width: SIZES.width,
    zIndex: 1,
  },
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: SIZES.width,
    height: SIZES.height / 3.5,
    position: 'absolute',
    resizeMode: 'cover',
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  bannerContainer: {
    marginHorizontal: '6%',
    borderRadius: 20,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 25,
    backgroundColor: 'red',
    height: SIZES.height / 11,
  },
  contentSub: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1,
  },
  textBanner: {
    fontSize: 20,
    color: COLORS.white,
    fontFamily: FONTS.roboto_bold,
  },
});
