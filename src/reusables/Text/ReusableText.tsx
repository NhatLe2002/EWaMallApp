import React from 'react';
import {Text, TextStyle} from 'react-native';

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
    <Text style={textStyle} numberOfLines={numberOfLines}>
      {text}
    </Text>
  );
};

export default ReusableText;
