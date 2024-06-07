import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { ProductCreate } from '../../constant/types/productType';
import { useDispatch, useSelector } from 'react-redux';
import { InterfaceProductState } from '../../constant/interface/productInterface';
import { ProductSellCommand } from '../../constant/types/productSellCommand';
import { setProductCreateField } from '../../redux/slice/form/formCreateProductBySellerSlice';
import { IFormProductCreateState } from '../../constant/interface/formCreateProductInterface';

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
        (state: IFormProductCreateState) => state.formCreateProductReducer,
    );
    const [productCommanList, setProductCommanList] = useState<ProductSellCommand[]>([]);

    // const []
    const [price, setPrice] = useState<string>('');
    const [isValidPrice, setIsValidPrice] = useState<boolean>(true);
    const [inventory, setInventory] = useState<string>('');
    const [productSellCommandInput, setProductSellCommandInput] = useState<ProductSellCommand[]>(DefaultProductSellCommand)


    const handleInventoryChange = (text: string) => {
        setProductSellCommandInput(prevCommands => prevCommands.map(command => ({ ...command, inventoryNumber: text })));
    };

    const handlePriceChange = async (text: string) => {
        setProductSellCommandInput(prevCommands => prevCommands.map(command => ({ ...command, price: text })));
    };
    useEffect(() => {
        setProductCommanList(productCreate.productSellCommand);
    }, [productCreate])
    useEffect(() => {
        dispatch(setProductCreateField({ productSellCommand: productSellCommandInput }));
    }, [productSellCommandInput]);
    const prices = productCommanList.map((item) => parseFloat(item.price)).filter((price) => !isNaN(price));
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const totalInventory = productCommanList.reduce((total, item) => {
        const inventoryNumber = parseInt(item.inventoryNumber, 10);
        return total + (isNaN(inventoryNumber) ? 0 : inventoryNumber);
    }, 0);
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.navigate("ProductComman" as never)}
                style={styles.industryContainer}>
                <View style={styles.industryItem}>
                    <AntDesign name='menuunfold' size={20} />
                    <Text style={styles.text}>Phân loại hàng</Text>
                </View>
                {false ? (
                    <Text >{ }</Text>
                ) : <MaterialIcons name='navigate-next' size={20} />}
            </TouchableOpacity>

            {productCommanList.length === 1 && productCommanList[0].name === "Không" ? (
                <View>
                    <View style={styles.priceContainer}>
                        <View style={styles.industryItem}>
                            <Ionicons name='pricetags-outline' size={20} />
                            <Text style={styles.text}>Giá</Text>
                        </View>
                        <TextInput
                            placeholder="Nhập giá sản phẩm"
                            style={styles.priceInput}
                            onChangeText={(text) => {
                                handlePriceChange(text);
                            }}
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={styles.deliveryContainer}>
                        <View style={styles.industryItem}>
                            <MaterialIcons name='inventory' size={20} />
                            <Text style={styles.text}>Kho hàng</Text>
                        </View>
                        <TextInput
                            placeholder="Nhập số lượng hàng"
                            style={styles.quantityInput}
                            onChangeText={(text) => { handleInventoryChange(text) }}
                            keyboardType="numeric"
                        />
                    </View>
                </View>
            ) : (
                <View>
                    <View style={styles.priceContainer}>
                        <View style={styles.industryItem}>
                            <Ionicons name='pricetags-outline' size={20} />
                            <Text style={styles.text}>Giá</Text>
                        </View>
                        <View>
                            <Text>
                                {minPrice === maxPrice ? `${minPrice}` : `Giá từ ${minPrice} đến ${maxPrice}`}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.deliveryContainer}>
                        <View style={styles.industryItem}>
                            <MaterialIcons name='inventory' size={20} />
                            <Text style={styles.text}>Kho hàng</Text>
                        </View>
                        <View>
                            <Text style={styles.text}>
                                Tổng kho hàng: {totalInventory}
                            </Text>
                        </View>
                    </View>
                </View>
            )}

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
