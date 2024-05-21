import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Iconions from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS } from '../../constant/theme';
import { useNavigation } from '@react-navigation/native';

const HeaderTitleSeller = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
      <Iconions name="arrow-back" color="white" size={25} />
      </TouchableOpacity>
      <Text style ={styles.textName}>HeaderTitleSeller</Text>
    </View>
  )
}

export default HeaderTitleSeller

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  textName: {
    marginLeft: 20,
    fontSize: 22,
    fontFamily: FONTS.roboto_bold,
    color: COLORS.white,
  },
})