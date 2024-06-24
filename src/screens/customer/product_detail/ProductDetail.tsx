import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {COLORS, FONTS, SIZES} from '../../../constant/theme';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import TitleProduct from '../../../components/product_detail/TitleProduct';
import DeliveryPrice from '../../../components/product_detail/DeliveryPrice';
import ShopInfor from '../../../components/product_detail/ShopInfor';
import {useRoute} from '@react-navigation/native';
import ProductList from '../../../reusables/list_item/ProductList';
import SuggestProduct from '../../../components/product_detail/SuggestProduct';
import Description from '../../../components/product_detail/Description';
import RatingProduct from '../../../components/product_detail/RatingProduct';
import HeaderSearch from '../../../components/product_detail/HeaderSearch';
import FooterProductDetail from '../../../components/product_detail/FooterProductDetail';
import {useDispatch, useSelector} from 'react-redux';
import {Modalize} from 'react-native-modalize';
import {
  InterfaceAccountState,
  InterfaceProductState,
} from '../../../constant/interface';
import {getProductById} from '../../../redux/slice/productSlices';

import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetFooter,
} from '@gorhom/bottom-sheet';
import {BottomSheetDefaultFooterProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetFooter/types';
import {formatPriceToVND} from '../../../config/FixPrice';
import {addToCart} from '../../../redux/slice/cartSlice';
import {Product, productSellerDetails} from '../../../constant/types';
import {
  listFilesInProductFolder,
  updateProductDetailWithImages,
  updateProductListWithImages,
} from '../../../features/GetImage';
//() =>  navigation.navigate('Purchase' as never)
const ProductDetail = () => {
  const modalizeRef = useRef<Modalize>(null);
  const route = useRoute<any>();
  const {productId} = route?.params;
  const scrollViewRef = useRef<ScrollView>(null);
  const {product} = useSelector(
    (state: InterfaceProductState) => state.productReducer,
  );
  const {userId} = useSelector(
    (state: InterfaceAccountState) => state.accountReducer,
  );

  const dispatch = useDispatch<any>();
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);

  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );
  const [selectedProduct, setSelectedProduct] = useState<{
    id: number;
    quantity: number;
  } | null>(null);
  const [updatedProduct, setUpdatedProduct] = useState<Product>();
  const updateSelectedProduct = (id: number, quantity: number) => {
    setSelectedProduct({id, quantity});
    console.log('id', id);
  };
  useEffect(() => {
    dispatch(getProductById(productId));
    scrollViewRef.current?.scrollTo({x: 0, y: 0, animated: true});
  }, [productId]);

  useEffect(() => {
    const fetchProductImages = async () => {
      const updatedList = await updateProductDetailWithImages(product);
      setUpdatedProduct(updatedList);
    };
    fetchProductImages();
  }, [product]);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['60%', '70%'], []);
  const [isOpen, setIsOpen] = useState(false);

  let totalInventoryNumber = 0;
  product?.productSellerDetails?.map((item: {inventoryNumber: number}) => {
    totalInventoryNumber += item.inventoryNumber;
  });
  // callbacks
  const handleAddProduct = () => {
    modalizeRef.current?.open();
  };
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
    setIsOpen(true);
  }, []);
  const closeModal = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
    setSelectedProductId(null);
    setSelectedPrice(null);
    setSelectedProduct(null);
  }, []);
  const handleAddToCart = () => {
    if (selectedProduct) {
      dispatch(
        addToCart({
          quantity: selectedProduct.quantity,
          userId: userId,
          sellDetailId: selectedProduct.id,
        }),
      );

      modalizeRef.current?.close();
    } else {
      modalizeRef.current?.close();
    }
  };
  console.log(selectedPrice);
  const priceProp =
    product?.productSellerDetails.length > 1
      ? product?.productSellerDetails.find(
          (s: productSellerDetails) => s.path === '/B/1',
        ).price
      : product?.productSellerDetails[0].price;
  return (
    <View style={styles.container}>
      <HeaderSearch />
      <ScrollView style={styles.content} ref={scrollViewRef}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={{
            marginBottom: 2,
            height: SIZES.height / 2.8,
          }}>
          {updatedProduct?.imageUrls?.map((item, i) => (
            <View key={i} style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{
                  uri: item ? String(item) : 'defaultImageUrl',
                }}
              />
            </View>
          ))}
        </ScrollView>

        <TitleProduct productName={product?.productName} price={priceProp} />
        <DeliveryPrice />
        <ShopInfor seller={product?.seller} />
        <SuggestProduct />
        <Description description={product?.productDescription} />
        <RatingProduct />
        <View>
          <Text
            style={{
              backgroundColor: 'white',
              height: 38,
              fontSize: 16,
              color: 'black',
              paddingTop: 5,
              fontWeight: '600',
              paddingHorizontal: '4%',
              marginTop: 5,
            }}>
            Có thể bạn cũng thích
          </Text>
          <ProductList />
        </View>
      </ScrollView>
      <FooterProductDetail
        openBottomSheet={handleAddProduct}
        seller={product?.seller}
        price={priceProp}
        modalizeRef={modalizeRef}
      />
      <Modalize
        childrenStyle={{
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'row',
          gap: 10,
        }}
        modalStyle={{
          height: SIZES.width / 0.6,
          display: 'flex',
          flexDirection: 'row',
          gap: 10,
        }}
        scrollViewProps={{showsVerticalScrollIndicator: false}}
        snapPoint={SIZES.width / 0.6}
        withHandle={true}
        ref={modalizeRef}
        modalHeight={SIZES.width / 0.6}>
        <View >
     
          <View style={styles.containerAddToCart}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                paddingHorizontal: '4%',
                gap: 20,
                alignItems: 'flex-end',
                borderBottomWidth: 1,
                borderColor: COLORS.border_gray,
                paddingBottom: '3%',
              }}>
              <Image
                source={{uri: 'https://picsum.photos/200/300?random=1'}}
                style={{width: SIZES.width / 6, height: SIZES.height / 10}}
              />
              <View>
                <Text style={{fontSize: 20}}>{product?.productName}</Text>
                <Text style={{color: COLORS.price_red}}>
                  {selectedPrice !== null
                    ? formatPriceToVND(selectedPrice)
                    : ''}
                </Text>

                <Text style={{color: COLORS.gray_2}}>
                  Kho: {totalInventoryNumber}
                </Text>
              </View>
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: COLORS.border_gray,
                paddingVertical: '3%',
                paddingHorizontal: '4%',
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 10,
              }}>
              <View style={{flexDirection: 'column'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  {product?.productSellerDetails
                    .filter((item: {path: string}) =>
                      item.path.startsWith('/A'),
                    )
                    .slice(0, 1)
                    .map((item: {id: any; price: number; name: string}) => (
                      <View
                        key={item.id}
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          padding: '2%',
                          borderRadius: 2,
                          borderWidth: selectedProductId === item.id ? 1 : 0,
                          borderColor:
                            selectedProductId === item.id
                              ? COLORS.price_red
                              : '',
                          marginRight: 5,
                        }}>
                        <Text
                          style={{
                            fontSize: 13,
                            color: COLORS.black,
                          }}>
                          {item.name}
                        </Text>
                      </View>
                    ))}
                  <Text>-</Text>
                  {product?.productSellerDetails
                    .filter((item: {path: string}) =>
                      item.path.startsWith('/B'),
                    )
                    .slice(0, 1)
                    .map((item: {id: any; price: number; name: string}) => (
                      <View
                        key={item.id}
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          padding: '2%',
                          borderRadius: 2,
                          borderWidth: selectedProductId === item.id ? 1 : 0,
                          borderColor:
                            selectedProductId === item.id
                              ? COLORS.price_red
                              : '',
                          marginRight: 5,
                        }}>
                        <Text
                          style={{
                            fontSize: 13,
                            color: COLORS.black,
                          }}>
                          {item.name}
                        </Text>
                      </View>
                    ))}
                </View>
                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                  {product?.productSellerDetails
                    .filter((item: {path: string}) =>
                      item.path.startsWith('/B'),
                    )
                    .slice(1)
                    .map((item: {id: any; price: number; name: string}) => (
                      <TouchableOpacity
                        key={item.id}
                        style={{
                          backgroundColor:
                            selectedProductId === item.id
                              ? 'white'
                              : COLORS.background_list,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginVertical: '2%',
                          marginRight: '2%',
                          borderRadius: 2,
                          borderWidth: selectedProductId === item.id ? 1 : 0,
                          borderColor:
                            selectedProductId === item.id
                              ? COLORS.price_red
                              : '',
                          marginLeft: 5,
                        }}
                        onPress={() => {
                          setSelectedProductId(item.id);
                          setSelectedPrice(item.price);
                          updateSelectedProduct(item.id, 1);
                        }}>
                        <Text
                          style={{
                            fontSize: 13,
                            paddingHorizontal: '3%',
                            paddingVertical: '2%',
                            color:
                              selectedProductId === item.id
                                ? COLORS.price_red
                                : COLORS.black,
                          }}>
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                </View>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                borderBottomWidth: 1,
                borderColor: COLORS.border_gray,
                paddingVertical: '3%',
                paddingHorizontal: '4%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 10,
              }}>
              <Text>Số lượng</Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  style={styles.buttonQuantity}
                  onPress={() => {
                    if (selectedProduct) {
                      updateSelectedProduct(
                        selectedProduct.id,

                        Math.max(selectedProduct.quantity - 1, 1),
                      );
                    }
                  }}>
                  <Text>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>
                  {selectedProduct?.quantity || 1}
                </Text>
                <TouchableOpacity
                  style={styles.buttonQuantity}
                  onPress={() => {
                    if (selectedProduct) {
                      updateSelectedProduct(
                        selectedProduct.id,

                        selectedProduct.quantity + 1,
                      );
                    }
                  }}>
                  <Text>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.containerFooterAddProduct}>
          <TouchableOpacity
            onPress={() => {
              handleAddToCart();
            }}
            style={styles.buttonFooterAddProduct}>
            <Text style={{color: 'white', fontSize: 17}}>
              Thêm vào Giỏ hàng
            </Text>
          </TouchableOpacity>
        </View>
        </View>
      </Modalize>
    
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  content: {
    backgroundColor: COLORS.background_list,
  },
  // image: {
  //   width: '100%',
  //   height: SIZES.height / 2.5,
  //   marginBottom: 3,
  // },
  imageContainer: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  image: {
    width: SIZES.width,
    height: SIZES.height / 2.5,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  containerFooterAddProduct: {
    width: SIZES.width,
    paddingHorizontal: '3%',
    paddingVertical: '2%',
    shadowColor: COLORS.border_product,
    shadowOffset: {width: 0, height: -4},
    shadowOpacity: 1,
    shadowRadius: 5,
    flex: 1,
    height: SIZES.height / 12,
    backgroundColor: 'white',
  },
  buttonFooterAddProduct: {
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: '2.5%',
    borderRadius: 5,
  },
  containerAddToCart: {
    flex: 1,
    paddingTop: '5%',
    width: SIZES.width,
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },

  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLORS.border_gray,
    width: SIZES.width / 5,
  },
  buttonQuantity: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    color: COLORS.red,
    width: SIZES.width / 18,
    height: SIZES.width / 18,
  },
  quantityText: {
    fontSize: 16,
    color: 'red',
    borderRightWidth: 1,
    borderColor: 'black',
    borderLeftWidth: 1,
    textAlign: 'center',
    flex: 1,
  },
});
