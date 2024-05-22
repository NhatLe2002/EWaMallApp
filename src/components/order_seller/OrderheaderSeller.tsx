import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import HeaderTitleSeller from '../../reusables/Title/HeaderTitleSeller'
import { TouchableOpacity } from 'react-native'
import { COLORS } from '../../constant/theme';

const orderStatuss = [
    { id: 1, name: 'Chờ lấy hàng', quantity: 7 },
    { id: 2, name: 'Đơn hủy', quantity: 7 },
    { id: 3, name: 'Trả hàng/Hoàn tiền', quantity: 7 },
    { id: 4, name: 'Phản hồi đánh giá', quantity: 7 },
    { id: 5, name: 'Còn hàng', quantity: 7 },
    { id: 6, name: 'Còn hàng', quantity: 7 }
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
const OrderheaderSeller = () => {
    const [selectedId, setSelectedId] = useState(1);
    const [selectedRecentItemId, setSelectedRecentItemId] = useState(1);

    return (
        <View>
            <View style={{ marginTop: 15 }}>
                <HeaderTitleSeller text={'Đơn hàng của tôi'} />
            </View>
            <View style={{ marginTop: 10 }}>

                <ScrollView horizontal={true} contentContainerStyle={styles.scrollViewContent}>
                    {orderStatuss.map((product) => (
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
    )
}

export default OrderheaderSeller

const styles = StyleSheet.create({
    scrollViewContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    touchable: {
        marginRight: 20,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
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
        marginTop: 10,
        marginLeft: 20,
        paddingVertical: 3,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        minWidth: 80,
    },
    selectedRecentTouchable: {
        backgroundColor: '#CBBA63',
        color: 'white',
    },
})