import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Checkbox } from 'react-native-paper';
import HeaderNotification from '../../../components/notification/HeaderNotification';
import BodyNotification from '../../../components/notification/BodyNotification';
const NotificationScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderNotification />
      <BodyNotification />
    </SafeAreaView>
  )
}

export default NotificationScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ddd", // Màu nền của screen
  },
});