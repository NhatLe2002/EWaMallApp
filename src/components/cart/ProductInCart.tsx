import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Cart, CartProductTypes} from '../../constant/types';
import {COLORS, FONTS, SIZES} from '../../constant/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckBox from '../../reusables/checkbox/CheckBox';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {formatPriceToVND} from '../../config/FixPrice';
import {useDispatch, useSelector} from 'react-redux';
import {
  decreaseQuantity,
  increaseQuantity,
  setProductBuy,
} from '../../redux/slice/cartSlice';
import {InterfaceOrderState} from '../../constant/interface';

interface Props {
  item: CartProductTypes;
  sellerCheckboxState: boolean;
  productCheckboxStates: {[key: number]: boolean};
  selectedProducts: number[];
  setSellerCheckboxState: React.Dispatch<React.SetStateAction<boolean>>;
  setProductCheckboxStates: React.Dispatch<
    React.SetStateAction<{[key: number]: boolean}>
  >;
  setSelectedProducts: React.Dispatch<React.SetStateAction<number[]>>;
}

const ProductInCart: React.FC<Props> = ({
  item,
  sellerCheckboxState,
  productCheckboxStates,
  selectedProducts,
  setSellerCheckboxState,
  setProductCheckboxStates,
  setSelectedProducts,
}) => {
  const dispatch = useDispatch<any>();

  const {product_purchase} = useSelector(
    (state: InterfaceOrderState) => state.orderReducer,
  );
  const handleToggleSellerCheckbox = (sellerId: number) => {
    const sellerProducts = item.products.filter(
      product => product.sellerId === sellerId,
    );
    const newProductCheckboxStates = {...productCheckboxStates};
    const newSelectedProducts: React.SetStateAction<number[]> = [];

    const newSellerCheckboxState = !sellerCheckboxState;
    setSellerCheckboxState(newSellerCheckboxState);

    sellerProducts.forEach(product => {
      newProductCheckboxStates[product.productSellDetailId] =
        newSellerCheckboxState;
      if (newSellerCheckboxState) {
        newSelectedProducts.push(product.productSellDetailId);
      }
    });

    setProductCheckboxStates(newProductCheckboxStates);
    setSelectedProducts(newSelectedProducts);
  };
  const handleToggleProductCheckbox = (productSellDetailId: number) => {
    setProductCheckboxStates(prevState => ({
      ...prevState,
      [productSellDetailId]: !prevState[productSellDetailId],
    }));
    setSelectedProducts(prevProducts => {
      if (prevProducts.includes(productSellDetailId)) {
        return prevProducts.filter(id => id !== productSellDetailId);
      } else {
        return [...prevProducts, productSellDetailId];
      }
    });
  };

  useEffect(() => {
    const allProductsSelected = item.products.every(
      product => productCheckboxStates[product.productSellDetailId],
    );
    setSellerCheckboxState(allProductsSelected);
    dispatch(setProductBuy(selectedProducts));
  }, [productCheckboxStates]);

  const handleIncreaseQuantity = (cartId: number, quantity: number) => {
    dispatch(increaseQuantity({cartId, quantity}));
  };
  const handleDecreaseQuantity = (cartId: number, quantity: number) => {
    dispatch(decreaseQuantity({cartId, quantity}));
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerShop}>
        <CheckBox
          onPress={() => handleToggleSellerCheckbox(item.sellerId)}
          isChecked={sellerCheckboxState}
        />
        <MaterialCommunityIcons
          name="storefront-outline"
          size={20}
          color="#7F7F7F"
        />
        <Text style={styles.textShop}>{item.sellerName}</Text>
      </View>
      {item.products.map(product => (
        <View style={styles.containerProduct} key={product.productSellDetailId}>
          <CheckBox
            onPress={() =>
              handleToggleProductCheckbox(product.productSellDetailId)
            }
            isChecked={
              productCheckboxStates[product.productSellDetailId] || false
            }
          />
          <Image
            style={styles.imageProduct}
            source={{uri: product.coverImageId}}
          />
          <View style={styles.infoProduct}>
            <Text style={styles.nameProduct} numberOfLines={1}>
              {product.productName}
            </Text>
            <View style={styles.classificationContainer}>
              <Text style={styles.classificationText}>Phân loại</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.price}>{formatPriceToVND(product.cost)}</Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  style={styles.buttonQuantity}
                  onPress={() => {
                    handleDecreaseQuantity(product.cartId, product.quantity);
                  }}>
                  <Text>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{product.quantity}</Text>
                <TouchableOpacity
                  style={styles.buttonQuantity}
                  onPress={() =>
                    handleIncreaseQuantity(product.cartId, product.quantity)
                  }>
                  <Text>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      ))}
      <View style={styles.footerShop}>
        <Ionicons name="ticket-outline" size={16} color={COLORS.red_price} />
        <Text style={{color: '#848484', fontSize: 12}}>Thêm Shop Voucher</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginBottom: 10,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.border_header,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  headerShop: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border_gray,
    paddingVertical: '2%',
    paddingHorizontal: '4%',
  },
  textShop: {
    fontFamily: FONTS.inter_medium,
    fontSize: 16,
  },
  containerProduct: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: '3%',
    paddingHorizontal: '4%',
  },
  imageProduct: {
    resizeMode: 'cover',
    width: SIZES.width / 6,
    height: SIZES.width / 5,
    borderRadius: 5,
  },
  infoProduct: {
    flexDirection: 'column',
    flex: 1,
    height: SIZES.width / 5,
    justifyContent: 'space-between',
  },
  nameProduct: {
    fontSize: 14,
  },
  price: {
    color: '#CD0000',
    fontFamily: FONTS.inter_SemiBold,
  },
  classificationContainer: {
    backgroundColor: 'rgba(225, 225, 225, 0.44)',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 3,
    alignSelf: 'flex-start',
  },
  classificationText: {
    fontSize: 12,
    color: '#777777',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  buttonQuantity: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    backgroundColor: 'rgba(228, 228, 228, 0.62)',
    color: COLORS.red,
    width: SIZES.width / 18,
    height: SIZES.width / 18,
  },
  quantityText: {
    fontSize: 16,
    color: '#8D8D8D',
  },
  footerShop: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.border_gray,
    paddingVertical: '2%',
    paddingHorizontal: '4%',
  },
});

export default ProductInCart;
