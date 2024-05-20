import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {COLORS, FONTS, SIZES} from '../../constant/theme';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TitleReusable from '../../reusables/Text/TitleReusable';
import HeightSpacer from '../../reusables/height_spacer/HeightSpacer';

const ManageOrder = () => {
  return (
    <>
      <TitleReusable
        text="Đơn hàng"
        size={18}
        color={COLORS.black}
        font={FONTS.inter_SemiBold}
        subTitle="Xem thêm"
        colorSub={COLORS.gray_2}
        sizeSub={12}
        icon="chevron-right"
      />
      <HeightSpacer height={SIZES.height / 70} />
      <View
        style={{
            shadowColor: "gray",
            shadowOffset: {width: 3, height: 4},
            shadowOpacity: 0.4,
            shadowRadius: 7,
          }}>
        <LinearGradient
          style={styles.lineargradient}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}
          colors={['#F4C64F', 'rgba(233, 187, 69, 0.71)']}>
          <View style={styles.containerOptions}>
            <View style={styles.option}>
              <MaterialCommunityIcons
                name="note-edit-outline"
                size={30}
                color="white"
              />
              <Text style={styles.textIcon}>Chờ xác nhận</Text>
            </View>
            <View style={styles.option}>
              <Feather name="box" size={30} color="white" />
              <Text style={styles.textIcon}>Chờ lấy hàng</Text>
            </View>
            <View style={styles.option}>
              <MaterialCommunityIcons
                name="truck-fast-outline"
                size={30}
                color="white"
              />
              <Text style={styles.textIcon}>Đang vận chuyển</Text>
            </View>
            <View style={styles.option}>
              <MaterialCommunityIcons
                name="star-circle-outline"
                size={30}
                color="white"
              />
              <Text style={styles.textIcon}>Feedback</Text>
            </View>
          </View>
        </LinearGradient>
      </View>
    </>
  );
};

export default ManageOrder;

const styles = StyleSheet.create({
  lineargradient: {
    marginHorizontal: '2%',
    padding: '2%',
    borderRadius: 10,
  },
  containerOptions: {
    padding: '2%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  option: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 5,
    maxWidth: '25%',
  },
  textIcon: {
    fontSize: 12,
    textAlign: 'center',
    flexWrap: 'wrap',
    color: 'white',
    fontFamily: FONTS.inter_medium,
  },
});
