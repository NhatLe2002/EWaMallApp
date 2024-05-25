import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderTitleSeller from '../../../reusables/Title/HeaderTitleSeller'
import ListIndustry from '../../../components/industry_seller.tsx/ListIndustry'

const Industry = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <HeaderTitleSeller text={'Thêm sản phẩm'} />
      </View >
      <View>
        <ListIndustry/>
      </View>
    </View>
  )
}

export default Industry

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    flexDirection: 'column',
},
  header: {
    borderBottomColor: '#9290908d',
    borderBottomWidth: 1,
    padding: 10
  },
})