import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import HeaderTitleSeller from '../../../reusables/Title/HeaderTitleSeller'
import HeightSpacerSeller from '../../../reusables/height_spacer/HeightSpacerSeller'
import { COLORS, SIZES } from '../../../constant/theme'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux'
import { Classification, IFormProductCreateState } from '../../../constant/interface/formCreateProductInterface'
import { setClassificationRedux } from '../../../redux/slice/form/formCreateProductBySellerSlice'
import { useNavigation } from '@react-navigation/native'





const ProductComman = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch<any>();
    const { classificationRedux, productCreate } = useSelector(
        (state: IFormProductCreateState) => state.formCreateProductReducer,
    );
    const [classification, setClassification] = useState<Classification[]>([])
    const [isTypeModalVisible, setIsTypeModalVisible] = useState(false);
    const [isValueModalVisible, setIsValueModalVisible] = useState(false);
    const [newType, setNewType] = useState('');
    const [newValue, setNewValue] = useState('');
    const [selectedTypeIndex, setSelectedTypeIndex] = useState<number | null>(null);
    const [selectedValueIndex, setSelectedValueIndex] = useState<number | null>(null);
    const [isEditingType, setIsEditingType] = useState(false);

    const handleAddClassification = () => {
        setIsTypeModalVisible(true);
    };
    const handleValueSubmit = () => {
        if (selectedTypeIndex !== null) {
            const updatedClassification = classification.map((item, index) => {
                if (index === selectedTypeIndex) {
                    const updatedValues = selectedValueIndex !== null
                        ? item.value.map((val, valIndex) => valIndex === selectedValueIndex ? newValue : val)
                        : [...item.value, newValue];
                    return {
                        ...item,
                        value: updatedValues
                    };
                }
                return item;
            });

            setClassification(updatedClassification);
            setNewValue('');
            setSelectedValueIndex(null);
            setIsValueModalVisible(false);
        }
    };
    const handleTypeSubmit = () => {
        if (isEditingType && selectedTypeIndex !== null) {
            const updatedClassification = classification.map((item, index) => {
                if (index === selectedTypeIndex) {
                    return {
                        ...item,
                        type: newType
                    };
                }
                return item;
            });

            setClassification(updatedClassification);
        } else {
            setClassification([...classification, { type: newType, value: [] }]);
        }
        setNewType('');
        setIsTypeModalVisible(false);
    };
    const handleAddValue = (index: number) => {
        console.log(index);
        setSelectedTypeIndex(index);
        console.log(index);
        setIsValueModalVisible(true);
        console.log(index);
    };
    const handleNextButton = () => {
        dispatch(setClassificationRedux(classification));
        console.log(classificationRedux);
        navigation.navigate("ProductCommanDetail" as never)
        // console.log(JSON.stringify(classificationRedux, null, 2))
    };
    const handleDeleteType = (index: number) => {
        const updatedClassification = classification.filter((_, i) => i !== index);
        setClassification(updatedClassification);
    };
    const handleDeleteValue = (typeIndex: number, valIndex: number) => {
        const updatedClassification = classification.map((item, index) => {
            if (index === typeIndex) {
                return {
                    ...item,
                    value: item.value.filter((_, i) => i !== valIndex)
                };
            }
            return item;
        });
        setClassification(updatedClassification);
    };
    const handleEditValue = (typeIndex: number, valIndex: number) => {
        setSelectedTypeIndex(typeIndex);
        setSelectedValueIndex(valIndex);
        setNewValue(classification[typeIndex].value[valIndex]);
        setIsValueModalVisible(true);
    };
    const handleEditType = (index: number) => {
        setSelectedTypeIndex(index);
        setIsEditingType(true);
        setNewType(classification[index].type);
        setIsTypeModalVisible(true);
    };
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <HeaderTitleSeller text={'Thêm phân loại hàng'} />
            </View >
            <HeightSpacerSeller height={10} color='#F6F5F2' />
            <ScrollView style={styles.containnertBody}>
                {classification.map((item, index) => (
                    <View key={index}>
                        <View style={styles.title}>
                            <View style={styles.titleItem}>
                                <Text style={styles.text}>{item.type}</Text>
                                <TouchableOpacity style={styles.titleIcon}
                                    onPress={() => handleEditType(index)}>
                                    <SimpleLineIcons name='note' size={20} color='red' />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={() => handleDeleteType(index)}>
                                <Text style={styles.titleText}>Xóa</Text>
                            </TouchableOpacity>
                        </View>
                        {item.value.map((value, valIndex) => (
                            <View style={styles.containerItem} key={valIndex}>
                                <View style={styles.containerIcon}>
                                    <Text style={styles.text}>{value}</Text>
                                </View>
                                <View style={styles.containerIcon}>
                                    <TouchableOpacity style={styles.icon}
                                        onPress={() => handleEditValue(index, valIndex)}>
                                        <SimpleLineIcons name='note' size={20} color='#9290908d' />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.icon}
                                        onPress={() => handleDeleteValue(index, valIndex)}>
                                        <MaterialIcons name='cancel' size={20} color='#9290908d' />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                        <View style={styles.bottomBody}>
                            <TouchableOpacity
                                onPress={() => handleAddValue(index)}
                            >
                                <Text style={styles.titleText}>Thêm giá trị phân loại</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
            <HeightSpacerSeller height={10} color='#F6F5F2' />
            {classification.length < 2 ? (
                <TouchableOpacity
                    style={styles.buttonAddtype}
                    onPress={handleAddClassification} >
                    <Text style={styles.titleText}>
                        Thêm phân loại
                    </Text>
                </TouchableOpacity>
            ) : ('')}

            <HeightSpacerSeller height={10} color='#F6F5F2' />


            <TouchableOpacity
                onPress={handleNextButton}
                style={styles.buttonNext} >
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>



            <Modal visible={isTypeModalVisible} transparent={true} animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TextInput
                            placeholder="Nhập loại mới"
                            value={newType}
                            onChangeText={setNewType}
                            style={styles.input}
                        />
                        <View
                            style={{
                                width: '100%',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-around'
                            }}>
                            <TouchableOpacity
                                style={styles.buttonModal}
                                onPress={handleTypeSubmit}
                            >
                                <Text style={{ color: COLORS.black }}>
                                    Thêm
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.buttonModal}
                                onPress={() => setIsTypeModalVisible(false)}>
                                <Text style={{ color: COLORS.black }}>
                                    Hủy
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal visible={isValueModalVisible} transparent={true} animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TextInput
                            placeholder="Nhập giá trị mới"
                            value={newValue}
                            onChangeText={setNewValue}
                            style={styles.input}
                        />
                        <View
                            style={{
                                width: '100%',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-around'
                            }}>
                            <TouchableOpacity
                                style={styles.buttonModal}
                                onPress={handleValueSubmit}
                            >
                                <Text style={{ color: COLORS.black }}>
                                    Thêm
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.buttonModal}
                                onPress={() => setIsValueModalVisible(false)}>
                                <Text style={{ color: COLORS.black }}>
                                    Hủy
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
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
        flex: 1,
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
    buttonAddtype: {
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
    },



    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    input: {
        color: COLORS.black,
        width: '100%',
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        marginBottom: 10,
    },
    buttonNext: {
        height: '7%',
        borderBlockColor: 'red',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
    },
    buttonText: {
        fontSize: 20,
        color: 'red',
    },
    buttonModal: {
        paddingVertical: 10,
        paddingHorizontal: 25,
        backgroundColor: COLORS.yellow,
    }
})