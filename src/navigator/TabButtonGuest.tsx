import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constant/theme';
interface ButtonProps {
  name: string;

  onPress: any;
}
const TabButtonGuest: React.FC<ButtonProps> = ({
  name,

  onPress,
}) => {
  const useIonicons = name.includes('wallet') || name.includes('notification');
  const iconColor = name === 'home' ? COLORS.yellowMain : COLORS.white;
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.button}>
        {useIonicons ? (
          <Ionicons name={name} size={26} color={iconColor} />
        ) : (
          <Feather name={name} size={26} color={iconColor} />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default TabButtonGuest;

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
