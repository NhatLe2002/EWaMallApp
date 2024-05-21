import {
  FlatList,
  StyleSheet,
  ListRenderItem,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import HeaderCommon from '../../../reusables/header/HeaderCommon';
import {COLORS} from '../../../constant/theme';
import FooterCart from '../../../components/cart/FooterCart';

import {productListInCart} from '../../../data/Product';
import {CartProductTypes, ProductTypes} from '../../../constant/types';
import ProductInCart from '../../../components/cart/ProductInCart';
import Repurchase from '../../../components/cart/Repurchase';

const Cart: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'repurchase'>('all');
  const [listData, setListData] =
    useState<CartProductTypes[]>(productListInCart);

  const handleTabPress = (tab: 'all' | 'repurchase') => {
    setActiveTab(tab);
    setListData(tab === 'all' ? productListInCart : productListInCart);
  };
  const renderItem: ListRenderItem<CartProductTypes> = ({item}) => {
    if (activeTab === 'all') {
      return <ProductInCart item={item} />;
    } else {
      return <Repurchase item={item} />;
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
      />
      <FlatList
        data={listData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
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
      <FooterCart />
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

export default Cart;
