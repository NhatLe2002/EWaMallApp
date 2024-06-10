import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../constant/theme'
interface props {
  title: string
}

const SubTitleAddProductSeller: React.FC<props> = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.subTitle}>{title}</Text>
    </View>
  )
}

export default SubTitleAddProductSeller

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
  },
  subTitle: {
    color: COLORS.black,
    fontSize: 10,
    textAlign: 'left',
  },
})