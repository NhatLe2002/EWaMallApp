import React from 'react';
import {View} from 'react-native';

interface HeightSpacerProps {
  height: number;
}

const HeightSpacer: React.FC<HeightSpacerProps> = ({height}) => {
  return <View style={{height: height}}></View>;
};

export default HeightSpacer;
