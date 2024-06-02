import React, { useState } from 'react';
import { Control, Controller, useFormContext } from 'react-hook-form';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { ProductCreate } from '../../constant/types/productType';
import { useDispatch, useSelector } from 'react-redux';
import { setProductCreateField } from '../../redux/slice/form/formCreateProductBySellerSlice';
import { IFormProductCreateState } from '../../constant/interface/formCreateProductInterface';




const ProductDescription = () => {
    const dispatch = useDispatch<any>();
    const { productCreate, productCreateError, loading } = useSelector(
        (state: IFormProductCreateState) => state.formCreateProductReducer,
    );
    const [productDescription, setProductDescription] = useState('');
    const handleProductDescriptionChange = async (text: any) => {
        setProductDescription(text);
        await dispatch(setProductCreateField({ productDescription: text }));
    };
    return (
        <View>
            <View style={styles.labelContainer}>
                <Text style={styles.labelText}>Chi tiết sản phẩm</Text>
                <Text>{productDescription.length}/400</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Nhập chi tiết sản phẩm"
                    style={styles.input}
                    onChangeText={(text) => {
                        handleProductDescriptionChange(text);
                    }}
                />

            </View>
            {productCreateError.productDescription ? (
                <Text style={styles.error}>{productCreateError.productDescription}</Text>
            ) : null}
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
    error: {
        color: 'red',
        fontSize: 12,
    },
});
