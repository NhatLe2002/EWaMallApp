import React, { useState } from 'react';
import { Control, Controller, useFormContext } from 'react-hook-form';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { ProductCreate } from '../../constant/types/productType';
import { useDispatch, useSelector } from 'react-redux';
import { InterfaceProductState } from '../../constant/interface/productInterface';
import { createProduct, setProductCreateField } from '../../redux/slice/seller/productSellerSlice';




const ProductName = () => {
    const { control } = useFormContext();
    const dispatch = useDispatch<any>();
    const { productCreate, loading } = useSelector(
        (state: InterfaceProductState) => state.productSellerReducer,
    );

    const [productName, setProductName] = useState('');

    const handleProductNameChange = (text: any) => {
        // Giới hạn chiều dài của tên sản phẩm thành 120 ký tự
        if (text.length <= 120) {
            setProductName(text);
        }
        console.log(productCreate)
    };
    const handleOnBlur = (text: any) => {
        // console.log(text);
        // setProductCreateProp((prev) => ({
        //     ...prev,
        //     productName: text,
        // }));
        // console.log(productCreateProp);
        // // dispatch(setCreateProduct(productCreateProp));
        // console.log(productCreateProp);
    };
    return (
        <View>
            <View style={styles.labelContainer}>
                <Text style={styles.labelText}>Tên sản phẩm</Text>
                <Text>{productName.length}/120</Text>
            </View>
            <View style={styles.inputContainer}>
                <Controller
                    control={control}
                    name="productName"
                    defaultValue=""
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            placeholder="Nhập tên sản phẩm"
                            maxLength={120}
                            style={styles.input}
                            onBlur={() => {
                                onBlur();
                                handleOnBlur(value);
                            }}

                            onChangeText={(text) => {
                                onChange(text);
                                handleProductNameChange(text);
                                dispatch(setProductCreateField({ productName: text }));
                            }}
                            value={value}
                        />
                    )}
                />
            </View>
            {/* <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={productName}
                    onChangeText={handleProductNameChange}
                    maxLength={120}
                    placeholder="Nhập tên sản phẩm"
                />
            </View> */}
        </View>
    );
};

export default ProductName;

const styles = StyleSheet.create({
    labelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    labelText: {
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    input: {
        height: 40,
    },
});
