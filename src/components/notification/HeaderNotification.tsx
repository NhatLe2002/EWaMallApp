import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Iconions from 'react-native-vector-icons/Ionicons';
import { Badge } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { InterfaceAccountState } from '../../constant/interface';
import { COLORS, FONTS } from '../../constant/theme';

const HeaderNotification: React.FC = () => {
  const { isLogin } = useSelector(
    (state: InterfaceAccountState) => state.accountReducer,
  );
  const navigation = useNavigation<any>();

  const handleNaviSearch = () => {
    if (isLogin) {
      navigation.navigate('Cart');
    } else {
      navigation.navigate('Login');
    }
  };

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mã Giảm Giá</Text>
        <View style={styles.iconsContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("ChatHomeScreen" as never)}>
            <View style={styles.iconBadgeContainer}>
              <Iconions
                name="chatbubble-outline"
                color={COLORS.yellowMain}
                size={25}
              />
              <Badge
                value={1}
                textStyle={{ fontSize: 9 }}
                badgeStyle={{
                  backgroundColor: COLORS.yellowMain,
                  borderWidth: 0,
                  width: 15,
                  height: 15,
                  borderRadius: 7.5,
                }}
                containerStyle={{
                  position: 'absolute',
                  top: -5,
                  right: -5,
                }}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNaviSearch}>
            <View style={styles.iconBadgeContainer}>
              <Feather name="shopping-cart" size={25} color={COLORS.yellowMain} />
              <Badge
                value={1}
                textStyle={{ fontSize: 9 }}
                badgeStyle={{
                  backgroundColor: COLORS.yellowMain,
                  borderWidth: 0,
                  width: 15,
                  height: 15,
                  borderRadius: 7.5,
                }}
                containerStyle={{
                  position: 'absolute',
                  top: -5,
                  right: -5,
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.separator} />
    </View>
  );
};

export default HeaderNotification;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: COLORS.white,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: FONTS.roboto_bold,
    color: COLORS.black,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 16,
  },
  iconBadgeContainer: {
    position: 'relative',
    marginHorizontal: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginTop: 10,
  },
});
