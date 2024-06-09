import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';

import {COLORS, FONTS, SIZES} from '../../constant/theme';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TitleReusable from '../../reusables/Text/TitleReusable';
import HeightSpacer from '../../reusables/height_spacer/HeightSpacer';
import {useDispatch, useSelector} from 'react-redux';
import {getOrderByUserId} from '../../redux/slice/orderSlice';
import {
  InterfaceAccountState,
  InterfaceOrderState,
} from '../../constant/interface';
import {OrderAllByUserId, Status} from '../../constant/types';
import {Badge} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
const ManageOrder: React.FC = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();
  const {userId} = useSelector(
    (state: InterfaceAccountState) => state.accountReducer,
  );
  const {pendingOrders, waitingOrders, deliveryOrders, successOrders} =
    useSelector((state: InterfaceOrderState) => state.orderReducer);

  const handleTabPress = (tab: string) => {
    navigation.navigate('OrderScreen', {activeTab: tab});
  };
  useEffect(() => {
    dispatch(getOrderByUserId(userId));
  }, [dispatch]);

  return (
    <>
      <TitleReusable
        text="Đơn hàng"
        size={18}
        color={COLORS.black}
        font={FONTS.inter_SemiBold}
        subTitle="Xem thêm"
        colorSub={COLORS.gray_2}
        sizeSub={12}
        icon="chevron-right"
      />
      <HeightSpacer height={SIZES.height / 70} />
      <View
        style={{
          shadowColor: 'gray',
          shadowOffset: {width: 3, height: 4},
          shadowOpacity: 0.4,
          shadowRadius: 7,
        }}>
        <LinearGradient
          style={styles.lineargradient}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}
          colors={['#F4C64F', 'rgba(233, 187, 69, 0.71)']}>
          <View style={styles.containerOptions}>
            <TouchableOpacity
              onPress={() => {
                handleTabPress('pendingOrders');
              }}
              style={styles.option}>
              <MaterialCommunityIcons
                name="note-edit-outline"
                size={30}
                color="white"
              />
              <Badge
                value={
                  pendingOrders?.length.toString()
                    ? pendingOrders?.length.toString()
                    : '0'
                }
                textStyle={{fontSize: 14, color: COLORS.yellowMain}}
                badgeStyle={{
                  backgroundColor: 'white',
                  borderWidth: 1,
                  borderColor: 'white',

                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                }}
                containerStyle={{
                  position: 'absolute',
                  top: -5,
                  right: 17,
                }}
              />

              <Text style={styles.textIcon}>Chờ xác nhận</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleTabPress('waitingOrders');
              }}
              style={styles.option}>
              <Feather name="box" size={30} color="white" />
              <Badge
                value={
                  waitingOrders?.length.toString()
                    ? waitingOrders?.length.toString()
                    : '0'
                }
                textStyle={{fontSize: 14, color: COLORS.yellowMain}}
                badgeStyle={{
                  backgroundColor: 'white',
                  borderWidth: 1,
                  borderColor: 'white',

                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                }}
                containerStyle={{
                  position: 'absolute',
                  top: -5,
                  right: 17,
                }}
              />
              <Text style={styles.textIcon}>Chờ lấy hàng</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => {
                handleTabPress('deliveryOrders');
              }} style={styles.option}>
              <MaterialCommunityIcons
                name="truck-fast-outline"
                size={30}
                color="white"
              />
              <Badge
                value={
                  deliveryOrders?.length.toString()
                    ? deliveryOrders?.length.toString()
                    : '0'
                }
                textStyle={{fontSize: 14, color: COLORS.yellowMain}}
                badgeStyle={{
                  backgroundColor: 'white',
                  borderWidth: 1,
                  borderColor: 'white',

                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                }}
                containerStyle={{
                  position: 'absolute',
                  top: -5,
                  right: 9,
                }}
              />
              <Text style={styles.textIcon}>Đang vận chuyển</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                handleTabPress('successOrders');
              }} style={styles.option}>
              <MaterialCommunityIcons
                name="star-circle-outline"
                size={30}
                color="white"
              />
              <Badge
                value={
                  successOrders?.length.toString()
                    ? successOrders?.length.toString()
                    : '0'
                }
                textStyle={{fontSize: 14, color: COLORS.yellowMain}}
                badgeStyle={{
                  backgroundColor: 'white',
                  borderWidth: 1,
                  borderColor: 'white',

                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                }}
                containerStyle={{
                  position: 'absolute',
                  top: -5,
                  right: 9,
                }}
              />
              <Text style={styles.textIcon}>Feedback</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </>
  );
};

export default ManageOrder;

const styles = StyleSheet.create({
  lineargradient: {
    marginHorizontal: '2%',
    padding: '2%',
    borderRadius: 10,
  },
  containerOptions: {
    padding: '2%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  option: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 5,
    maxWidth: '25%',
  },
  textIcon: {
    fontSize: 12,
    textAlign: 'center',
    flexWrap: 'wrap',
    color: 'white',
    fontFamily: FONTS.inter_medium,
  },
});
