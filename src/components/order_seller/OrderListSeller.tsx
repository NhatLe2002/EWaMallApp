import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {InterfaceOrderState} from '../../constant/interface';
import {OrderGetBySellerId} from '../../constant/types/orderType';
import HeightSpacerSeller from '../../reusables/height_spacer/HeightSpacerSeller';
import {COLORS} from '../../constant/theme';
import {updateProductDetailWithImages} from '../../features/GetImage';
import {Product} from '../../constant/types';
import {
  getAllOrderBySellerId,
  updateOrderStatus,
} from '../../redux/slice/orderSlice';
import {ISellerState} from '../../constant/interface/sellerInterface';

const OrderListSeller = ({selectedId}: any) => {
  const dispatch = useDispatch<any>();
  const {orderListBySellerId, orderListBySellerIdRenderRedux} = useSelector(
    (state: InterfaceOrderState) => state.orderReducer,
  );
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {seller} = useSelector((state: ISellerState) => state.sellerReducer);
  const fetchProductImages = async (product: Product) => {
    const updatedList = await updateProductDetailWithImages(product);
    return updatedList.imageUrls;
  };

  const handleAcceptOrder = async (orderId: number, statusCode: string) => {
    setIsLoading(true);
    await dispatch(
      updateOrderStatus({orderId: orderId, statusCode: statusCode}),
    );
    dispatch(getAllOrderBySellerId(seller?.seller?.id));
    setIsLoading(false);
  };

  const confirmAcceptOrder = (orderId: number, statusCode: string) => {
    Alert.alert(
      "Chào bạn",
      "Đồng ý làm người yêu tớ nhé?",
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

  const renderItem = ({item}: {item: OrderGetBySellerId}) => (
    <View>
      <HeightSpacerSeller height={10} color="#b1b1b1" />
      <View style={styles.itemContainer}>
        <View style={styles.itemTitleContainner}>
          <Text style={styles.userNameText}>
            Mã đơn hàng : <Text style={{color: 'red'}}>{item.orderCode}</Text>
          </Text>
          <Text style={styles.statusText}>{item.status.name}</Text>
        </View>
        <View style={styles.itemBodyContainner}>
          <View style={styles.itemImageContainer}>
            <Image
              style={styles.itemImage}
              // source={uri : {fetchProductImages(item.orderDetails?.productSellDetail?.product)}}
            />
          </View>
          <View style={styles.itemBodyDescription}>
            <Text style={{color: COLORS.black}}>
              Ngày đặt hàng : {item.orderDate}
            </Text>
            <View style={styles.buttonContainner}>
              <TouchableOpacity>
                <Text>Chi tiết đơn hàng</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.itemBottomContainner}>
          <Text style={styles.itemText}></Text>
          <Text>Tổng hóa đơn: {item.totalCost}</Text>
        </View>
        <View style={styles.buttonContainner}>
          {selectedId === 1 && (
            <TouchableOpacity
              onPress={() => confirmAcceptOrder(item.id, 'WAITING')}>
              <Text>Chấp nhận đơn hàng</Text>
            </TouchableOpacity>
          )}
          {selectedId === 2 && (
            <TouchableOpacity
              onPress={() => confirmAcceptOrder(item.id, 'DELIVERY')}>
              <Text>Giao hàng</Text>
            </TouchableOpacity>
          )}
        </View>
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
    // flex: 1,
  },
  loadingIndicator: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    alignSelf: 'center',
  },
  //Item
  itemContainer: {
    justifyContent: 'center',
    flexDirection: 'column',
    marginHorizontal: 10,
  },
  itemTitleContainner: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: 10,
  },
  userNameText: {
    fontSize: 15,
    color: COLORS.black,
  },
  statusText: {
    color: COLORS.red,
    fontSize: 20,
  },
  itemBodyContainner: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: 5,
  },
  itemBodyDescription: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'column',
  },
  itemImage: {
    flex: 1,
  },
  itemImageContainer: {
    width: '25%',
    aspectRatio: 1 / 1,
    borderColor: COLORS.black,
    // borderWidth: 0.5,
  },
  itemBottomContainner: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: 5,
    paddingVertical: 5,
    borderBottomColor: COLORS.gray_1,
    borderBottomWidth: 0.5,
  },
  itemText: {
    color: COLORS.black,
    fontSize: 15,
  },
  buttonContainner: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: COLORS.gray_1,
    borderBottomWidth: 0.5,
  },
  bottonContainner: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
