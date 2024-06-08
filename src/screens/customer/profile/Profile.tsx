import {
  BackHandler,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import HeaderProfile from '../../../components/profile/HeaderProfile';
import ManageOrder from '../../../components/profile/ManageOrder';
import UtilitiesProfile from '../../../components/profile/UtilitiesProfile';
import {COLORS} from '../../../constant/theme';
import GeneralProfile from '../../../components/profile/GeneralProfile';
import Logout from '../../../components/profile/Logout';

const Profile: React.FC = () => {
  const isSelectionModeEnabled = () => {
    // Replace with actual logic to determine if selection mode is enabled
    return false;
  };

  const disableSelectionMode = () => {
    // Replace with actual logic to disable selection mode
    console.log('Selection mode disabled');
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (isSelectionModeEnabled()) {
          disableSelectionMode();
          return true;
        } else {
          return false;
        }
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => subscription.remove();
    }, [isSelectionModeEnabled, disableSelectionMode]),
  );
  return (
    <ScrollView style={styles.scrollContainer}>
      <HeaderProfile />
      <View style={styles.containerContent}>
        <View style={styles.contentBackground}>
          <ManageOrder />
        </View>
        <View style={styles.contentBackground}>
          <UtilitiesProfile />
        </View>
        <GeneralProfile />
        <Logout />
        {/* <View style={styles.contentBackground}>
          <UtilitiesProfile />
        </View> */}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: COLORS.background_list,
  },
  containerContent: {
    flex: 1,
    flexDirection: 'column',
    gap: 15,
    marginBottom:'10%'
  },
  contentBackground: {
    backgroundColor: 'white',
    padding: '4%',
  },
});
export default Profile;
