import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Control, Controller, useFormContext } from 'react-hook-form';
import { ProductCreate } from '../../constant/types/productType';
import { useDispatch, useSelector } from 'react-redux';
import { InterfaceProductState } from '../../constant/interface/productInterface';
import { setProductCreateField } from '../../redux/slice/seller/productSellerSlice';
import { ProductSellCommand } from '../../constant/types/productSellCommand';

const DefaultProductSellCommand: ProductSellCommand[] = [
    {
        name: "Không",
        price: "",
        inventoryNumber: "",
        path: "0",
        parentNodeId: "",
    }
];


const ProductInfor = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch<any>();
    const { productCreate, loading } = useSelector(
        (state: InterfaceProductState) => state.productSellerReducer,
    );
    const { control, setValue } = useFormContext();
    const [price, setPrice] = useState<string>('');
    const [isValidPrice, setIsValidPrice] = useState<boolean>(true);
    const [inventory, setInventory] = useState<string>('');


    const handleInventoryChange = (text: string) => {
        const formattedInventory = text.replace(/[^0-9]/g, '');
        setInventory(formattedInventory);
    };

    const handlePriceChange = (text: string) => {
        const formattedPrice = text.replace(/[^0-9.]/g, '');
        setPrice(formattedPrice);
        const numericPrice = parseFloat(formattedPrice);
        if (!isNaN(numericPrice) && numericPrice >= 1000 && numericPrice <= 120000000) {
            setIsValidPrice(true);
        } else {
            setIsValidPrice(false);
        }
    };
    useEffect(() => {
        // dispatch(setProductCreateField({ productSellCommand: productSellCommand }));
    }, []);
    return (
        <View style={styles.container}>
            <Controller
                control={control}
                name="productSellCommand[0].name"
                defaultValue="Không"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder="Nhập giá sản phẩm"
                        style={styles.priceInput}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />
            <View style={styles.priceContainer}>
                <View style={styles.industryItem}>
                    <Ionicons name='pricetags-outline' size={20} />
                    <Text style={styles.text}>Giá</Text>
                </View>
                <Controller
                    control={control}
                    name="productSellCommand[0].price"
                    defaultValue=""
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            placeholder="Nhập giá sản phẩm"
                            style={styles.priceInput}
                            onBlur={onBlur}
                            onChangeText={(text) => {
                                onChange(text);
                                handlePriceChange(text);
                            }}
                            value={value}
                            keyboardType="numeric"
                        />
                    )}
                />
            </View>
            {!isValidPrice && (
                <Text style={styles.errorText}>Giá phải từ 1000.00 đến 120000000.00</Text>
            )}
            <View style={styles.deliveryContainer}>
                <View style={styles.industryItem}>
                    <MaterialIcons name='inventory' size={20} />
                    <Text style={styles.text}>Kho hàng</Text>
                </View>
                <Controller
                    control={control}
                    name="productSellCommand[0].inventoryNumber"
                    defaultValue=""
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            placeholder="Nhập số lượng hàng"
                            style={styles.quantityInput}
                            onBlur={onBlur}
                            onChangeText={(text) => { onChange(text); handleInventoryChange(text) }}
                            value={value}
                            keyboardType="numeric"
                        />
                    )}
                />
            </View>
        </View>
    );
};

export default ProductInfor;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 10,
    },
    industryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#8f8f8fb5'
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#8f8f8fb5'
    },
    deliveryContainer: {
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
    priceInput: {
        textAlign: 'right',
        borderWidth: 1,
        borderColor: '#8f8f8fb5',
        padding: 5,
        borderRadius: 5,
        width: '50%',
    },
    errorText: {
        color: 'red',
        marginTop: 5,
        marginLeft: 10,
    },
    quantityInput: {
        textAlign: 'right',
        borderWidth: 1,
        borderColor: '#8f8f8fb5',
        padding: 5,
        borderRadius: 5,
        width: '50%',
    }
});
