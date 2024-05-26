import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const ProductInfor = () => {
    const navigation = useNavigation();
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

    return (
        <View style={styles.container}>
            <TouchableOpacity 
            onPress={() => navigation.navigate("Industry" as never)}
            style={styles.industryContainer}>
                <View style={styles.industryItem}>
                    <AntDesign name='menuunfold' size={20} />
                    <Text style={styles.text}>Ngành hàng</Text>
                </View>
                <MaterialIcons name='navigate-next' size={20} />
            </TouchableOpacity>
            <View style={styles.priceContainer}>
                <View style={styles.industryItem}>
                    <Ionicons name='pricetags-outline' size={20} />
                    <Text style={styles.text}>Giá</Text>
                </View>
                <TextInput
                    style={styles.priceInput}
                    keyboardType="numeric"
                    value={price}
                    onChangeText={handlePriceChange}
                    placeholder="Nhập giá"
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
                <TextInput
                    style={styles.quantityInput}
                    keyboardType="numeric"
                    value={inventory}
                    onChangeText={handleInventoryChange}
                    placeholder="Nhập số lượng hàng"
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
