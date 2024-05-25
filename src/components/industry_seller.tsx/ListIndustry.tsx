import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const lv1List = [
    { id: 1, name: 'Còn hàng', quantity: 7 },
    { id: 2, name: 'Hết hàng', quantity: 7 },
    { id: 3, name: 'Chờ duyệt', quantity: 7 },
    { id: 4, name: 'Vi phạm', quantity: 7 },
    { id: 5, name: 'Còn hàng', quantity: 7 },
    { id: 6, name: 'Còn hàng', quantity: 7 }
];
const lv2List = [
    { id: 1, name: 'Còn hàng2', quantity: 7 },
    { id: 2, name: 'Hết hàng2', quantity: 7 },
    { id: 3, name: 'Chờ duyệt', quantity: 7 },
    { id: 4, name: 'Vi phạm', quantity: 7 },
    { id: 5, name: 'Còn hàng', quantity: 7 },
    { id: 6, name: 'Còn hàng', quantity: 7 }
];
const lv3List = [
    { id: 1, name: 'Còn hàng3', quantity: 7 },
    { id: 2, name: 'Hết hàng3', quantity: 7 },
    { id: 3, name: 'Chờ duyệt', quantity: 7 },
    { id: 4, name: 'Vi phạm', quantity: 7 },
    { id: 5, name: 'Còn hàng', quantity: 7 },
    { id: 6, name: 'Còn hàng', quantity: 7 }
];

const ListIndustry = () => {
    const [industry, setIndustry] = useState([
        { id: 1, name: 'Vui lòng chọn' },
    ]);
    const [selectedId, setSelectedId] = useState(1);
    const [listIndustryResult, setListIndustryResult] = useState(lv1List);

    const handleSelectIndustry = (selectedIndustry: any) => {
        const updatedIndustry = [...industry];
        if (updatedIndustry.length > 0) {
            updatedIndustry[updatedIndustry.length - 1].name = selectedIndustry.name;
            setListIndustryResult(lv2List)
        }
        updatedIndustry.push({ id: updatedIndustry.length + 1, name: 'Vui lòng chờ' });
        setIndustry(updatedIndustry);
    }
    return (
        <View style={styles.container}>
            <View style={styles.headerList}>
                <ScrollView horizontal={true} contentContainerStyle={styles.scrollViewContent}>
                    {industry.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={[
                                styles.touchable,
                                selectedId === item.id && styles.selectedTouchable
                            ]}
                            onPress={() => setSelectedId(item.id)}
                        >
                            <Text style={[
                                styles.text,
                                selectedId === item.id && styles.selectedText
                            ]}>
                                {item.name}
                            </Text>
                            {selectedId === item.id && <View style={styles.underline} />}
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
            <ScrollView style={styles.scrollViewList}>
                {listIndustryResult.map((industry) => (
                    <TouchableOpacity
                        style={styles.touchableDetail}
                        key={industry.id}
                        onPress={() => handleSelectIndustry(industry)}
                    >
                        <Text>
                            {industry.name}
                        </Text>
                        <MaterialIcons name='navigate-next' size={20} />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    )
}

export default ListIndustry

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column'
    },
    headerList: {
    },
    scrollViewList: {
    },
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
    touchableDetail: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#cececeb5'
    },
})
