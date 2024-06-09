import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import HeaderTitleSeller from '../../../reusables/Title/HeaderTitleSeller';
import AddImageProductSeller from '../../../components/add_product_seller/AddImageProductSeller';
import { ScrollView } from 'react-native';
import ProductName from '../../../components/add_product_seller/ProductName';
import ProductDescription from '../../../components/add_product_seller/ProductDescription';
import HeightSpacerSeller from '../../../reusables/height_spacer/HeightSpacerSeller';
import ProductInfor from '../../../components/product_seller/ProductInfor';
import { COLORS } from '../../../constant/theme';
import { ProductCreate } from '../../../constant/types/productType';
import { ProductSellDetail } from '../../../constant/types/productSellDetail';
import { ProductSellCommand } from '../../../constant/types/productSellCommand';
import { useDispatch, useSelector } from 'react-redux';
import IndustryDetail from '../../../components/product_seller/IndustryDetail';
import {
  createProduct,
  setProductCreateError,
  setProductCreateField,
} from '../../../redux/slice/form/formCreateProductBySellerSlice';
import { IFormProductCreateState } from '../../../constant/interface/formCreateProductInterface';
import {
  productDescriptionSchema,
  productNameSchema,
} from '../../../constant/validate/productvalidate';
import { uploadImagesToFirebase } from '../../../features/UploadImg';
import { useNavigation } from '@react-navigation/native';
import { ISellerState } from '../../../constant/interface/sellerInterface';
import { getProductsBySellerId } from '../../../redux/slice/seller/productSellerSlice';
const productSellDetails: ProductSellDetail[] = [
  {
    detailId: '1',
    description: 'vinamilk',
  },
  {
    detailId: '2',
    description: 'Việt Nam',
  },
];
const productSellCommand: ProductSellCommand[] = [
  {
    name: 'Size',
    price: '',
    inventoryNumber: '0',
    path: '/A',
    parentNodeId: '',
  },
  {
    name: 'X',
    price: '',
    inventoryNumber: '0',
    path: '/A/1',
    parentNodeId: '',
  },
  {
    name: 'XL',
    price: '',
    inventoryNumber: '0',
    path: '/A/1',
    parentNodeId: '',
  },
  {
    name: 'Màu',
    price: '',
    inventoryNumber: '0',
    path: '/B',
    parentNodeId: '',
  },
  {
    name: 'Xanh',
    price: '200000',
    inventoryNumber: '200',
    path: '/B/1',
    parentNodeId: '',
  },
  {
    name: 'Đỏ',
    price: '200000',
    inventoryNumber: '200',
    path: '/B/1',
    parentNodeId: '',
  },
];
const productCreate: ProductCreate = {
  productName: 'Sữa ông thọ 1',
  productDescription: 'Sữa đặc nhiều đường ít ngọt',
  coverImageId: 'cc1fe2b1-5136-4e56-96c4-4fdf97a31d06',
  imagesId: 'cc1fe2b1-5136-4e56-96c4-4fdf97a31d06',
  videoId: 'cc1fe2b1-5136-4e56-96c4-4fdf97a31d06',
  industryId: '6',
  sellerId: '2',
  productSellDetails: productSellDetails,
  productSellCommand: productSellCommand,
};

const AddProductSeller = () => {
  const dispatch = useDispatch<any>();
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const { productCreate, productCreateError, loading, product, imageProductList } = useSelector(
    (state: IFormProductCreateState) => state.formCreateProductReducer,
  );
  const { seller } = useSelector(
    (state: ISellerState) => state.sellerReducer,
  );
  useEffect(() => {
    dispatch(setProductCreateField({ sellerId: seller?.seller?.id }));
  }, [seller]);
  // console.log("sdsd", imageProductList)
  const handleSubmit = async (data: ProductCreate) => {
    // console.log("ok")
    try {
      await productNameSchema.validate(data.productName);
      dispatch(setProductCreateError({ field: 'productName', error: '' }));
    } catch (error: any) {
      dispatch(
        setProductCreateError({ field: 'productName', error: error.message }),
      );
    }
    try {
      await productDescriptionSchema.validate(data.productDescription);
      dispatch(setProductCreateError({ field: 'productDescription', error: '' }));
    } catch (error: any) {
      dispatch(
        setProductCreateError({
          field: 'productDescription',
          error: error.message,
        }),
      );
    }
    if (productCreateError && areAllFieldsEmpty(productCreateError)) {
      // console.log("upcreat")
      dispatch(createProduct(data));
      uploadImagesToFirebase(imageProductList, productCreate.imagesId)
      dispatch(getProductsBySellerId(seller?.seller?.id));
      // console.log(productCreate.imagesId)
      setModalVisible(true);
    }
    // console.log("sellerid",seller?.id);
    // console.log(JSON.stringify(data, null, 2));
    // console.log(JSON.stringify(productCreate, null, 2));
    // console.log(JSON.stringify(data, null, 2));

    // console.log(JSON.stringify(data, null, 2));
    // console.log(product)
  };

  const areAllFieldsEmpty = (errorObject: any) => {
    const errorValues = Object.values(errorObject);
    return errorValues.every(value => value === '');
  };
  const handleSubmitCreate = () => {
    setModalVisible(false);
    navigation.navigate('ProductSeller' as never);
  };
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={styles.header}>
        <HeaderTitleSeller text={'Thêm sản phẩm'} />
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.imageComponent}>
          <AddImageProductSeller />
        </View>
        <HeightSpacerSeller height={10} color="#F6F5F2" />
        <View style={styles.productName}>
          <ProductName />
        </View>
        <HeightSpacerSeller height={10} color="#F6F5F2" />
        <View style={styles.productDescription}>
          <ProductDescription />
        </View>
        <HeightSpacerSeller height={10} color="#F6F5F2" />
        <View style={styles.industryDetail}>
          <IndustryDetail />
        </View>
        <HeightSpacerSeller height={10} color="#F6F5F2" />
        <View>
          <ProductInfor />
        </View>
        <HeightSpacerSeller height={10} color="#F6F5F2" />
      </ScrollView>
      <View style={styles.bot}>
        <TouchableOpacity
          onPress={() => handleSubmit(productCreate)}
          style={styles.buttomBot}>
          <Text style = {styles.buttonText}>Lưu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttomBot}>
          <Text style = {styles.buttonText}>Hiển thị</Text>
        </TouchableOpacity>
        <Modal
          visible={isModalVisible}
          onRequestClose={() => setModalVisible(false)}
          transparent={true}
          animationType="slide">
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>
                Product created successfully!
              </Text>
              <TouchableOpacity
                style={styles.okButton}
                onPress={handleSubmitCreate}>
                <Text style={styles.okButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default AddProductSeller;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  header: {
    borderBottomColor: '#9290908d',
    borderBottomWidth: 1,
    padding: 10,
  },
  imageComponent: {
    marginHorizontal: 10,
    marginVertical: 15,
  },
  productName: {
    marginHorizontal: 10,
    marginVertical: 15,
  },
  productDescription: {
    marginHorizontal: 10,
    marginVertical: 15,
  },
  bot: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttomBot: {
    margin: 10,
    borderWidth: 0.5,
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#F6F5F2',
  },
  industryDetail: {
    marginHorizontal: 10,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: COLORS.yellowMain,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  modalText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 20,
  },
  okButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
  },
  okButtonText: {
    color: COLORS.blue,
    fontSize: 16,
  },
  buttonText:{
    color: COLORS.yellow,
    fontSize: 20
  }
});
