import React from 'react';
import {StyleSheet} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constant/theme';
import ReusableText from '../../reusables/Text/ReusableText';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {Badge} from 'react-native-elements';
import BannerAds from '../../reusables/banners/BannerAds';
import HeightSpacer from '../../reusables/height_spacer/HeightSpacer';
import SearchHome from '../../reusables/searchs/SearchHome';
import Iconions from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {InterfaceAccountState, InterfaceCartState} from '../../constant/interface';
const HeaderHome: React.FC = () => {
  const {isLogin, username, userId} = useSelector(
    (state: InterfaceAccountState) => state.accountReducer,
  );
  const navigation = useNavigation<any>();
  const {cartList} = useSelector(
    (state: InterfaceCartState) => state.cartReducer,
  );
  const handleNaviSearch = () => {
    if (isLogin) {
      navigation.navigate('Cart');
    } else {
      navigation.navigate('Login');
    }
  };
  console.log("object",cartList)
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContent}>
        <ReusableText
          text={isLogin ?  `Xin chào, ${username}`: "Chào mừng bạn"}
          size={23}
          color={COLORS.white}
          font={FONTS.inter_bold}
        />
      </View>
      <HeightSpacer height={SIZES.height / 50} />
      <View style={styles.headerContent}>
        <SearchHome />
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate('ChatHomeScreen' as never)}>
            <>
              <Iconions
                name="chatbubble-ellipses-outline"
                color="white"
                size={25}
              />
              <Badge
                value={10}
                textStyle={{fontSize: 9}}
                badgeStyle={{
                  backgroundColor: COLORS.yellowMain,
                  borderWidth: 1,
                  width: 15,
                  height: 15,
                }}
                containerStyle={{
                  position: 'absolute',
                  top: -5,
                  right: -5,
                }}
              />
            </>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleNaviSearch}>
          <Feather name="shopping-cart" size={25} color="white" />
          <Badge
            value={10}
            textStyle={{fontSize: 9}}
            badgeStyle={{
              backgroundColor: COLORS.yellowMain,
              borderWidth: 1,
              width: 15,
              height: 15,
            }}
            containerStyle={{
              position: 'absolute',
              top: -5,
              right: -5,
            }}
          />
        </TouchableOpacity>
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
