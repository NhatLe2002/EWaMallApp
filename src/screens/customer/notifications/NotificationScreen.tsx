import { SafeAreaView, StyleSheet, View } from 'react-native'
import React from 'react'
import HeaderNotification from '../../../components/notification/HeaderNotification';
import BodyNotification from '../../../components/notification/BodyNotification';
import FooterNotification from '../../../components/notification/FooterNotification';

const NotificationScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderNotification />
      <View style={styles.bodyContainer}>
        <BodyNotification />
      </View>
      <FooterNotification />
    </SafeAreaView>
  )
}

export default NotificationScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ddd", // Màu nền của screen
  },
  bodyContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
