import React from 'react';
import {StyleSheet, Text, TextStyle, View} from 'react-native';

interface TextProps {
  text: string;
  size: number;
  color: string;
  font: string;
  align?: 'left' | 'right' | 'center';
  numberOfLines?: number;
}

const ReusableText: React.FC<TextProps> = ({
  text,
  size,
  color,
  font,
  align,
  numberOfLines,
}: TextProps) => {
  const textStyle: TextStyle = {
    fontSize: size,
    color: color,
    fontFamily: font,
    textAlign: align,
  };

  return (
    <View style={styles.headerContainer}>
      <Text style={textStyle} numberOfLines={numberOfLines}>
        {text}
      </Text>
    </View>
  );
};

export default ReusableText;
const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: '5%',
  },
});
