import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
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
import { setProductCreateField } from '../../redux/slice/seller/productSellerSlice';



const detailList = [
    {
        id: 1,
        detail: "Thương hiệu"
    },
    {
        id: 2,
        detail: "Xuất xứ"
    },
    {
        id: 3,
        detail: "Chức năng bổ sung"
    },
]

const productSellDetails: ProductSellDetail[] = [{
    detailId: "1",
    description: "vinamilk"
},
{
    detailId: "2",
    description: "Việt Nam"
}
];

const IndustryDetail = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch<any>();
    const { productCreate, loading } = useSelector(
        (state: InterfaceProductState) => state.productSellerReducer,
    );
    //variable
    const [productDetailsInput, setProductDetailsInput] = useState<{ [key: string]: string }>({});
    const [productDetail, setProductDetail] = useState<ProductSellDetail[]>([]);



    //handle
    const handleTextInputChange = (item: Detail, text : string) => {
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
        dispatch(setProductCreateField({ productSellDetails:  productDetail}));
        console.log(productCreate);
    };

    //render
    const renderDetailItem = ({ item }: { item: typeof detailList[0] }) => (
        <View style={styles.industryContainer}>
            <View style={styles.industryItem}>
                <SimpleLineIcons name='note' size={20} />
                <Text style={styles.text}>{item.detail}</Text>
            </View>
            <TextInput
                style={styles.textInput}
                value={productDetailsInput[item.id]||''}
                onChangeText={(text) => handleTextInputChange(item, text)}
                placeholder={`Nhập ${item.detail}`}
            />
        </View>
    );
    return (
        <View>
            <TouchableOpacity
                onPress={() => navigation.navigate("Industry" as never)}
                style={styles.industryContainer}>
                <View style={styles.industryItem}>
                    <AntDesign name='menuunfold' size={20} />
                    <Text style={styles.text}>Ngành hàng</Text>
                </View>
                <MaterialIcons name='navigate-next' size={20} />
            </TouchableOpacity>
            {productCreate.industryId !== '' ? (
                <FlatList
                    scrollEnabled={false}
                    data={detailList}
                    renderItem={renderDetailItem}
                    keyExtractor={item => item.id.toString()}
                />) : (<></>)
            }
        </View >
    )
}

export default IndustryDetail

const styles = StyleSheet.create({
    industryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#8f8f8fb5'
    },
    industryItem: {
        flexDirection: 'row',
    },
    text: {
        marginLeft: 10
    },
    textInput: {
        textAlign: 'right',
        borderWidth: 1,
        borderColor: '#8f8f8fb5',
        padding: 5,
        borderRadius: 5,
        width: '50%',
    }
})