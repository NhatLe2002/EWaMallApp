import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {COLORS, FONTS, SIZES} from '../../constant/theme';
import {formatPriceToVND} from '../../config/FixPrice';
import LinearGradient from 'react-native-linear-gradient';
import MethodPay from './MethodPay';
import {useSelector} from 'react-redux';
import {InterfaceCartState} from '../../constant/interface';
const InfoProduct: React.FC<{filteredCartListByShop: any[]}> = ({
  filteredCartListByShop,
}) => {
  const price = 200000;
  const formattedPrice = formatPriceToVND(price);

  return (
    <View style={styles.container}>
      {filteredCartListByShop.map((shop, index) => (
        <View key={index}>
          <View style={styles.headerShop}>
            <MaterialCommunityIcons
              name="storefront-outline"
              size={18}
              color="#7F7F7F"
            />
            <Text style={styles.textShop}>{`Shop ${shop.sellerId}`}</Text>
          </View>
          {shop.products.map(
            (
              product: {
                image: any;
                productName: string;
                name: string;
                cost: number;
                quantity: any;
              },
              productIndex: React.Key | null | undefined,
            ) => (
              <View key={productIndex} style={styles.containerProduct}>
                <Image
                  source={{uri: product.image}}
                  style={styles.imageProduct}
                />
                <View style={styles.infoProduct}>
                  <View>
                    <Text numberOfLines={1}>{product.productName}</Text>
                    <Text style={{color: '#777777', fontSize: 12}}>
                      {product.name}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={styles.textInfor}>
                      {formatPriceToVND(product.cost)}
                    </Text>

                    <Text
                      style={
                        styles.textInfor
                      }>{`Số lượng: x${product.quantity}`}</Text>
                  </View>
                </View>
              </View>
            ),
          )}
        </View>
      ))}
      <View style={styles.containerVoucher}>
        <View style={styles.addVoucher}>
          <Ionicons name="ticket-outline" size={16} color={COLORS.red_price} />
          <Text style={{fontSize: 13, color: COLORS.gray_2}}>
            Shop khuyến mãi
          </Text>
        </View>
        <Feather name="chevron-right" size={16} color={COLORS.gray_2} />
      </View>
      <MethodPay />
      <View style={styles.containerVoucher}>
        <Text style={{fontSize: 13, color: COLORS.gray_2}}>
          Ghi chú cho shop
        </Text>
      </View>
    </View>
  );
};

export default InfoProduct;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingTop: '2%',
    marginBottom: 10,
  },
  headerShop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: '5%',
  },
  textShop: {
    fontFamily: FONTS.inter_SemiBold,
  },
  containerProduct: {
    paddingHorizontal: '5%',
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    paddingVertical: '2%',
    backgroundColor: 'rgba(217, 217, 217, 0.08)',
    marginBottom: 10,
  },
  imageProduct: {
    width: SIZES.width / 6,
    height: SIZES.width / 5,
    borderRadius: 5,
  },
  infoProduct: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '1%',
  },
  textInfor: {
    fontFamily: FONTS.inter_regular,
    fontSize: 14,
    color: '#777777',
  },
  containerVoucher: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: '2%',
    paddingHorizontal: '5%',
    borderWidth: 1,
    borderColor: COLORS.border_1,
    zIndex: 2,
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
  containerMethodPay: {
    paddingHorizontal: '5%',
  },
  contentMethodPay: {},
});
