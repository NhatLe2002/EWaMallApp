import React from 'react';
import { View } from 'react-native';

interface HeightSpacerProps {
  height: number;
  color: string;
}

const HeightSpacerSeller: React.FC<HeightSpacerProps> = ({ height, color }) => {
  return <View style={{ height: height, backgroundColor: color }}></View>;
};

export default HeightSpacerSeller;
