import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { COLORS, FONTS, SIZES } from '../../constant/theme';
import { Badge } from 'react-native-elements';
import Iconions from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import HeightSpacer from '../../reusables/height_spacer/HeightSpacer';
import { useNavigation, useRoute } from '@react-navigation/native';
import HeaderTitleSeller from '../../reusables/Title/HeaderTitleSeller';
import {useSelector} from 'react-redux';
import {ISellerState} from '../../constant/interface/sellerInterface';
import { InterfaceAccountState } from '../../constant/interface';

const HeaderProfile = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {seller} = useSelector((state: ISellerState) => state.sellerReducer);
  const {username} = useSelector(
    (state: InterfaceAccountState) => state.accountReducer,
  );
  // console.log(seller.seller);
  return (
    <View style={styles.container}>
      {route.name === 'ShopHome' ? (
        <Image
          style={styles.image}
          source={require('../../assets/images/BackGround.png')}
        />) : (
        <Image
          style={styles.image}
          source={require('../../assets/images/BackGround.png')}
        />)}

      <View
        style={{
          position: 'absolute',
          width: SIZES.width,
          top: '25%',
          right: 0,
        }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            {route.name === 'SellerHome' ? <HeaderTitleSeller text={''} /> : ''}
          </View>
          <View style={styles.containerProfile}>
            <Iconions name="settings-outline" color="white" size={25} />
            <View>
              <Iconions
                name="chatbubble-ellipses-outline"
                color="white"
                size={25}
              />
              <Badge
                value={10}
                badgeStyle={{
                  backgroundColor: COLORS.yellowMain,
                  borderWidth: 1,
                  width: 15,
                  height: 15,
                }}
                textStyle={{ fontSize: 9 }}
                containerStyle={{
                  position: 'absolute',
                  top: -5,
                  right: -5,
                }}
              />
            </View>
            <Feather name="shopping-cart" color="white" size={25} />
          </View>
        </View>
        <HeightSpacer height={SIZES.height / 30} />
        <View style={[styles.profileHeader]}>
          <Image
            style={styles.avatar}
            source={require('../../assets/images/Avatar.png')}
          />
          {route.name === 'SellerHome' ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={styles.infor}>
                <Text style={styles.textName}>{seller.seller.shopName}</Text>
                <Text style={styles.textFollow}>Đang theo dõi</Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('Home' as never)}
                style={{ marginLeft: '20%', backgroundColor: '#9DB410' }}>
                <Text style={styles.buttonText}>Trang chủ</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.infor}>
              <Text style={styles.textName}>{username}</Text>
              <View style={styles.member}>
                <FontAwesome5 name="crown" size={12} color="white" />

                <Text style={styles.memberText}>Thành viên bạc</Text>
                <Feather name="chevron-right" size={12} color="white" />
              </View>
              <Text style={styles.textFollow}>
                Đang theo dõi
                <Text
                  style={{ fontFamily: FONTS.roboto_bold, fontWeight: '800' }}>
                  20
                </Text>
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default HeaderProfile;

const styles = StyleSheet.create({
  container:{
    position: 'relative',
    width: '100%'
  },
  containerProfile: {
    zIndex: 10,
    paddingHorizontal: '5%',
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  image: {
    width: SIZES.width,
    height: SIZES.height / 4,
  },
  profileHeader: {
    flexDirection: 'row',
    paddingHorizontal: '7%',
    gap: 15,
  },
  avatar: {
    width: SIZES.width / 6,
    height: SIZES.height / 13,
    resizeMode: 'cover',
    borderRadius: SIZES.width / 5 / 2,
  },
  infor: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  textName: {
    fontSize: 22,
    fontFamily: FONTS.roboto_bold,
    color: COLORS.white,
  },
  member: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background_member,
    paddingHorizontal: '6%',
    paddingVertical: '2%',
    borderRadius: 10,
    gap: 5,
  },
  memberText: { color: COLORS.white, fontSize: 10 },

  textFollow: {
    fontSize: 11,
    color: COLORS.white,
  },
  containerContent: {
    flex: 1,
    flexDirection: 'column',
    gap: 15,
  },
  contentBackground: {
    backgroundColor: 'white',
    padding: '4%',
  },
  buttonText: {
    color: COLORS.white,
    margin: 4,
    marginHorizontal: 10,
    fontSize: 18,
  },
});
