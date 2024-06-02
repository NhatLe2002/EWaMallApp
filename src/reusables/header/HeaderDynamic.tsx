import { StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS, FONTS, SIZES } from '../../constant/theme';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';
import { Animated } from 'react-native';

interface Props {
  title: string;
  colorTitle: string;
  backgroundColor: string;
  colorBack: string;
  scrollOffsetY: Animated.Value;
}

const AnimatedFontAwesome6 = Animated.createAnimatedComponent(FontAwesome6);

const HeaderDynamic: React.FC<Props> = ({
  title,
  backgroundColor,
  colorBack,
  colorTitle,
  scrollOffsetY,
}) => {
  const [showShadow, setShowShadow] = useState(false);

  useEffect(() => {
    // Thực hiện cập nhật trạng thái hiển thị shadow dựa trên giá trị scrollOffsetY
    const listenerId = scrollOffsetY.addListener(({ value }) => {
      setShowShadow(value > 0); // Hiển thị shadow khi giá trị scrollOffsetY lớn hơn 0
    });

    return () => {
      // Loại bỏ listener khi component bị unmounted
      scrollOffsetY.removeListener(listenerId);
    };
  }, [scrollOffsetY]);

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
      borderBottomColor: COLORS.border_header, 
      ...(showShadow && { ...Platform.select({
        ios: {
          shadowColor: COLORS.border_header,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 1,
          shadowRadius: 10,
        },
        android: {
          elevation: 4,
        },
      })}),
    },
    title: {
      fontFamily: FONTS.inter_SemiBold,
      fontSize: 20,
      color: colorTitle,
    },
    backButton: {
      position: 'absolute',
      left: '5%',
      bottom: '10%',
      zIndex: 2,
    },
    backIcon: {
      color: colorBack,
    },
  });

  const navigation = useNavigation();

  const animateHeaderColor = scrollOffsetY.interpolate({
    inputRange: [0, SIZES.height / 5],
    outputRange: [backgroundColor, 'white'],
    extrapolate: 'clamp',
  });

  const animateHeaderTextColor = scrollOffsetY.interpolate({
    inputRange: [0, SIZES.height / 5],
    outputRange: [colorTitle, COLORS.yellowMain],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor: animateHeaderColor }]}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <AnimatedFontAwesome6 name="arrow-left-long" size={22} color={animateHeaderTextColor} />
      </TouchableOpacity>
      <Animated.Text style={[styles.title, { color: animateHeaderTextColor }]}>{title}</Animated.Text>
    </Animated.View>
  );
};

export default HeaderDynamic;
