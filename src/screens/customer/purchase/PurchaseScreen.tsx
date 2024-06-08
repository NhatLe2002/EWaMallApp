import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import HeaderCommon from '../../../reusables/header/HeaderCommon';
import {COLORS, FONTS} from '../../../constant/theme';

import FooterPurchase from '../../../components/purchase/FooterPurchase';
import InfoAddress from '../../../components/purchase/InfoAddress';
import InfoProduct from '../../../components/purchase/InfoProduct';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import InfoPrice from '../../../components/purchase/InfoPrice';
import {useDispatch, useSelector} from 'react-redux';
import {
  InterfaceAccountState,
  InterfaceAddressState,
  InterfaceCartState,
  InterfaceOrderState,
} from '../../../constant/interface';
import {shipAddressByUserId} from '../../../redux/slice/addressSlice';
import {setTotalCost, setUserId} from '../../../redux/slice/orderSlice';
const PurchaseScreen: React.FC = () => {
  const dispatch = useDispatch<any>();
  const {cartList, product_purchase} = useSelector(
    (state: InterfaceCartState) => state.cartReducer,
  );

  const {userId} = useSelector(
    (state: InterfaceAccountState) => state.accountReducer,
  );
  const {listShipAddress} = useSelector(
    (state: InterfaceAddressState) => state.addressReducer,
  );
  const {info_order} = useSelector(
    (state: InterfaceOrderState) => state.orderReducer,
  );
  const filteredCartList = cartList
    .filter((item: {productSellDetailId: any}) => {
      return product_purchase.includes(item.productSellDetailId);
    })
    .map((item: {sellerName: any}) => {
      return {
        ...item,
        sellerName: item.sellerName,
      };
    });

  const productsByShop: {[sellerId: number]: any[]} = filteredCartList.reduce(
    (acc: {[x: string]: any[]}, item: {sellerId: string | number}) => {
      if (!acc[item.sellerId]) {
        acc[item.sellerId] = [];
      }
      acc[item.sellerId].push(item);
      return acc;
    },
    {},
  );

  const filteredCartListByShop = Object.entries(productsByShop).map(
    ([sellerId, products]) => {
      const sellerName = products[0]?.sellerName;
      return {
        sellerId: parseInt(sellerId),
        sellerName: sellerName,
        products: products,
      };
    },
  );
  const totalCost = filteredCartListByShop?.reduce((total, shop) => {
    const shopTotal = shop.products.reduce((subtotal, product) => {
      return subtotal + product.cost * product.quantity;
    }, 0);
    return total + shopTotal;
  }, 0);
  const defaultAddress = listShipAddress?.find(
    (address: {isDefault: any}) => address.isDefault,
  );

  useEffect(() => {
    dispatch(shipAddressByUserId(userId));
    if (totalCost != null) {
      dispatch(setTotalCost(totalCost));
    }
    if (userId != null) {
      dispatch(setUserId(userId));
    }
  }, [dispatch, cartList, info_order]);

  return (
    <View style={styles.container}>
      <HeaderCommon
        title="Thanh toán"
        colorTitle={COLORS.white}
        colorBack={COLORS.white}
        backgroundColor={COLORS.yellowMain}
      />
      <ScrollView style={styles.content}>
        <InfoAddress listShipAddress={defaultAddress} />
        {filteredCartListByShop.map(shop => (
          <InfoProduct
            key={shop.sellerId}
            totalCost={totalCost}
            addressShip={defaultAddress}
            filteredCartListByShop={shop}
          />
        ))}

        {/* Voucher */}
        <View style={styles.containerVoucher}>
          <View style={styles.addVoucher}>
            <Ionicons
              name="ticket-outline"
              size={18}
              color={COLORS.red_price}
            />
            <Text style={{fontSize: 14, color: COLORS.gray_2}}>
              Mã giảm giá
            </Text>
          </View>
          <View style={styles.addVoucher}>
            <Text style={styles.textAddVoucher}>Chọn hoặc nhập mã</Text>
            <Feather name="chevron-right" size={16} color={COLORS.gray_2} />
          </View>
        </View>
        {/* Method Pay */}
        <View style={styles.containerVoucher}>
          <Text style={styles.textHeader}>Phương thức thanh toán</Text>
          <View style={styles.addVoucher}>
            <Text style={styles.textAddVoucher}>Xem tất cả</Text>
            <Feather name="chevron-right" size={16} color={COLORS.gray_2} />
          </View>
        </View>
        <InfoPrice totalCost={totalCost} />
      </ScrollView>
      <FooterPurchase totalCost={totalCost} />
    </View>
  );
};

export default PurchaseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  content: {
    flexDirection: 'column',
  },
  containerVoucher: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: '3%',
    paddingHorizontal: '5%',
    borderWidth: 1,
    borderColor: COLORS.border_1,
    zIndex: 2,
    marginBottom: 10,
  },
  addVoucher: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  textAddVoucher: {
    color: COLORS.gray_2,
    fontSize: 12,
  },
  textHeader: {
    fontFamily: FONTS.inter_SemiBold,
  },
});
