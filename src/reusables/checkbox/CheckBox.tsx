import {Pressable, StyleSheet} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface CheckBoxProps {
  isChecked: boolean;
  onPress: () => void;
  checkedColor?: string;
  uncheckedColor?: string;
}

const CheckBox: React.FC<CheckBoxProps> = ({ isChecked, onPress, checkedColor = "#F31A1A", uncheckedColor = "#000" }) => {
  const iconName = isChecked ? 'checkbox' : 'square-outline';
  const iconColor = isChecked ? checkedColor : uncheckedColor;

  return (
   
    <Pressable onPress={onPress}>
         <Ionicons name={iconName} size={24} color={iconColor} />
      </Pressable>
  
  );
};

export default CheckBox;

