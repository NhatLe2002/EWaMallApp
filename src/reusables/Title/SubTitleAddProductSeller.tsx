import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
interface props {
    title: string
}

const SubTitleAddProductSeller: React.FC<props> = ({title}) => {
  return (
    <View>
      <Text>{title}</Text>
    </View>
  )
}

export default SubTitleAddProductSeller

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start', 
    },
    subTitle: {
        fontSize: 10, 
        textAlign: 'left', 
    },
})