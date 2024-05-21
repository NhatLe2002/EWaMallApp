import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import Home from '../screens/customer/home/Home';
import { StyleSheet } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { useSelector } from 'react-redux';
import { InterfaceAccountState } from '../constant/interface';
import TabButton from './TabButton';
import LoginScreen from '../screens/customer/login/LoginScreen';
import Cart from '../screens/customer/cart/Cart';
import Category from '../screens/customer/categories/Category';
import Voucher from '../screens/customer/voucher/Voucher';
import Profile from '../screens/customer/profile/Profile';
import NotificationScreen from '../screens/customer/notifications/NotificationScreen';

const Tab = createBottomTabNavigator();
const styles = StyleSheet.create({
  container: {
    // display: 'none',
    borderRadius: 50,
    bottom: 30,
    backgroundColor: 'transparent',
    marginHorizontal: 20,
    overflow: 'hidden',
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
    screen: 'Notifications',
    icon: 'notifications-outline',
    Component: NotificationScreen,
  },
  {
    id: 2,
    title: 'categories',
    screen: 'Categories',
    icon: 'grid',
    Component: Category,
  },
  {
    id: 3,
    title: 'home',
    screen: 'Home',
    icon: 'home',
    Component: Home,
  },
  {
    id: 4,
    title: 'voucher',
    screen: 'Voucher',
    icon: 'wallet-outline',
    Component: Voucher,
  },
  {
    id: 5,
    title: 'profile',
    screen: 'Profile',
    icon: 'user',
    Component: Profile,
  },
  // {
  //   id: 6,
  //   title: 'profile',
  //   screen: 'Test',
  //   icon: 'user',
  //   Component: TestCarosell,
  // },
];
const BottomTabNavigation: React.FC = () => {
  const { isLogin } = useSelector(
    (state: InterfaceAccountState) => state.accountReducer,
  );

  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: styles.container,
          // tabBarBackground: tabBarBackground,
        }}>
        {tabs.map(item => (
          <Tab.Screen
            key={item.id}
            name={item.screen}
            component={
              item.screen === 'Home'
                ? item.Component
                : // Sửa lại isLogin --Nhật
                !isLogin
                  ? item.Component
                  : LoginScreen
            }
            options={{
              tabBarButton: props => (
                <TabButton
                  name={item.icon}
                  accessibilityState={props.accessibilityState}
                  onPress={() => { }}
                  {...props}
                />
              ),
            }}
          />
        ))}
      </Tab.Navigator>
    </>
  );
};

export default BottomTabNavigation;
