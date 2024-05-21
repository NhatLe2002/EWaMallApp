import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {CartProductTypes, ProductTypes} from '../../constant/types';
import {COLORS, FONTS, SIZES} from '../../constant/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckBox from '../../reusables/checkbox/CheckBox';
import Ionicons from 'react-native-vector-icons/Ionicons';
interface Props {
  item: CartProductTypes;
}

const ProductInCart: React.FC<Props> = ({item}) => {
  const [checked, setChecked] = useState(true);
  const toggleCheckbox = () => setChecked(!checked);
  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerShop}>
        <CheckBox onPress={() => toggleCheckbox()} isChecked={checked} />
        <MaterialCommunityIcons
          name="storefront-outline"
          size={20}
          color="#7F7F7F"
        />
        <Text style={styles.textShop}>{item.nameShop}</Text>
      </View>
      {item.products.map(product => (
        <View style={styles.containerProduct} key={product.id}>
          <CheckBox onPress={() => toggleCheckbox()} isChecked={checked} />

          <Image style={styles.imageProduct} source={{uri: product.imgUrl}} />
          <View style={styles.infoProduct}>
            <Text style={styles.nameProduct} numberOfLines={1}>
              {product.name}
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
              <Text style={styles.price}>{product.price}</Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  style={styles.buttonQuantity}
                  onPress={decreaseQuantity}>
                  <Text>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity
                  style={styles.buttonQuantity}
                  onPress={increaseQuantity}>
                  <Text>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      ))}
      <View style={styles.footerShop}>
      <Ionicons name="ticket-outline" size={16} color={COLORS.red_price} />
        <Text style={{color:'#848484',fontSize:12}}>Thêm Shop Voucher</Text>
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
    color:'#777777'
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
