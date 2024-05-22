import {StyleSheet, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BlurView} from '@react-native-community/blur';
import {useNavigation} from '@react-navigation/native';
import TabButtonGuest from './TabButtonGuest';

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
    borderRadius: 50,
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: 'black',
    overflow: 'hidden',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  backgroundOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(73, 67, 50, 0.89)',
    borderRadius: 50,
  },
});

function tabBarBackground() {
  return (
    <BlurView
      blurType="light"
      blurAmount={2}
      style={StyleSheet.absoluteFillObject}>
      <View style={styles.backgroundOverlay} />
    </BlurView>
  );
}

const tabs = [
  {
    id: 1,
    title: 'notification',

    icon: 'notifications-outline',
  },
  {
    id: 2,
    title: 'categories',

    icon: 'grid',
  },
  {
    id: 3,
    title: 'home',

    icon: 'home',
  },
  {
    id: 4,
    title: 'voucher',

    icon: 'wallet-outline',
  },
  {
    id: 5,
    title: 'profile',

    icon: 'user',
  },
];

const BottomTabGuest: React.FC = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {tabs.map((item, index) => (
        <TabButtonGuest
          key={index}
          name={item.icon}
          onPress={() => {
            if (item.title !== 'home') {
              navigation.navigate('Login' as never);
            }
          }}
        />
      ))}
    </View>
  );
};

export default BottomTabGuest;
