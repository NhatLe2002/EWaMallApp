import {
  ListRenderItem,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import HeaderCommon from '../../../reusables/header/HeaderCommon';
import {COLORS, SIZES} from '../../../constant/theme';
import {FlatList} from 'react-native-gesture-handler';
import PendingOrder from '../../../components/order_customer/PendingOrder';
import {OrderAllByUserId} from '../../../constant/types';
import {useRoute} from '@react-navigation/native';
import {InterfaceOrderState} from '../../../constant/interface';
import {useSelector} from 'react-redux';
import WaitingOrder from '../../../components/order_customer/WaitingOrder';
import DeliveryOrder from '../../../components/order_customer/DeliveryOrder';
import SuccessOrder from '../../../components/order_customer/SuccessOrder';
import CancelOrder from '../../../components/order_customer/CancelOrder';
import RefundOrder from '../../../components/order_customer/RefundOrder';

const OrderScreen: React.FC = () => {
  const route = useRoute<any>();
  const {activeTab} = route.params;

  const handleTabPress = (tab: string) => {
    // Chuyển đổi tab và cập nhật state activeTab
    console.log(tab);
    setActiveTab(tab);
  };
  const {
    pendingOrders,
    waitingOrders,
    deliveryOrders,
    successOrders,
    cancelOrd,
    refundOrders,
  } = useSelector((state: InterfaceOrderState) => state.orderReducer);

  const [activeTabs, setActiveTab] = useState<string>(activeTab);
  const renderOrders = () => {
    switch (activeTabs) {
      case 'pendingOrders':
        return pendingOrders;
      case 'waitingOrders':
        return waitingOrders;
      case 'deliveryOrders':
        return deliveryOrders;
      case 'successOrders':
        return successOrders;
      case 'cancelOrd':
        return cancelOrd;
      case 'refundOrders':
        return refundOrders;

      default:
        return [];
    }
  };
  const renderItem: ListRenderItem<OrderAllByUserId> = ({item}) => {
    if (activeTabs === 'pendingOrders') {
      return <PendingOrder item={item} />;
    }
    if (activeTabs === 'waitingOrders') {
      return <WaitingOrder item={item} />;
    }
    if (activeTabs === 'deliveryOrders') {
      return <DeliveryOrder item={item} />;
    }
    if (activeTabs === 'successOrders') {
      return <SuccessOrder  item={item}/>;
    }
    if (activeTabs === 'cancelOrd') {
      return <CancelOrder item={item}/>;
    }
    if (activeTabs === 'refundOrders') {
      return <RefundOrder  item={item}/>;
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <HeaderCommon
        title="Đơn mua"
        colorTitle={COLORS.black}
        colorBack={COLORS.yellowMain}
        backgroundColor={COLORS.white}
        icon1="search"
      />
      <ScrollView
        horizontal
        style={{zIndex: 2}}
        contentContainerStyle={styles.headerList}
        showsHorizontalScrollIndicator={false}>
        <TouchableOpacity
          style={[
            styles.buttonHeader,
            activeTabs === 'pendingOrders' && styles.activeTab,
          ]}
          onPress={() => handleTabPress('pendingOrders')}>
          <Text
            style={[activeTabs === 'pendingOrders' && styles.textActiveTab]}>
            Chờ xác nhận
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.buttonHeader,
            activeTabs === 'waitingOrders' && styles.activeTab,
          ]}
          onPress={() => handleTabPress('waitingOrders')}>
          <Text
            style={[activeTabs === 'waitingOrders' && styles.textActiveTab]}>
            Chờ lấy hàng
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.buttonHeader,
            activeTabs === 'deliveryOrders' && styles.activeTab,
          ]}
          onPress={() => handleTabPress('deliveryOrders')}>
          <Text
            style={[activeTabs === 'deliveryOrders' && styles.textActiveTab]}>
            Đang giao
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.buttonHeader,
            activeTabs === 'successOrders' && styles.activeTab,
          ]}
          onPress={() => handleTabPress('successOrders')}>
          <Text
            style={[activeTabs === 'successOrders' && styles.textActiveTab]}>
            Đã giao
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.buttonHeader,
            activeTabs === 'cancelOrd' && styles.activeTab,
          ]}
          onPress={() => handleTabPress('cancelOrd')}>
          <Text style={[activeTabs === 'cancelOrd' && styles.textActiveTab]}>
            Đã huỷ
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.buttonHeader,
            activeTabs === 'refundOrders' && styles.activeTab,
          ]}
          onPress={() => handleTabPress('refundOrders')}>
          <Text style={[activeTabs === 'refundOrders' && styles.textActiveTab]}>
            Trả hàng
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <FlatList
        data={renderOrders()}
        renderItem={renderItem}
        keyExtractor={item => item.orderCode}
      />
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'white',
    zIndex: 10,
  },
  headerList: {
    backgroundColor: COLORS.white,
    zIndex: 10,
  },
  buttonHeader: {
    borderBottomWidth: 2,
    paddingHorizontal: SIZES.width / 30,
    paddingVertical: SIZES.height / 90,
    borderBottomColor: COLORS.border_gray,
  },
  activeTab: {
    borderBottomColor: COLORS.yellowMain,
  },
  textActiveTab: {
    color: COLORS.yellowMain,
  },
});
