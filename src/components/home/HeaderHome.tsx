import React from 'react';
import {StyleSheet} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constant/theme';
import ReusableText from '../../reusables/Text/ReusableText';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View} from 'react-native';
// import SearchHome from './SearchHome';
import {Badge} from 'react-native-elements';
import BannerAds from '../../reusables/banners/BannerAds';
import HeightSpacer from '../../reusables/height_spacer/HeightSpacer';
import SearchHome from '../../reusables/searchs/SearchHome';
import Iconions from 'react-native-vector-icons/Ionicons';
const HeaderHome: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContent}>
        <ReusableText
          text="Xin chào, Quang Vinh"
          size={23}
          color={COLORS.white}
          font={FONTS.inter_bold}
        />

        <Iconions name="notifications-outline" color="white" size={30} />
      </View>
      <HeightSpacer height={SIZES.height / 50} />
      <View style={styles.headerContent}>
        <SearchHome />
        <View>
          <Iconions
            name="chatbubble-ellipses-outline"
            color="white"
            size={32}
          />
          <Badge
            value={10}
            badgeStyle={{backgroundColor: COLORS.yellowMain, borderWidth: 1}}
            containerStyle={{
              position: 'absolute',
              top: -5,
              right: -5,
            }}
          />
        </View>
      </View>
      <HeightSpacer height={SIZES.height / 50} />
      <BannerAds />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {

    paddingRight: 20,

    height: SIZES.height / 3,
    backgroundColor: COLORS.yellowMain,
    borderBottomLeftRadius: 45,
    borderBottomRightRadius: 45,
  },

  headerContent: {
    paddingLeft: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default HeaderHome;
