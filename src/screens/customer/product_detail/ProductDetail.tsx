import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { COLORS, FONTS, SIZES } from '../../../constant/theme';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import TitleProduct from '../../../components/product_detail/TitleProduct';
import DeliveryPrice from '../../../components/product_detail/DeliveryPrice';
import ShopInfor from '../../../components/product_detail/ShopInfor';
import { useRoute } from '@react-navigation/native';
import ProductList from '../../../reusables/list_item/ProductList';
import SuggestProduct from '../../../components/product_detail/SuggestProduct';
import Description from '../../../components/product_detail/Description';
import RatingProduct from '../../../components/product_detail/RatingProduct';
import HeaderSearch from '../../../components/product_detail/HeaderSearch';
import FooterProductDetail from '../../../components/product_detail/FooterProductDetail';
import { useDispatch, useSelector } from 'react-redux';

import {
  InterfaceAccountState,
  InterfaceProductState,
} from '../../../constant/interface';
import { getProductById } from '../../../redux/slice/productSlices';

import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetFooter,
} from '@gorhom/bottom-sheet';
import { BottomSheetDefaultFooterProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetFooter/types';
import { formatPriceToVND } from '../../../config/FixPrice';
import { addToCart } from '../../../redux/slice/cartSlice';
import { Product, productSellerDetails } from '../../../constant/types';
import {
  listFilesInProductFolder,
  updateProductDetailWithImages,
  updateProductListWithImages,
} from '../../../features/GetImage';

const ProductDetail = () => {
  const route = useRoute<any>();
  const { productId } = route.params;
  const scrollViewRef = useRef<ScrollView>(null);
  const { product } = useSelector(
    (state: InterfaceProductState) => state.productReducer,
  );
  const { userId } = useSelector(
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
    setSelectedProduct({ id, quantity });
  };
  useEffect(() => {
    dispatch(getProductById(productId));
    // console.log(productId, JSON.stringify(product, null,2));
    scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
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
  product?.productSellerDetails?.map((item: { inventoryNumber: number }) => {
    totalInventoryNumber += item.inventoryNumber;
  });
  // callbacks
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

      closeModal();
    } else {
      closeModal();
    }
  };
  console.log(updatedProduct?.imageUrls);
  const footerAddProduct = useCallback(
    (props: React.JSX.IntrinsicAttributes & BottomSheetDefaultFooterProps) => (
      <BottomSheetFooter {...props}>
        <View style={styles.containerFooterAddProduct}>
          <TouchableOpacity
            onPress={() => {
              handleAddToCart();
            }}
            style={styles.buttonFooterAddProduct}>
            <Text style={{ color: 'white', fontSize: 17 }}>
              Thêm vào Giỏ hàng
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheetFooter>
    ),
    [selectedProduct],
  );
  return (
    <BottomSheetModalProvider>
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

          <TitleProduct
            productName={product?.productName}
            price={product?.productSellerDetails.length > 1 ? product?.productSellerDetails.find((s: productSellerDetails) => s.path === '/B/1').price : product?.productSellerDetails[0].price}
          />
          <DeliveryPrice />
          <ShopInfor />
          <SuggestProduct />
          <Description description= {product?.productDescription} />
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
        <FooterProductDetail openBottomSheet={handlePresentModalPress} />

        <View style={styles.container}>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            onDismiss={() => setIsOpen(false)}
            footerComponent={footerAddProduct}>
            <BottomSheetView>
              <ScrollView style={styles.containerAddToCart}>
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
                    source={{ uri: 'https://picsum.photos/200/300?random=1' }}
                    style={{ width: SIZES.width / 6, height: SIZES.height / 10 }}
                  />
                  <View>
                    <Text style={{ color: COLORS.price_red }}>
                      {selectedPrice !== null
                        ? formatPriceToVND(selectedPrice)
                        : ''}
                    </Text>

                    <Text style={{ color: COLORS.gray_2 }}>
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
                  {product?.productSellerDetails?.map((item: any) => (
                    <TouchableOpacity
                      key={item.id}
                      style={{
                        backgroundColor:
                          selectedProductId === item.id
                            ? 'white'
                            : COLORS.background_list,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '2%',
                        borderRadius: 2,
                        borderWidth: selectedProductId === item.id ? 1 : 0,
                        borderColor:
                          selectedProductId === item.id ? COLORS.price_red : '',
                      }}
                      onPress={() => {
                        setSelectedProductId(item.id);
                        setSelectedPrice(item.price);

                        updateSelectedProduct(item.id, 1);
                      }}>
                      <Text
                        style={{
                          fontSize: 13,
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
                <View
                  style={{
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
                {/* </View> */}
              </ScrollView>
            </BottomSheetView>
          </BottomSheetModal>
        </View>
        {isOpen ? (
          <View
            style={{
              position: 'absolute',
              width: SIZES.width,
              height: SIZES.height,
              zIndex: 9990,
              backgroundColor: 'rgba(0,0,0,0.4)',
            }}
            pointerEvents={isOpen ? 'auto' : 'none'}
            onTouchEnd={closeModal}></View>
        ) : (
          ''
        )}
      </View>
    </BottomSheetModalProvider>
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
    shadowOffset: { width: 0, height: -4 },
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
    width: SIZES.width,
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
