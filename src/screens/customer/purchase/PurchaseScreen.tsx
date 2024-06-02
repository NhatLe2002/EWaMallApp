import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HeaderCommon from '../../../reusables/header/HeaderCommon';
import {COLORS, FONTS} from '../../../constant/theme';

import FooterPurchase from '../../../components/purchase/FooterPurchase';
import InfoAddress from '../../../components/purchase/InfoAddress';
import InfoProduct from '../../../components/purchase/InfoProduct';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import InfoPrice from '../../../components/purchase/InfoPrice';
import { useSelector } from 'react-redux';
import { InterfaceCartState } from '../../../constant/interface';
const PurchaseScreen: React.FC = () => {
  const {cartList, product_purchase} = useSelector(
    (state: InterfaceCartState) => state.cartReducer,
  );
  const filteredCartList = cartList.filter(
    (item: {productSellDetailId: number}) => {
      return product_purchase.includes(item.productSellDetailId);
    },
  );

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
    ([sellerId, products]) => ({
      sellerId: parseInt(sellerId),
      products: products,
    }),
  );
  const totalCost = filteredCartListByShop?.reduce((total, shop) => {
    const shopTotal = shop.products.reduce((subtotal, product) => {
      return subtotal + product.cost * product.quantity;
    }, 0);
    return total + shopTotal;
  }, 0);
  return (
    <View style={styles.container}>
      <HeaderCommon
        title="Thanh toán"
        colorTitle={COLORS.white}
        colorBack={COLORS.white}
        backgroundColor={COLORS.yellowMain}
      />
      <ScrollView style={styles.content}>
        <InfoAddress />
        <InfoProduct filteredCartListByShop={filteredCartListByShop} />
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
      <FooterPurchase  totalCost={totalCost}  />
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
