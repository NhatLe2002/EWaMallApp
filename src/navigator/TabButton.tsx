import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../constant/theme';

interface ButtonProps {
  name: string;
  accessibilityState: any;
  onPress: any;
}
const TabButton: React.FC<ButtonProps> = ({
  name,
  accessibilityState,
  onPress,
}) => {
  const isWallet = name.includes('wallet');

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.button}>
        {isWallet ? (
          <Ionicons
            name={name}
            size={26}
            color={
              accessibilityState.selected ? COLORS.yellowMain : COLORS.white
            }
          />
        ) : (
          <Feather
            name={name}
            size={26}
            color={
              accessibilityState.selected ? COLORS.yellowMain : COLORS.white
            }
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default TabButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 75,
    borderRadius: 50,
  },
  button: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
