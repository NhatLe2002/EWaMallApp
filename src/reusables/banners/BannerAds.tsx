import React from 'react';
import {StyleSheet, Image, View, Dimensions} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {banner} from '../../data/Banner';
import {SIZES} from '../../constant/theme';

const {width: screenWidth} = Dimensions.get('window');

const BannerAds: React.FC = () => {
  const renderItem = ({item}: {item: {imgUrl: string}}) => (
    <Image source={{uri: item.imgUrl}} style={styles.image} />
  );

  return (
    <View>
      {/* <Carousel
        data={banner}
        renderItem={renderItem}
        sliderWidth={screenWidth * 0.91}
        itemWidth={screenWidth * 0.91}
        autoplay={true}
        autoplayInterval={2500}
        loop={true}
      /> */}
    </View>
  );
};

export default BannerAds;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: SIZES.height / 5,
    borderRadius: 25,
  },
});
