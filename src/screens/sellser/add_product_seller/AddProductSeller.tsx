import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
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
import { createProduct, setProductCreateError, setProductCreateField } from '../../../redux/slice/form/formCreateProductBySellerSlice';
import { IFormProductCreateState } from '../../../constant/interface/formCreateProductInterface';
import { productDescriptionSchema, productNameSchema } from '../../../constant/validate/productvalidate';
import { uploadImageToFirebase } from '../../../features/UploadImg'
const productSellDetails: ProductSellDetail[] = [{
  detailId: "1",
  description: "vinamilk"
},
{
  detailId: "2",
  description: "Việt Nam"
}
];
const productSellCommand: ProductSellCommand[] = [{
  name: "Không",
  price: "200000",
  inventoryNumber: "200",
  path: "0",
  parentNodeId: "",
}
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
  const { productCreate, productCreateError, loading, product } = useSelector(
    (state: IFormProductCreateState) => state.formCreateProductReducer,
  );
  const handleSubmit = (data: ProductCreate) => {
    try {
      productNameSchema.validate(data.productName);
      dispatch(setProductCreateError({ field: 'productName', error: '' }));
    } catch (error: any) {
      dispatch(setProductCreateError({ field: 'productName', error: error.message }));
    }
    try {
      productDescriptionSchema.validate(data.productDescription);
      dispatch(setProductCreateError({ field: 'productDescription', error: '' }));
    } catch (error: any) {
      dispatch(setProductCreateError({ field: 'productDescription', error: error.message }));
    }
    dispatch(setProductCreateField({ sellerId: "2" }));
    dispatch(createProduct(data));
    console.log(JSON.stringify(data, null, 2));
    console.log(product)
    // if (productCreateError && areAllFieldsEmpty(productCreateError)) {
    //   console.log(data);
    //  console.log(productCreateError);
    // }
  };

  const areAllFieldsEmpty = (errorObject: any) => {
    const errorValues = Object.values(errorObject);
    return errorValues.every((value) => value === '');
  };
  const handleUpload = async () => {
    const productId = 11;
    const uri = '/Users/quangvinh/Desktop/Screenshot 2024-05-27 at 20.49.31.png';
    try {
      const downloadURL = await uploadImageToFirebase(uri, productId);
      Alert.alert('Success', `Image uploaded successfully! URL: ${downloadURL}`);
    } catch (error) {
      Alert.alert('Error', `Failed to upload image: ${error} `);
      console.log(error)
    }
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
        <HeightSpacerSeller height={10} color='#F6F5F2' />
        <View style={styles.productName}>
          <ProductName />
        </View>
        <HeightSpacerSeller height={10} color='#F6F5F2' />
        <View style={styles.productDescription}>
          <ProductDescription />
        </View>
        <HeightSpacerSeller height={10} color='#F6F5F2' />
        <View>
          <IndustryDetail />
        </View>
        <HeightSpacerSeller height={10} color='#F6F5F2' />
        <View>
          <ProductInfor />
        </View>
        <HeightSpacerSeller height={10} color='#F6F5F2' />
      </ScrollView>
      <View style={styles.bot}>
        <TouchableOpacity
          onPress={() => handleSubmit(productCreate)}
          style={styles.buttomBot}
        >
          <Text>Lưu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttomBot}>
          <Text>Hiển thị</Text>
        </TouchableOpacity>
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
});
