import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
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
import { createProduct } from '../../../redux/slice/seller/productSellerSlice';
import { InterfaceProductState } from '../../../constant/interface/productInterface';
import IndustryDetail from '../../../components/product_seller/IndustryDetail';

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
  const { productCreate, product, loading } = useSelector(
    (state: InterfaceProductState) => state.productSellerReducer,
  );
  const methods = useForm<ProductCreate>({ defaultValues: productCreate });

  const updateFormData = (data: Partial<ProductCreate>) => {
    Object.entries(data).forEach(([key, value]) => {
      methods.setValue(key as keyof ProductCreate, value);
    });
  };
  useEffect(() => {
    updateFormData(productCreate);
  }, [productCreate]);
  const handleSubmit = (data: ProductCreate) => {
    data.sellerId = '2';
    data.productSellCommand = productSellCommand;
    console.log(data);
    dispatch(createProduct(data));
  };

  return (
    <FormProvider {...methods}>
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
            style={styles.buttomBot}
            onPress={methods.handleSubmit(handleSubmit)}>
            <Text>Lưu</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttomBot}>
            <Text>Hiển thị</Text>
          </TouchableOpacity>
        </View>
      </View>
    </FormProvider>
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
