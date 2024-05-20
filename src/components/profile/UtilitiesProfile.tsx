import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {COLORS, FONTS, SIZES} from '../../constant/theme';
import HeightSpacer from '../../reusables/height_spacer/HeightSpacer';
import TitleReusable from '../../reusables/Text/TitleReusable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const UtilitiesProfile = () => {
  return (
    <>
      <TitleReusable
        text="Tiện ích"
        size={18}
        color={COLORS.black}
        font={FONTS.inter_SemiBold}
      />
      <HeightSpacer height={SIZES.height / 70} />
      <View style={styles.containerOptions}>
        <View style={styles.option1}>
          <Text style={styles.optionText}>Xu Ewamall</Text>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 3}}>
            <MaterialCommunityIcons
              name="alpha-e-circle"
              color={COLORS.yellowMain}
              size={18}
            />
            <Text style={{fontFamily: FONTS.inter_regular, fontSize: 12}}>
              Tìm thêm
            </Text>
          </View>
        </View>
        <View style={styles.option2}>
          <Text style={styles.optionText}>Ví Ewamall</Text>
          <Text style={{fontFamily: FONTS.inter_regular, fontSize: 12}}>
            Tk chưa liên kết
          </Text>
        </View>
        <View style={styles.option3}>
          <Text style={styles.optionText}>Mã giảm giá</Text>
          <Text style={{fontFamily: FONTS.inter_SemiBold, fontSize: 15}}>
            20
          </Text>
        </View>
      </View>
    </>
  );
};

export default UtilitiesProfile;

const styles = StyleSheet.create({
  containerOptions: {
    flex: 1,
    padding: '2%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 10,
  },
  option1: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(215, 236, 251, 0.55)',
    padding: '2%',
    gap: 10,
    borderRadius: 10,
    borderColor: 'rgba(215, 236, 251, 0.55)',
    borderWidth: 1,
  },
  option2: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(252, 249, 180, 0.55)',
    padding: '2%',
    gap: 10,
    borderRadius: 10,
    borderColor: 'rgba(252, 249, 180, 0.55)',
    borderWidth: 1,
  },
  option3: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(223, 235, 224, 0.55)',
    padding: '2%',
    gap: 10,
    borderRadius: 10,
    borderColor: 'rgba(223, 235, 224, 0.55)',
    borderWidth: 1,
  },
  optionText: {
    color: 'rgba(12, 12, 12, 0.49)',
    fontSize: 14,
  },
});
