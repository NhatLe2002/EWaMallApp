import React from 'react';
import {StyleSheet, Image, View, Dimensions} from 'react-native';

import {banner} from '../../data/Banner';
import {SIZES} from '../../constant/theme';
import Carosell from '../carousel/Carousel';

const {width: screenWidth} = Dimensions.get('window');
const witdth1 = Dimensions.get('window');
const BannerAds: React.FC = () => {
  const renderItem = ({item}: {item: {imgUrl: string}}) => (
    <Image source={{uri: item.imgUrl}} style={styles.image} />
  );
  return (
    <View >
      <Carosell inputData={{
        data : banner,
        height : 4,
        width : 1,
        scale: 0.9,
      }}/>
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
