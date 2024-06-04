import { StyleSheet, Text, View, Modal } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Gesture, GestureDetector, ScrollView, TextInput, TouchableHighlight } from 'react-native-gesture-handler';
import { COLORS, SIZES } from '../../../constant/theme';
import { useNavigation, useRoute } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Animated, { Easing, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import SearchCategory from './SearchCategory';
import ProductListSearch from '../../../reusables/list_item/ProductListSearch';
import { InterfaceProductState } from '../../../constant/interface';
import { useDispatch, useSelector } from 'react-redux';
import { getProductBySearch, setClearSearchProduct, setProductFilterList, setProductFilterListToProductList } from '../../../redux/slice/productSlice';
import { Product} from '../../../constant/types';

const SearchPageResult: React.FC = () => {
    const route: any = useRoute().params;
    const [modalVisible, setModalVisible] = useState(false);
    const translateY = useSharedValue(SIZES.height/2);
    const test = useSharedValue(false);
    const dispatch = useDispatch<any>();
    const [productShow, setProductShow] = useState([] as Product[])
    const {productSearchList, productFilterList} = useSelector(
        (state: InterfaceProductState) => state.productReducer,
    );
    useEffect(() => {
        loadProduct()
    }, [dispatch]);
    useEffect(() =>{
        setProductShow(productSearchList);
    }, [productSearchList])
    function loadProduct(){
        dispatch(getProductBySearch(route.searchValue.searchKey)); 
    }

    const HandleModalClose = () => {
        translateY.value = SIZES.height
        setTimeout(() => {
            setModalVisible(false)
        }, 300); 
    }
    const HandleFilterSubmit = () =>{
        setProductShow(productFilterList);
        translateY.value = SIZES.height
        setTimeout(() => {
            setModalVisible(false)
        }, 300); 
    }
    const gesture = Gesture.Pan().onBegin((event) => {
    }).onUpdate((event) => {
        if (test.value == true) {
            if (event.y > SIZES.height/9) {
                translateY.value = event.y
            }
            else {
                translateY.value = SIZES.height/6
            }
            if (event.y > SIZES.height/1.7) {
                translateY.value = SIZES.height/1.9
            }
        }
    }).onEnd((event) => {
        test.value = false;
        if (event.y > SIZES.height*(4/5)) {
            translateY.value = SIZES.height
            runOnJS(setModalVisible)(false);
        }
    })
    const rBottomSheetStyle = useAnimatedStyle(() => {
        return {
            transform: [{
                translateY:
                    withTiming(translateY.value, {
                        duration: 100,
                        easing: Easing.linear
                    })

            }]
        }
    })
    var navigation = useNavigation();
    return (
        <GestureDetector
            gesture={gesture}
        >
            <View>
                <View style={styles.container_parrent}>
                    <TouchableHighlight
                        underlayColor={COLORS.white}
                        onPress={() => {
                            dispatch(setClearSearchProduct())
                            navigation.goBack()
                        }}>
                        <Feather name="arrow-left" size={30} color={COLORS.yellow} />
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor={COLORS.white}
                        onPress={() => navigation.goBack()}>
                        <View
                            style={styles.container}>
                            <View style={styles.content}>
                                <TextInput
                                    placeholder="Search"
                                    clearButtonMode="always"
                                    autoCapitalize="none"
                                    readOnly={true}
                                    value={route.searchValue.searchKey}
                                    style={{ color: "black" , height: '10%'}}
                                />
                            </View>
                            <View style={styles.content}>
                                <Feather name="camera" size={16} color={COLORS.gray_1} />
                                <MaterialIcons
                                    name="keyboard-voice"
                                    size={18}
                                    color={COLORS.gray_1}
                                />
                            </View>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor={COLORS.white}
                        style={{
                            backgroundColor: COLORS.white,
                            height: SIZES.height / 25,
                            width: SIZES.width / 10,
                            marginLeft: 5,
                            alignItems: 'center',
                            flexDirection: "row",
                        }}
                        onPress={() => {
                            setModalVisible(true)
                            translateY.value = SIZES.height / 2
                        }

                        }>
                        <View style={{ flexDirection: "row", alignItems: 'center', }}>
                            <AntDesign
                                name="filter"
                                style={{ backgroundColor: COLORS.white, marginVertical: 'auto' }}
                                size={20}
                                color={COLORS.yellow}
                            />
                            <Text style={{ color: COLORS.yellow, fontSize: 12 }}>Lọc</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <ScrollView style={{height: "100%"}}>
                            {
                                productSearchList? <><ProductListSearch products={productShow}/></>:<View style={{alignSelf: "center", justifyContent: "space-around", height: SIZES.height/2}}><Text>Sản phẩm không tồn tại</Text></View>
                            }
                </ScrollView>
                {
                    modalVisible == true ? (
                        <>
                            <View
                                style={styles.container_modal}
                            >
                                <TouchableHighlight
                                    underlayColor="rgba(180, 180, 180, 0)"
                                    onPress={HandleModalClose}>
                                    <MaterialIcons
                                        name="exit-to-app"
                                        style={{ marginLeft: "90%", marginTop: "20%", alignSelf: "flex-start" }}
                                        size={40}
                                        color={COLORS.yellow}
                                    />
                                </TouchableHighlight>
                                <Animated.View
                                    onTouchStart={() => {

                                    }}
                                    style={[styles.container_modal_content, rBottomSheetStyle]}>
                                    <TouchableHighlight
                                        underlayColor={COLORS.yellow}
                                        style={{ borderRadius: 25 }}
                                        onPressIn={() => {
                                            test.value = true
                                        }}
                                    //onPressOut={()=> setResideButton(false)}
                                    >
                                        <View style={styles.line}></View>
                                    </TouchableHighlight>
                                    {/* Filter screennnnnnnnnnnnnnnnnnnnn ----------------------*/}
                                    <View style={{height: "70%"}}>
                                    <ScrollView>
                                        <View style={styles.category}>
                                            <Text>Theo Giá Sản Phẩm</Text>
                                            <View style={styles.category_list}>
                                                <SearchCategory data={[{name:"Cao Đến Thấp", active : false}, {name:"Thấp Đến Cao", active : false}]} />
                                            </View>
                                        </View>
                                        <View style={styles.category}>
                                            <Text>Đánh Giá</Text>
                                            <View style={styles.category_list}>
                                                <SearchCategory data={[{name:"5 Sao", active : false}, {name:"Từ 4 Sao", active : false}, {name:"Từ 3 Sao", active : false}, {name:"Từ 2 Sao", active : false}, {name:"Từ 1 Sao" , active : false}]} />
                                            </View>
                                        </View>                                    
                                    </ScrollView>
                                    </View>
                                </Animated.View>
                                <View style={styles.button}>
                                    <TouchableHighlight
                                        underlayColor={COLORS.yellow}
                                        onPress={() => {
                                            loadProduct();
                                            HandleModalClose();
                                            }}
                                        style={{
                                            height: "100%",
                                            width: SIZES.width / 2.5,
                                            backgroundColor: COLORS.white,
                                            marginLeft: 10,
                                            borderRadius: 5,
                                            borderWidth: 2,
                                            borderColor: COLORS.yellow,
                                            justifyContent: "space-around"
                                        }}
                                    >
                                        <View>
                                            <Text style={{ alignSelf: "center" }}>Thiết Lập Lại</Text>
                                        </View>
                                    </TouchableHighlight>
                                    <TouchableHighlight
                                        underlayColor={COLORS.yellow}
                                        onPress={() => { 
                                            HandleFilterSubmit();
                                        }}
                                        style={{
                                            height: "100%",
                                            width: SIZES.width / 2.5,
                                            backgroundColor: COLORS.yellow,
                                            marginRight: 10,
                                            borderRadius: 5,
                                            justifyContent: "space-around"
                                        }}>
                                        <View>
                                            <Text style={{ alignSelf: "center" }}>Áp dụng</Text>
                                        </View>
                                    </TouchableHighlight>
                                </View>
                            </View></>
                    ) : (<></>)
                }

            </View>
        </GestureDetector>
    );
};

export default SearchPageResult;

const styles = StyleSheet.create({
    container: {
        right: 0,
        marginTop: 10,
        marginBottom: 10,
        height: SIZES.height / 25,
        width: SIZES.width / 1.4,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: COLORS.yellow,
        backgroundColor: COLORS.white,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    container_parrent: {
        right: 0,
        height: SIZES.height / 15,
        width: SIZES.width,
        backgroundColor: COLORS.white,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    container_modal: {
        height: SIZES.height,
        width: SIZES.width,
        backgroundColor: "rgba(180, 180, 180, 0.7)",
        paddingHorizontal: 10,
        position: "absolute",
        alignItems: 'center',
        elevation: 5
    },
    container_modal_content: {
        marginTop: "70%",
        height: "100%",
        bottom: 0,
        width: SIZES.width / 1.025,
        borderTopLeftRadius: 25,
        borderTopEndRadius: 25,
        backgroundColor: COLORS.white,
        borderWidth: 2,
        borderColor: COLORS.yellow,
        position: "absolute",
        paddingHorizontal: 10,
        elevation: 5
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        right: 0,
    },
    line: {
        width: 75,
        height: 4,
        backgroundColor: "grey",
        alignSelf: "center",
        marginVertical: 15,
        borderRadius: 10,
    },
    button: {
        height: "5%",
        bottom: 30,
        width: "90%",
        flexDirection: "row",
        position: "absolute",
        alignSelf: 'center',
        alignItems: "flex-end",
        justifyContent: "space-between",
        elevation: 6
    },
    category: {
        borderBottomWidth: 1,
        borderColor: "grey",
    },
    category_list: {
        alignItems: 'center',
        alignSelf: "center",
        width: "100%",
        justifyContent: "space-around",
        margin: 10,

    },
    category_list_item: {
        width: "50%"
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});
