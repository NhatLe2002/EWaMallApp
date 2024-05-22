import React from 'react';
import {useSelector} from 'react-redux';
import {InterfaceAccountState} from '../constant/interface';
import {View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const AuthGuard: React.FC<{children: React.ReactNode}> = ({children}) => {
  const {isLogin} = useSelector(
    (state: InterfaceAccountState) => state.accountReducer,
  );
  const navigation = useNavigation();

  if (!isLogin) {
   
    navigation.navigate('Login' as never);
    return null; 
  }

  return <>{children}</>;
};

export default AuthGuard;
