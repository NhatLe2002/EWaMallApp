import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../../constant/theme';
import {useNavigation} from '@react-navigation/native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Feather from 'react-native-vector-icons/Feather';
import {Badge} from 'react-native-elements';
const HeaderSearch: React.FC = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}>
        <FontAwesome6 name="arrow-left-long" size={20} color={COLORS.white} />
      </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Cart' as never)}>
          <Feather name="shopping-cart" size={20} color="white" />
        </TouchableOpacity>
  
    </View>
  );
};

export default HeaderSearch;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: SIZES.width,
    height: SIZES.height / 9,
    backgroundColor: COLORS.transparence,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: '5%',
    paddingVertical: '2%',
    // shadowColor: COLORS.border_header,
    // shadowOffset: {width: 0, height: 4},
    // shadowOpacity: 1,
    // shadowRadius: 10,
    zIndex: 2,
  },
  button: {
    backgroundColor: 'rgba(49, 49, 49, 0.26)',
    borderRadius: 50,
    padding: '2%',
  },
});
