import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SIZES} from '../../constant/theme';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useNavigation} from '@react-navigation/native';
interface Props {
  title: string;
  colorTitle: string;
  backgroundColor: string;
  colorBack: string;
}
const HeaderCommonSub: React.FC<Props> = ({
  title,
  backgroundColor,
  colorBack,
  colorTitle,
}) => {
  const styles = StyleSheet.create({
    container: {
      width: SIZES.width,
      height: SIZES.height / 9,
      backgroundColor: backgroundColor,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-end',
      paddingHorizontal: '5%',
      paddingVertical: '2%',
      shadowColor: COLORS.border_header,
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 1,
      shadowRadius: 10,
      zIndex: 2,
      position: 'relative',
    },
    titleContainer: {
      flex: 1,
      alignItems: 'center',
    },
    title: {
      fontFamily: FONTS.inter_medium,
      fontSize: 20,
      color: colorTitle,
    },
    goBack: {
      position: 'absolute',
      left:'5%',
      bottom:'10%',
      zIndex:2
    },
  });
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.goBack}
        onPress={() => navigation.goBack()}>
        <FontAwesome6 name="arrow-left-long" size={22} color={colorBack} />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

export default HeaderCommonSub;
