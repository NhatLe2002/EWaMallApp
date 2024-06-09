import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderTitleSeller from '../../reusables/Title/HeaderTitleSeller';
import {TouchableOpacity} from 'react-native';
import {COLORS} from '../../constant/theme';
import {useDispatch, useSelector} from 'react-redux';
import {InterfaceOrderState} from '../../constant/interface';
import {
  getAllOrderBySellerId,
  setOrderListBySellerIDRenderRedux,
} from '../../redux/slice/orderSlice';
import OrderListSeller from './OrderListSeller';
import {OrderGetBySellerId} from '../../constant/types/orderType';
import {updateProductDetailWithImages} from '../../features/GetImage';
import {Product} from '../../constant/types';
import {ISellerState} from '../../constant/interface/sellerInterface';
import {fetchAllStatus} from '../../redux/slice/statusOrderSlice';
import {IOrderStatusState} from '../../constant/interface/IStatusOrder';
import {orderStatus} from '../../constant/types/statusOrderType';

// const orderStatuss = [
//   {id: 1, name: 'Chờ xác nhận', quantity: 7},
//   {id: 2, name: 'Chờ lấy hàng', quantity: 7},
//   {id: 3, name: 'Đang giao', quantity: 7},
//   {id: 4, name: 'Đã giao', quantity: 7},
//   {id: 5, name: 'Đã hủy', quantity: 7},
//   {id: 6, name: 'Trả hàng/Hoàn tiền', quantity: 7},
//   {id: 8, name: 'Giao không thành công', quantity: 7},
// ];
const renderRecentItems = (selectedId: any) => {
  if (selectedId === 1) {
    return [
      {id: 1, name: 'Gần đây'},
      {id: 2, name: 'Tất cả'},
      {id: 3, name: 'Hỗ trợ'},
    ];
  } else if (selectedId === 2) {
    return [
      {id: 1, name: 'Thêm sản phẩm'},
      {id: 2, name: 'Chỉnh sửa'},
    ];
  } else {
    return [];
  }
};
const OrderheaderSeller = () => {
  const [orderStatuss, setOrderStatuss] = useState<orderStatus[]>([]);
  const [selectedId, setSelectedId] = useState(1);
  const [selectedRecentItemId, setSelectedRecentItemId] = useState(1);
  const dispatch = useDispatch<any>();
  const [ordertListFilter, setProductListFilter] = useState<
    OrderGetBySellerId[]
  >([]);
  const {orderListBySellerId} = useSelector(
    (state: InterfaceOrderState) => state.orderReducer,
  );
  const {seller} = useSelector((state: ISellerState) => state.sellerReducer);
  const {statusList} = useSelector(
    (state: IOrderStatusState) => state.orderStatusReducer,
  );
  const filterProductsByStatus = (status: number) => {
    return orderListBySellerId?.filter((order: OrderGetBySellerId) => order.statusId === status);
};
  useEffect(() => {
    // dispatch(getAllOrderBySellerId(seller?.id));
    dispatch(fetchAllStatus());
    // console.log(JSON.stringify(seller, null, 2));
    // console.log(seller?.seller?.id)
    dispatch(getAllOrderBySellerId(seller?.seller?.id));
    // cho nayf can lay statuslist ra truoc ?
    // console.log(JSON.stringify(orderListBySellerId,null,2));
    setOrderStatuss(statusList);
    // console.log(JSON.stringify(orderListBySellerId, null, 2));
    // console.log(JSON.stringify(orderListBySellerId, null, 2))
  }, [statusList]);
  useEffect(() => {
    const activeProducts = filterOrderByStatus(selectedId);
    setProductListFilter(activeProducts);
    // console.log("log" ,orderListBySellerId);
    dispatch(setOrderListBySellerIDRenderRedux(activeProducts));
  }, [selectedId, orderListBySellerId]);
  const filterOrderByStatus = (status: number) => {
    return orderListBySellerId?.filter(
      (order: OrderGetBySellerId) => order.statusId === status,
    );
  };

  return (
    <View style={styles.containner}>
      <View style={{marginTop: 15}}>
        <HeaderTitleSeller text={'Đơn hàng của tôi'} />
      </View>
      <View style={{marginTop: 10}}>
        <ScrollView
          horizontal={true}
          contentContainerStyle={styles.scrollViewContent}>
          {orderStatuss.map(product => (
            <TouchableOpacity
              key={product.id}
              style={[
                styles.touchable,
                selectedId === product.id && styles.selectedTouchable,
              ]}
              onPress={() => setSelectedId(product.id)}>
              <Text
                style={[
                  styles.text,
                  selectedId === product.id && styles.selectedText,
                ]}>
                {product.name}
              </Text>
              <Text
                style={[
                  styles.text,
                  selectedId === product.id && styles.selectedText,
                ]}>
                {filterProductsByStatus(product.id)?.length}
              </Text>
              {selectedId === product.id && <View style={styles.underline} />}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View>
        <View>
          <ScrollView horizontal={true}>
            {renderRecentItems(selectedId).map(item => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.recentTouchable,
                  selectedRecentItemId === item.id &&
                    styles.selectedRecentTouchable, // Thay đổi kiểu CSS khi được chọn
                ]}
                onPress={() => setSelectedRecentItemId(item.id)} // Cập nhật ID của mục "Gần đây" được chọn
              >
                <Text
                  style={[
                    styles.text,
                    selectedRecentItemId === item.id && {color: COLORS.white},
                  ]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
      <OrderListSeller selectedId={selectedId} />
    </View>
  );
};

export default OrderheaderSeller;

const styles = StyleSheet.create({
  containner: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollViewContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  touchable: {
    marginRight: 20,
    padding: 10,
    backgroundColor: COLORS.white,
    borderRadius: 5,
    alignItems: 'center',
  },
  selectedTouchable: {
    borderBottomWidth: 2,
    borderBottomColor: 'yellow',
  },
  text: {
    color: 'black',
  },
  selectedText: {
    color: '#E9BB45',
  },
  underline: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#E9BB45',
  },
  recentTouchable: {
    marginTop: 10,
    marginLeft: 20,
    paddingVertical: 3,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    minWidth: 80,
    marginBottom: 10,
  },
  selectedRecentTouchable: {
    backgroundColor: '#CBBA63',
    color: 'white',
  },
});
