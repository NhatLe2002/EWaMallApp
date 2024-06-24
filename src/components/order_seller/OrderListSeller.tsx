import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { InterfaceOrderState } from '../../constant/interface';
import { OrderGetBySellerId } from '../../constant/types/orderType';
import { COLORS } from '../../constant/theme';
import {
  getAllOrderBySellerId,
  updateOrderStatus,
} from '../../redux/slice/orderSlice';
import { ISellerState } from '../../constant/interface/sellerInterface';
import Icon from 'react-native-vector-icons/Feather';  // Import the Feather icon library

const OrderListSeller = ({ selectedId }: any) => {
  const dispatch = useDispatch<any>();
  const { orderListBySellerId, orderListBySellerIdRenderRedux } = useSelector(
    (state: InterfaceOrderState) => state.orderReducer,
  );

  const [isLoading, setIsLoading] = useState(false);
  const { seller } = useSelector((state: ISellerState) => state.sellerReducer);

  const handleAcceptOrder = async (orderId: number, statusCode: string) => {
    setIsLoading(true);
    await dispatch(
      updateOrderStatus({ orderId: orderId, statusCode: statusCode }),
    );
    dispatch(getAllOrderBySellerId(seller?.seller?.id));
    setIsLoading(false);
  };

  const confirmAcceptOrder = (orderId: number, statusCode: string) => {
    Alert.alert(
      "Xác nhận",
      "Bạn có chắc chắn muốn chấp nhận đơn hàng này?",
      [
        {
          text: "Đồng ý",
          onPress: () => handleAcceptOrder(orderId, statusCode)
        },
        {
          text: "Hủy",
          style: "cancel"
        }
      ]
    );
  };

  const formatDate = (date: string) => {
    const [year, month, day] = new Date(date).toISOString().split('T')[0].split('-');
    return `${day}/${month}/${year}`;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const renderItem = ({ item }: { item: OrderGetBySellerId }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemTitleContainer}>
        <Icon name="package" size={20} color="gray" style={styles.iconStyle} />
        <Text style={styles.orderCodeText}>
          Mã đơn hàng: <Text style={{ color: 'red' }}>{item.orderCode}</Text>
        </Text>
        <Text style={styles.statusText}>{item.status.name}</Text>
      </View>
      <View style={styles.separator} />
      <View style={styles.itemBodyContainer}>
        <View style={styles.itemBodyDescription}>
          <Text style={styles.orderDateText}>Ngày đặt hàng: {formatDate(item.orderDate)}</Text>
          <Text style={styles.totalCostText}>Tổng hóa đơn: {formatCurrency(item.totalCost)}</Text>
          <TouchableOpacity style={styles.detailButton}>
            <Text style={styles.detailButtonText}>Chi tiết đơn hàng</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.separator} />
      <View style={styles.buttonContainer}>
        {selectedId === 1 && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => confirmAcceptOrder(item.id, 'WAITING')}>
            <Text style={styles.actionButtonText}>Chấp nhận đơn hàng</Text>
          </TouchableOpacity>
        )}
        {selectedId === 2 && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => confirmAcceptOrder(item.id, 'DELIVERY')}>
            <Text style={styles.actionButtonText}>Giao hàng</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={orderListBySellerIdRenderRedux}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      {isLoading && <ActivityIndicator style={styles.loadingIndicator} />}
    </View>
  );
};

export default OrderListSeller;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  loadingIndicator: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    alignSelf: 'center',
  },
  itemContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  itemTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  iconStyle: {
    marginRight: 10,
  },
  orderCodeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  statusText: {
    fontSize: 16,
    color: COLORS.red,
  },
  itemBodyContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  itemBodyDescription: {
    flex: 1,
    justifyContent: 'space-between',
  },
  orderDateText: {
    fontSize: 14,
    color: COLORS.black,
    marginBottom: 5,
    alignSelf: 'flex-end',
  },
  totalCostText: {
    fontSize: 14,
    color: COLORS.black,
    marginBottom: 10,
    alignSelf: 'flex-end',
  },
  detailButton: {
    alignSelf: 'flex-end',
  },
  detailButtonText: {
    fontSize: 14,
    color: '#FFA500',  // Changed to orange-yellow color
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  separator: {
    borderBottomColor: '#e0e0e0',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
});
