import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import HeaderTitleSeller from '../../../reusables/Title/HeaderTitleSeller'
import HeightSpacerSeller from '../../../reusables/height_spacer/HeightSpacerSeller'
import { COLORS, SIZES } from '../../../constant/theme'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux'





const ProductComman = () => {
    const dispatch = useDispatch<any>();
    const [type, setType] = useState('');
    const [value, setValue] = useState('');


    const handleAddClassification = () => {
        if (type && value) {
            // dispatch(addClassification({ type, value }));
            setType('');
            setValue('');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <HeaderTitleSeller text={'Thêm phân loại hàng'} />
            </View >
            <HeightSpacerSeller height={10} color='#F6F5F2' />

            <View style={styles.containnertBody}>
                <View style={styles.title}>
                    <View style={styles.titleItem}>
                        <Text style={styles.text}>
                            Màu
                        </Text>
                        <TouchableOpacity style={styles.titleIcon}>
                            <SimpleLineIcons name='note' size={20} color='red' />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity>
                        <Text style={styles.titleText}>
                            Xóa
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerItem}>
                    <View style={styles.containerIcon}>
                        <Text style={styles.text}>
                            xanh
                        </Text>
                    </View>
                    <View style={styles.containerIcon}>
                        <TouchableOpacity style={styles.icon}>
                            <SimpleLineIcons name='note' size={20} color='#9290908d' />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.icon}>
                            <MaterialIcons name='cancel' size={20} color='#9290908d' />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.bottomBody}>
                    <TouchableOpacity>
                        <Text style={styles.titleText}>
                            Thêm giá trị phân loại
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity onPress={handleAddClassification} >
                <Text>Thêm phân loại</Text>
            </TouchableOpacity>
            <HeightSpacerSeller height={10} color='#F6F5F2' />
        </View>
    )
}

export default ProductComman

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        flexDirection: 'column',
    },
    header: {
        borderBottomColor: '#9290908d',
        borderBottomWidth: 1,
        padding: 10
    },
    containnertBody: {
        backgroundColor: '#ffffff',
        flexDirection: 'column',
    },
    title: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBlockColor: '#9290908d',
        paddingHorizontal: 10,
        paddingVertical: 10,
        alignItems: 'center'
    },
    bottomBody: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBlockColor: '#9290908d',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    titleItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    text: {
        fontSize: SIZES.medium,
        color: COLORS.black,
    },
    titleText: {
        fontSize: SIZES.medium,
        color: 'red'
    },
    containerIcon: {
        flexDirection: 'row',
    },
    containerItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBlockColor: '#9290908d',
        paddingHorizontal: 25,
        paddingVertical: 20,
        alignItems: 'center'
    },
    icon: {
        marginHorizontal: 5
    },
    titleIcon: {
        marginHorizontal: 5
    }
})