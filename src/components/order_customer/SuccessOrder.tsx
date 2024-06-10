import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {OrderAllByUserId} from '../../constant/types';import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, FONTS, SIZES } from '../../constant/theme';
import { formatPriceToVND } from '../../config/FixPrice';

interface Props {
  item: OrderAllByUserId;
}
const SuccessOrder: React.FC<Props> = ({item}) => {  const totalQuantity = item?.orderDetails.reduce(
  (total, detail) => total + detail.quantity,
  0,
);
    return (
      <View style={styles.container}>
        <View style={styles.headerShop}>
          <Text style={{fontFamily: FONTS.inter_SemiBold, fontSize: 16}}>
          {item?.orderDetails[0].productSellDetail.product.seller.shopName}
          </Text>
          <Text style={{fontFamily: FONTS.inter_regular, color: '#dd2504'}}>
            Chờ thanh toán
          </Text>
        </View>
  
        <View style={styles.productContainer}>
          <View
            style={{
              width: SIZES.width / 7,
              height: SIZES.height / 13,
              backgroundColor: 'red',
            }}></View>
          <View style={styles.contentProduct}>
            <Text numberOfLines={1} style={{fontSize: 16}}>
              {item?.orderDetails[0].productSellDetail.product.productName}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{color: COLORS.gray_2, fontSize: 12}}>
                {item?.orderDetails[0].productSellDetail.name}
              </Text>
              <Text style={{color: COLORS.black, fontSize: 12}}>
                x{item?.orderDetails[0].quantity}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text>Trả hàng miễn phí 15 ngày</Text>
              <Text>
                {formatPriceToVND(item?.orderDetails[0].productSellDetail.price)}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderColor: COLORS.border_gray,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            paddingVertical: '2%',
            marginVertical: '2%',
          }}>
          <Text style={{color: COLORS.gray_2, fontSize: 12}}>
            {totalQuantity} sản phẩm
          </Text>
          <Text>
            Tổng thanh toán:
            <Text style={{color: '#dd2504'}}>
              {formatPriceToVND(item?.totalCost + item?.shipCost)}
            </Text>
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingBottom: '2%',
            marginBottom: '2%',
            borderBottomWidth: 1,
            gap: 10,
            borderColor: COLORS.border_gray,
          }}>
          <MaterialCommunityIcons
            name="truck-outline"
            size={20}
            color="#3baf49"
          />
          <Text
            style={{
              fontSize: 12,
              color: '#3baf49',
            }}>
           Giao thành công
          </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <View
            style={{
              paddingHorizontal: '5%',
              paddingVertical: '2%',
              backgroundColor: COLORS.yellowMain,
              borderRadius: 3,
            }}>

            <Text style={{color: 'white', fontSize: 14}}>Đánh giá</Text>
          </View>
        </View>
      </View>

  );
};

export default SuccessOrder;


const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingHorizontal: '3%',
    backgroundColor: 'white',
    marginTop: '2%',
    paddingVertical: '2%',
  },
  headerShop: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '3%',
  },
  productContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
  },
  contentProduct: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});
