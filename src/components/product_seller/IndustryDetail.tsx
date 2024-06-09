import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { InterfaceProductState } from '../../constant/interface/productInterface';
import { ProductSellDetail } from '../../constant/types/productSellDetail';
import { FlatList } from 'react-native';
import { TextInput } from 'react-native';
import { Detail } from '../../constant/types/detailType';
import { setProductCreateField } from '../../redux/slice/form/formCreateProductBySellerSlice';
import { IFormProductCreateState } from '../../constant/interface/formCreateProductInterface';
import { InterfaceIndustryState } from '../../constant/interface/industryInterface';
import { IndustryDetailType } from '../../constant/types/industryDetailtype';
import { COLORS } from '../../constant/theme';

const IndustryDetail = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch<any>();
    const { productCreate, productCreateError, loading, error } = useSelector(
        (state: IFormProductCreateState) => state.formCreateProductReducer,
    );
    const { industryById } = useSelector(
        (state: InterfaceIndustryState) => state.industrySellerReducer,
    );
    //variable
    const [productDetailsInput, setProductDetailsInput] = useState<{ [key: string]: string }>({});
    const [productDetail, setProductDetail] = useState<ProductSellDetail[]>([]);
    const [detailsList, setDetailsList] = useState<Detail[]>([]);



    useEffect(() => {
        if (industryById) {
            setDetailsList(industryById.industryDetails.map((industryDetail: IndustryDetailType) => industryDetail.detail));
        }
    }, [industryById]);


    //handle
    const handleTextInputChange = (item: Detail, text: string) => {
        setProductDetailsInput(prevDetails => ({
            ...prevDetails,
            [item.id]: text
        }));
        setProductDetail(prevDetails => {
            const detailIndex = prevDetails.findIndex(detail => detail.detailId === item.id.toString());
            if (detailIndex !== -1) {
                const newDetails = [...prevDetails];
                newDetails[detailIndex] = { ...newDetails[detailIndex], description: text };
                return newDetails;
            } else {
                return [...prevDetails, { detailId: item.id.toString(), description: text }];
            }
        });
        // console.log(productDetail);
        dispatch(setProductCreateField({ productSellDetails: productDetail }));
        // console.log(productCreate);
    };

    //render
    const renderDetailItem = ({ item }: { item: Detail }) => (
        <View style={styles.industryContainer}>
            <View style={styles.industryItem}>
                <SimpleLineIcons name='note' size={20} color={COLORS.gray_1} />
                <Text style={styles.text}>{item.detailName}</Text>
            </View>
            <TextInput
                style={styles.textInput}
                value={productDetailsInput[item.id] || ''}
                onChangeText={(text) => handleTextInputChange(item, text)}
                placeholder={`Nhập ${item.detailName}`}
            />
        </View>
    );
    return (
        <View>
            <TouchableOpacity
                onPress={() => navigation.navigate("Industry" as never)}
                style={styles.industryTitleContainer}>
                <View style={styles.industryItem}>
                    <AntDesign name='menuunfold' size={20} color={COLORS.gray_1} />
                    <Text style={styles.textTitle}>Ngành hàng</Text>
                </View>
                {productCreate.industryId ? (
                    <Text style = {{color: COLORS.gray_1, marginRight: 5}}>{productCreate.industryId}</Text>
                ) : <MaterialIcons name='navigate-next' size={20} color={COLORS.gray_1} />}
            </TouchableOpacity>
            {productCreate.industryId !== '' ? (
                <FlatList
                    scrollEnabled={false}
                    data={detailsList}
                    renderItem={renderDetailItem}
                    keyExtractor={item => item.id.toString()}
                />) : (<></>)
            }
        </View >
    )
}

export default IndustryDetail

const styles = StyleSheet.create({
    industryTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#8f8f8fb5'
    },
    industryContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#8f8f8fb5'
    },
    industryItem: {
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
    },
    text: {
        color: COLORS.black,
        marginLeft: 10
    },
    textTitle: {
        color: COLORS.yellow,
        marginLeft: 10,
        fontSize: 15,
    },
    textInput: {
        color: COLORS.black,
        textAlign: 'right',
        borderWidth: 1,
        borderColor: '#8f8f8fb5',
        padding: 5,
        borderRadius: 5,
    }
})