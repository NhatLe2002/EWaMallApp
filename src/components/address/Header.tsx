import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Iconions from 'react-native-vector-icons/Ionicons';
import {Badge} from 'react-native-elements';
import {COLORS, FONTS, SIZES} from '../../constant/theme';
import {useNavigation} from '@react-navigation/native';

const Header: React.FC = () => {
  const styles = StyleSheet.create({
    container: {
      width: SIZES.width,
      height: SIZES.height / 9,
      backgroundColor: COLORS.white,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',

      paddingHorizontal: '5%',
      paddingVertical: '2%',
      shadowColor: COLORS.border_header,
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 1,
      shadowRadius: 10,
      zIndex: 2,
    },
    titleContainer: {
      flex: 1,
      alignItems: 'center',
    },
    inputContainer: {
      flex: 1,
      backgroundColor: COLORS.border_1,
      borderRadius: 2,
      paddingHorizontal: '3%',
      paddingVertical: '1%',
    },
    input: {
      fontSize: 16,
      color: COLORS.black,
    },
  });

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome6
            name="arrow-left-long"
            size={22}
            color={COLORS.yellowMain}
          />
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Tìm kiếm Quận/Huyện, Phường/Xã"
            placeholderTextColor={COLORS.gray}
            autoFocus={false}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            multiline={false}
            numberOfLines={1}
            returnKeyType="search"
          />
        </View>
      </View>
    </View>
  );
};

export default Header;
