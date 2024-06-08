import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { COLORS, FONTS, SIZES } from '../../constant/theme'
import Iconions from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SearchHome from '../../reusables/searchs/SearchHome';
import { useNavigation } from '@react-navigation/native';


const HeaderShop = () => {
  const navigation = useNavigation<any>();
  return (
    // <View style={styles.container}>
    <LinearGradient
      style={styles.container}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      colors={['#9E9E9E', '#383838',]}
      locations={[1, 1]}>
      <View style={styles.searchContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}>
          <Iconions
            name="arrow-back"
            color="white"
            size={25}
          />
        </TouchableOpacity>
        <SearchHome />
        <Feather name="shopping-cart" color="white" size={25} />
      </View>
      <View style={[styles.profileHeader]}>
        <Image
          style={styles.avatar}
          source={require('../../assets/images/Avatar.png')}
        />
        <View style={styles.infor}>
          <Text style={styles.textName}>Quang Vinh</Text>
          <View style={styles.member}>
            <FontAwesome5 name="crown" size={12} color="white" />

            <Text style={styles.memberText}>Online 30 phút trước</Text>
            <Feather name="chevron-right" size={12} color="white" />
          </View>
          <Text >
            Đang theo dõi
            <Text
              style={{ fontFamily: FONTS.roboto_bold, fontWeight: '800' }}>
              20
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.ewamallText}>
        EWaMall
      </Text>
    </LinearGradient>

    // </View>
  )
}

export default HeaderShop

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    position: 'relative',
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '5%',
    marginTop: 20,
    marginBottom: 20,
  },
  searchInputContainner: {
    height: SIZES.height / 25,
    width: SIZES.width / 1.5,
    paddingHorizontal: 10,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  text: {
    color: COLORS.yellowMain,
    fontFamily: FONTS.inter_regular,
    fontSize: 14,
  },
  structureOption: {
    flexGrow: 1,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  textSeller: {
    color: 'white',
    fontSize: 15,
    fontFamily: FONTS.inter_SemiBold,
  },
  ewamallText: {
    position: 'absolute',
    top: '60%',
    left: '45%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    fontSize: 35,
    fontFamily: FONTS.poppins_Light,
    color: 'rgba(255, 255, 255, 0.27)',
    textAlign: 'center',
    zIndex: 0,
  },


  //Shop infor 
  profileHeader: {
    position: 'absolute',
    bottom: '10%',
    flexDirection: 'row',
    paddingHorizontal: '7%',
    gap: 15,
    zIndex: 1,
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
  memberText: {
    color: COLORS.white,
    fontSize: 10
  },
  avatar: {
    width: SIZES.width / 6,
    height: SIZES.height / 13,
    resizeMode: 'cover',
    borderRadius: SIZES.width / 5 / 2,
  },


})