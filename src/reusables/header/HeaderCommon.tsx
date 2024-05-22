import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Iconions from 'react-native-vector-icons/Ionicons';
import {Badge} from 'react-native-elements';
import {COLORS, FONTS, SIZES} from '../../constant/theme';
import {useNavigation} from '@react-navigation/native';

interface Props {
  title: string;
  colorTitle: string;
  backgroundColor: string;
  colorBack: string;
  icon1?: string;
  icon2?: string;
}

const HeaderCommon: React.FC<Props> = ({
  title,
  backgroundColor,
  colorBack,
  colorTitle,
  icon1,
  icon2,
}: Props) => {
  const styles = StyleSheet.create({
    container: {
      width: SIZES.width,
      height: SIZES.height / 9,
      backgroundColor: backgroundColor,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      paddingHorizontal: '5%',
      paddingVertical: '2%',
      shadowColor: COLORS.border_header,
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 1,
      shadowRadius: 10,
      zIndex: 2,
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
    right: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <FontAwesome6 name="arrow-left-long" size={22} color={colorBack} />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      {(icon1 || icon2) && (
        <View style={styles.right}>
          {icon1 && (
            <View style={{marginRight: icon2 ? 10 : 0}}>
              <Iconions name={icon1} color={COLORS.yellowMain} size={22} />
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
            </View>
          )}
          {icon2 && (
            <View>
              <Iconions name={icon2} color={COLORS.yellowMain} size={22} />
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
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default HeaderCommon;
