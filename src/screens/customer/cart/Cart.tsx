import {
  FlatList,
  StyleSheet,
  ListRenderItem,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderCommon from '../../../reusables/header/HeaderCommon';
import {COLORS} from '../../../constant/theme';
import FooterCart from '../../../components/cart/FooterCart';
import {Cart, CartProductTypes} from '../../../constant/types';
import ProductInCart from '../../../components/cart/ProductInCart';
import Repurchase from '../../../components/cart/Repurchase';
import {useDispatch, useSelector} from 'react-redux';
import {InterfaceCartState} from '../../../constant/interface';
import storageService from '../../../api/storageService';
import {fetchAllCart, updateCartQuantity} from '../../../redux/slice/cartSlice';

const CartScreen: React.FC = () => {
  //khai báo
  const dispatch = useDispatch<any>();
  const {cartList} = useSelector(
    (state: InterfaceCartState) => state.cartReducer,
  );
  const [activeTab, setActiveTab] = useState<'all' | 'repurchase'>('all');

  const cartListUpdate: CartProductTypes[] = Array.isArray(cartList)
    ? cartList.reduce((acc: CartProductTypes[], item: any) => {
        const existingIndex = acc.findIndex(
          (x: CartProductTypes) => x.sellerId === item.sellerId,
        );
        if (existingIndex === -1) {
          acc.push({
            sellerId: item.sellerId,
            sellerName: item.sellerName,
            products: [{...item}],
          });
        } else {
          acc[existingIndex].products.push({...item});
        }
        return acc;
      }, [])
    : [];
  const [listData, setListData] = useState<CartProductTypes[]>(cartListUpdate);
  //handle
  const handleTabPress = (tab: 'all' | 'repurchase') => {
    setActiveTab(tab);
    setListData(tab === 'all' ? listData : listData);
    if (tab === 'repurchase') {
      updateQuantityAPI(cartList);
    }
  };
  const renderItem: ListRenderItem<CartProductTypes> = ({item}) => {
    if (activeTab === 'all') {
      return <ProductInCart item={item} />;
    } else {
      return <Repurchase item={item} />;
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await storageService.getId();
        if (userId) {
          dispatch(fetchAllCart(userId));
        }
      } catch (error) {
        console.error('Failed to fetch data ', error);
      }
    };

    fetchData();
  }, []);
  const updateQuantityAPI = async (cartList: Cart[]) => {
    try {
      cartList.map(async item => {
        dispatch(
          updateCartQuantity({cartId: item.cartId, quantity: item.quantity}),
        );
      });
    } catch (error) {
      console.error('Failed to update quantity ', error);
    }
  };
  return (
    <View style={styles.container}>
      <HeaderCommon
        title="Giỏ hàng"
        colorTitle={COLORS.black}
        colorBack={COLORS.yellowMain}
        backgroundColor={COLORS.white}
        icon1="chatbubble-ellipses-outline"
        updateQuantityAPI={updateQuantityAPI}
      />
      <FlatList
        data={cartListUpdate}
        renderItem={renderItem}
        keyExtractor={item => item.sellerId.toString()}
        ListHeaderComponent={() => {
          return (
            <View style={styles.headerList}>
              <TouchableOpacity
                style={[
                  styles.buttonHeader,
                  activeTab === 'all' && styles.activeTab,
                ]}
                onPress={() => handleTabPress('all')}>
                <Text style={[activeTab === 'all' && styles.textActiveTab]}>
                  Tất cả ( 4 )
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.buttonHeader,
                  activeTab === 'repurchase' && styles.activeTab,
                ]}
                onPress={() => handleTabPress('repurchase')}>
                <Text
                  style={[activeTab === 'repurchase' && styles.textActiveTab]}>
                  Mua lại
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
      <FooterCart updateQuantityAPI={updateQuantityAPI} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  headerList: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    justifyContent: 'space-between',
  },
  buttonHeader: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: '3%',
    borderBottomWidth: 2,
    borderBottomColor: COLORS.border_gray,
  },
  activeTab: {
    borderBottomColor: COLORS.yellowMain,
  },
  textActiveTab: {
    color: COLORS.yellowMain,
  },
});

export default CartScreen;
