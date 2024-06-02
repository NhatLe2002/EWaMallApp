import React, { useState } from 'react';
import { Control, Controller, useFormContext } from 'react-hook-form';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { ProductCreate } from '../../constant/types/productType';
import { useDispatch, useSelector } from 'react-redux';
import { InterfaceProductState } from '../../constant/interface/productInterface';
import { setProductCreateField } from '../../redux/slice/seller/productSellerSlice';





const ProductDescription = () => {
    const { control } = useFormContext();
    const dispatch = useDispatch<any>();
    const { productCreate, loading } = useSelector(
        (state: InterfaceProductState) => state.productSellerReducer,
    );
    const [productDescription, setProductDescription] = useState('');
    const handleProductDescriptionChange = (text: any) => {
        // Giới hạn chiều dài của tên sản phẩm thành 120 ký tự
        if (text.length <= 400) {
            setProductDescription(text);
        }
        console.log(productCreate)
    };

    return (
        <View>
            <View style={styles.labelContainer}>
                <Text style={styles.labelText}>Chi tiết sản phẩm</Text>
                <Text>{productDescription.length}/400</Text>
            </View>
            <View style={styles.inputContainer}>
                <Controller
                    control={control}
                    name="productDescription"
                    defaultValue=""
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            placeholder="Nhập chi tiết sản phẩm"
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={(text) => {
                                onChange(text);
                                handleProductDescriptionChange(text);
                                dispatch(setProductCreateField({ productDescription: text }));
                            }}
                            value={value}
                        />
                    )}
                />
            </View>
            {/* <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={productDescription}
                    onChangeText={handleProductDescriptionChange}
                    maxLength={120}
                    placeholder="Nhập tên sản phẩm"
                />
            </View> */}
        </View>
    );
};

export default ProductDescription;

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
