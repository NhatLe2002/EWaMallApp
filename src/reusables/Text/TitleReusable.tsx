import {StyleSheet, Text, View, TextStyle} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import React from 'react';

interface TextProps {
  text: string;
  subTitle?: string;
  size: number;
  color: string;
  colorSub?: string;
  sizeSub?: number;
  font: string;
  icon?: string;
  align?: 'left' | 'right' | 'center';
  numberOfLines?: number;
}

const TitleReusable: React.FC<TextProps> = ({
  text,
  subTitle,
  size,
  color,
  font,
  sizeSub,
  align,
  icon,
  numberOfLines,
  colorSub,
}: TextProps) => {
  const textStyle: TextStyle = {
    fontSize: size,
    color: color,
    fontFamily: font,
    textAlign: align,
  };
  const textSubStyle: TextStyle = {
    fontSize: sizeSub,
    color: colorSub,

    textAlign: align,
  };
  return (
    <View style={styles.containter}>
      <Text style={textStyle}>{text}</Text>
      <View style={styles.more}>
        <Text style={textSubStyle}>{subTitle}</Text>

        {icon && <Feather name={icon} size={16} color={colorSub} />}
      </View>
    </View>
  );
};

export default TitleReusable;

const styles = StyleSheet.create({
  containter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  more: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});
