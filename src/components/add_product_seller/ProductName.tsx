import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setProductCreateError, setProductCreateField } from '../../redux/slice/form/formCreateProductBySellerSlice';
import { IFormProductCreateState } from '../../constant/interface/formCreateProductInterface';
import { COLORS } from '../../constant/theme';




const ProductName = () => {
    //init
    const dispatch = useDispatch<any>();
    const { productCreate, productCreateError, loading } = useSelector(
        (state: IFormProductCreateState) => state.formCreateProductReducer,
    );
    const [textInputProductName, setTextInputProductName] = useState('');



    //handel
    const handleProductNameChange = async (text: string) => {
        setTextInputProductName(text);
        await dispatch(setProductCreateField({ productName: text }));

    };
    return (
        <View>
            <View style={styles.labelContainer}>
                <Text style={styles.labelText}>Tên sản phẩm</Text>
                <Text>{textInputProductName.length}/120</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Nhập tên sản phẩm"
                    maxLength={120}
                    style={styles.input}
                    onChangeText={(text) => {
                        handleProductNameChange(text);
                    }}
                />
            </View>
            {productCreateError.productName ? (
                <Text style={styles.error}>{productCreateError.productName}</Text>
            ) : null}
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
        color: COLORS.black,
        fontSize: 18
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    input: {
        color: COLORS.black,
        height: 40,
    },
    error: {
        color: 'red',
        fontSize: 12,
    },
});
