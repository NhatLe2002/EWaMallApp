import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import React, { useState } from 'react';
import HeaderTitleSeller from '../../reusables/Title/HeaderTitleSeller';
import { color } from 'react-native-elements/dist/helpers';
import { COLORS } from '../../constant/theme';

const productStatuss = [
    { id: 1, name: 'Còn hàng', quantity: 7 },
    { id: 2, name: 'Hết hàng', quantity: 2 },
    { id: 3, name: 'Chờ duyệt', quantity: 7 },
    { id: 4, name: 'Vi phạm', quantity: 0 },
    { id: 5, name: 'Đã ẩn', quantity: 1 },
];
const renderRecentItems = (selectedId: any) => {
    if (selectedId === 1) {
        return [
            { id: 1, name: 'Gần đây' },
            { id: 2, name: 'Tất cả' },
            { id: 3, name: 'Hỗ trợ' }
        ];
    } else if (selectedId === 2) {
        return [
            { id: 1, name: 'Thêm sản phẩm' },
            { id: 2, name: 'Chỉnh sửa' }
        ];
    } else {
        return [];
    }
};

const HeaderProductSeller = () => {
    const [selectedId, setSelectedId] = useState(1);
    const [selectedRecentItemId, setSelectedRecentItemId] = useState(1);

    return (
        <View  style={styles.container}>
            <View style={{ marginTop: 15 }}>
                <HeaderTitleSeller text={'Sản phẩm của tôi'} />
            </View>
            <View style={{ marginTop: 10 }}>

                <ScrollView horizontal={true} contentContainerStyle={styles.scrollViewContent}>
                    {productStatuss.map((product) => (
                        <TouchableOpacity
                            key={product.id}
                            style={[
                                styles.touchable,
                                selectedId === product.id && styles.selectedTouchable
                            ]}
                            onPress={() => setSelectedId(product.id)}
                        >
                            <Text style={[
                                styles.text,
                                selectedId === product.id && styles.selectedText
                            ]}>
                                {product.name}
                            </Text>
                            <Text style={[
                                styles.text,
                                selectedId === product.id && styles.selectedText
                            ]}>
                                {product.quantity}
                            </Text>
                            {selectedId === product.id && <View style={styles.underline} />}
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <View>
                <View>
                    <ScrollView horizontal={true}>
                        {renderRecentItems(selectedId).map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                style={[
                                    styles.recentTouchable,
                                    selectedRecentItemId === item.id && styles.selectedRecentTouchable // Thay đổi kiểu CSS khi được chọn
                                ]}
                                onPress={() => setSelectedRecentItemId(item.id)} // Cập nhật ID của mục "Gần đây" được chọn
                            >
                                <Text style={[styles.text, selectedRecentItemId === item.id && { color: COLORS.white } ]}>{item.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </View>

        </View>
    );
};

export default HeaderProductSeller;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        flexDirection: 'column',
    },
    scrollViewContent: {
        backgroundColor: '#fffff',
        flexDirection: 'row',
        alignItems: 'center',
    },
    touchable: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#fffff',
        alignItems: 'center',
    },
    selectedTouchable: {
        borderBottomWidth: 2,
        borderBottomColor: 'yellow',
    },
    text: {
        color: 'black',
    },
    selectedText: {
        color: '#E9BB45',
    },
    underline: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 2,
        backgroundColor: '#E9BB45',
    },
    recentTouchable: {
        marginVertical: 10,
        marginLeft: 20,
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 5,
        alignItems: 'center',
        minWidth: 80,
    },
    selectedRecentTouchable: {
        backgroundColor: '#CBBA63',
        color: 'white',
    },
});
