import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderTitleSeller from '../../../reusables/Title/HeaderTitleSeller'
import HeightSpacerSeller from '../../../reusables/height_spacer/HeightSpacerSeller'
import { useDispatch, useSelector } from 'react-redux'
import { Classification, IFormProductCreateState } from '../../../constant/interface/formCreateProductInterface'
import { COLORS } from '../../../constant/theme'
import { ProductSellCommand } from '../../../constant/types/productSellCommand'
import { setProductCreateField } from '../../../redux/slice/form/formCreateProductBySellerSlice'
import { useNavigation } from '@react-navigation/native'
// import { Form } from 'react-hook-form'

const ProductCommanDetail = () => {
    const dispatch = useDispatch<any>();
    const navigation = useNavigation();
    const { classificationRedux, productCreate } = useSelector(
        (state: IFormProductCreateState) => state.formCreateProductReducer,
    );
    const [totalIndex, setTotalIndex] = useState(0);
    const [productCommanList, setProductCommanList] = useState<ProductSellCommand[]>([]);
    const [classification, setClassification] = useState<Classification[]>([]);
    useEffect(() => {
        setClassification(classificationRedux);
        console.log(classificationRedux)
    }, [classificationRedux])
    useEffect(() => {
        console.log(classificationRedux)
        setProductCommanList([]);
        if (classification.length === 2) {
            const newProductCommanList: ProductSellCommand[] = [];
            newProductCommanList.push({
                name: classification[0].type,
                price: "",
                inventoryNumber: "0",
                path: "/A",
                parentNodeId: "",
            });
            newProductCommanList.push({
                name: classification[1].type,
                price: "",
                inventoryNumber: "0",
                path: "/B",
                parentNodeId: "",
            });
            classification[0].value.forEach((size, index1) => {
                newProductCommanList.push({
                    name: size,
                    price: "",
                    inventoryNumber: "0",
                    path: `/A/${index1 + 1}`,
                    parentNodeId: "",
                });
            });
            classification[0].value.forEach((item1, index1) => {
                classification[1].value.forEach((item2, index2) => {
                    newProductCommanList.push({
                        name: `${item1} - ${item2}`,
                        price: "",
                        inventoryNumber: "",
                        path: `/B/${index1 + 1}`,
                        parentNodeId: "",
                    });
                })
            })
            setProductCommanList(newProductCommanList);
        }
        else if (classification.length === 1) {
            const newProductCommanList: ProductSellCommand[] = [];
            newProductCommanList.push({
                name: classification[0].type,
                price: "",
                inventoryNumber: "0",
                path: "/A",
                parentNodeId: "",
            });
            classification[0].value.forEach((item, index1) => {
                newProductCommanList.push({
                    name: item,
                    price: "",
                    inventoryNumber: "0",
                    path: `/A/${index1 + 1}`,
                    parentNodeId: "",
                });
            });
        }
        // console.log("Check")
    }, [classification])
    const handleSummit = () => {
        dispatch(setProductCreateField({ productSellCommand: productCommanList }));
        navigation.navigate('AddProductSeller' as never)
        console.log(JSON.stringify(classificationRedux, null, 2));
        console.log(JSON.stringify(productCommanList, null, 2));
        // console.log(productCommanList.length)
        // console.log(JSON.stringify(productCreate, null, 2));
    }

    type ProductSellCommandField = keyof ProductSellCommand;
    const handleInputChange = (outnerIndex: number, innerIndex: number, field: ProductSellCommandField, value: string) => {
        const updatedList = [...productCommanList];
        const combinedIndex = innerIndex + outnerIndex + classification.length + classification[0].value.length + (outnerIndex === 1 ? classification[1].value.length -1  : 0);
        // console.log(combinedIndex);
        // console.log(innerIndex, outnerIndex)
        // console.log(field);
        // console.log(classification.length + classification[0].value.length)
        // console.log(innerIndex);
        updatedList[combinedIndex][field] = value;
        // console.log(updatedList);
        setProductCommanList(updatedList);
        // console.log(JSON.stringify(productCommanList, null, 2));
    };
    const renderOuterItem = ({ item, index }: { item: string, index: number }) => (
        <View style={styles.containerSubBody}>
            <View style={styles.title}>
                <Text style={styles.titleText}>{item}</Text>
            </View>
            <HeightSpacerSeller height={1} color='#9290908d' />
            {classification.length === 1 ? (
                <View style={styles.subBody}>

                    <View style={styles.valueTitle}>
                        <Text style={styles.valueText}>{item}</Text>
                    </View>
                    <View style={styles.detailContainer}>
                        <View style={styles.priceContainer}>
                            <Text style={styles.texPriceAndInventory}>
                                Giá
                            </Text>
                            <TextInput style={styles.input}
                                // onChangeText={(value) => handleInputChange(outerIndex,'price', value)}
                                // onChange={(value) => handleInputChange(outerIndex, 'price', value)}
                                value={productCommanList[index + classification.length + classification[0].value.length]?.price}
                            ></TextInput>
                            <View style={styles.validateContainer}>
                                {/* <Text style={styles.validateText}>sfasdfsadf</Text> */}
                            </View>
                        </View>
                        <View style={styles.priceContainer}>
                            <Text style={styles.texPriceAndInventory}>
                                Kho hàng
                            </Text>
                            <TextInput
                                // onChangeText={(value) => handleInputChange(outerIndex, innerIndex, 'inventoryNumber', value)}
                                value={productCommanList[index + classification.length + classification[0].value.length]?.inventoryNumber}
                                style={styles.input}>
                            </TextInput>
                            <View style={styles.validateContainer}>
                                {/* <Text style={styles.validateText}>sfasdfsadf</Text> */}
                            </View>
                        </View>
                    </View>

                    <HeightSpacerSeller height={1} color='#9290908d' />

                </View>
            ) : (
                <View>
                    <FlatList
                        scrollEnabled={false}
                        data={classification[1].value}
                        renderItem={({ item: innerItem, index: innerIndex }) => renderInnerItem_LV2({ item: innerItem, outerItem: item, outerIndex: index, innerIndex })}
                        keyExtractor={(innerItem, innerIndex) => `${innerItem}-${innerIndex}`}
                    />
                </View>
            )}
        </View>
    );


    const renderInnerItem_LV2 = ({ item, outerItem, outerIndex, innerIndex }: { item: string, outerItem: string, outerIndex: number, innerIndex: number }) => (
        <View style={styles.subBody}>

            <View style={styles.valueTitle}>
                <Text style={styles.valueText}>{outerItem} - {item}</Text>
            </View>
            <View style={styles.detailContainer}>
                <View style={styles.priceContainer}>
                    <Text style={styles.texPriceAndInventory}>
                        Giá
                    </Text>
                    <TextInput style={styles.input}
                        onChangeText={(value) => handleInputChange(outerIndex, innerIndex, 'price', value)}
                        // onChange={(value) => handleInputChange(outerIndex, 'price', value)}
                        value={productCommanList[innerIndex + outerIndex + classification.length + classification[0].value.length + (outerIndex === 1 ? classification[1].value.length -1 : 0)]?.price}
                    ></TextInput>
                    <View style={styles.validateContainer}>
                        {/* <Text style={styles.validateText}>sfasdfsadf</Text> */}
                    </View>
                </View>
                <View style={styles.priceContainer}>
                    <Text style={styles.texPriceAndInventory}>
                        Kho hàng
                    </Text>
                    <TextInput
                        onChangeText={(value) => handleInputChange(outerIndex, innerIndex, 'inventoryNumber', value)}
                        value={productCommanList[innerIndex + outerIndex + classification.length + classification[0].value.length + (outerIndex === 1 ? classification[1].value.length -1 : 0)]?.inventoryNumber}
                        style={styles.input}>
                    </TextInput>
                    <View style={styles.validateContainer}>
                        {/* <Text style={styles.validateText}>sfasdfsadf</Text> */}
                    </View>
                </View>
            </View>

            <HeightSpacerSeller height={1} color='#9290908d' />

        </View>
    );
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <HeaderTitleSeller text={'Set phân loại sản phẩm'} />
            </View >
            <HeightSpacerSeller height={10} color='#F6F5F2' />
            <View style={styles.list}>
                {classification.length > 0 && (
                    <FlatList
                        data={classification[0].value}
                        renderItem={renderOuterItem}
                        keyExtractor={(item, index) => `${item}-${index}`}
                    />
                )}
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleSummit}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>
                        Lưu
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ProductCommanDetail

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
    containerSubBody: {
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    title: {
        height: 30,
        // alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 20
    },
    titleText: {
        fontSize: 15,
        color: 'red'
    },
    valueTitle: {
        height: 30,
        paddingLeft: 15,
        justifyContent: 'center'
        // alignItems: 'center'
    },
    valueText: {
        fontSize: 15,
        color: COLORS.black
    },
    subBody: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    detailContainer: {
        flexDirection: 'row',
        // justifyContent: 'space-around'
        paddingHorizontal: 12
    },
    priceContainer: {
        paddingHorizontal: 3,
        width: '50%',
        // marginHorizontal: 5,

    },
    input: {
        borderColor: 'red',
        borderWidth: 0.5,
        height: 40
    },
    validateContainer: {
        justifyContent: 'flex-start',
        height: 50,
    },
    validateText: {
        color: 'red',
        fontSize: 12
    },
    texPriceAndInventory: {
        fontSize: 12,
        color: COLORS.gray_1
    },
    list: {
        flex: 1
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#9290908d',
        borderWidth: 1,
        height: 50,
        padding: 5,
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: COLORS.gray_1
    },
    buttonText: {
        color: COLORS.black,
        fontSize: 20,
    }
})