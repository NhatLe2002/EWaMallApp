import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {InterfaceOrderState} from '../../constant/interface';
import HeaderCommon from '../../reusables/header/HeaderCommon';
import {COLORS} from '../../constant/theme';
import {useNavigation} from '@react-navigation/native';
import {createOrder} from '../../redux/slice/orderSlice';

const QrScreen = () => {
  const {info_order} = useSelector(
    (state: InterfaceOrderState) => state.orderReducer,
  );
  console.log(info_order.totalCost);
  const bankId = 'MB';
  const accountNo = '0377899819';
  const template = 'compact2';
  const amount = info_order.totalCost + info_order.shipCost; // Replace with the actual amount
  const addInfo = 'Payment for services'; // Replace with the actual description
  const accountName = 'Lê Văn Minh Nhật'; // Replace with the actual account name

  const imageUrl = `https://img.vietqr.io/image/${bankId}-${accountNo}-${template}.png?amount=${amount}&addInfo=${encodeURIComponent(
    addInfo,
  )}&accountName=${encodeURIComponent(accountName)}`;
  const dispatch = useDispatch<any>();
  const navigation = useNavigation<any>();
  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(createOrder(info_order));
      navigation.navigate('PaymentSuccesful');
    }, 10000);

    return () => clearTimeout(timeout);
  }, [navigation]);
  return (
    <View style={{flex: 1}}>
      <HeaderCommon
        title="Thanh toán"
        colorTitle={COLORS.black}
        colorBack={COLORS.black}
        backgroundColor={COLORS.white}
      />
      <Image
        style={{
          width: 350,
          height: 500,
          alignSelf: 'center',
          marginVertical: '10%',
        }}
        source={{uri: imageUrl}}
      />
    </View>
  );
};

export default QrScreen;

const styles = StyleSheet.create({});
