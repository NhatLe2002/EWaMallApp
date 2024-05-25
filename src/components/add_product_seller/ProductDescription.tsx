import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const ProductDescription = () => {
    const [productDescription, setProductDescription] = useState('');

    const handleProductDescriptionChange = (text: any) => {
        // Giới hạn chiều dài của tên sản phẩm thành 120 ký tự
        if (text.length <= 120) {
            setProductDescription(text);
        }
    };

    return (
        <View>
            <View style={styles.labelContainer}>
                <Text style={styles.labelText}>Tên sản phẩm</Text>
                <Text>{productDescription.length}/120</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={productDescription}
                    onChangeText={handleProductDescriptionChange} 
                    maxLength={120} 
                    placeholder="Nhập tên sản phẩm"
                />
            </View>
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
