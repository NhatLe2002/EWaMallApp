import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import HeaderShop from '../../../components/shop/HeaderShop';
import { COLORS, FONTS } from '../../../constant/theme';
import { ScrollView } from 'react-native';
import BodyTitle from '../../../reusables/Title/BodyTitle';
import { useDispatch, useSelector } from 'react-redux';
import { InterfaceProductState } from '../../../constant/interface/productInterface';
import { Product } from '../../../constant/types/productType';
import { getProductsBySellerId } from '../../../redux/slice/seller/productSellerSlice';
import { useNavigation } from '@react-navigation/native';

const navigate = [
    { id: 1, name: 'Trang chủ' },
    { id: 2, name: 'Sản phẩm' },
    { id: 3, name: 'Hàng mới về' },
    { id: 4, name: 'Danh mục' },
    { id: 5, name: 'Khác' },
];

const ShopHome = () => {
    const dispatch = useDispatch<any>();
    const navigation = useNavigation<any>();
    const [selectedItem, setSelectedItem] = useState<number | null>(1);
    const { productList, productListRenderRedux } = useSelector(
        (state: InterfaceProductState) => state.productSellerReducer,
    );
    const handleItemPress = (id: number) => {
        setSelectedItem(id);
    };
    useEffect(() => {
        dispatch(getProductsBySellerId(2));
    }, []);

    const renderItem = ({ item }: { item: { id: number; name: string } }) => {
        const isSelected = selectedItem === item.id;
        return (
            <TouchableOpacity
                onPress={() => handleItemPress(item.id)}
                style={[styles.textNavigateContainer, isSelected && styles.selectedItem]}
            >
                <Text style={{ color: isSelected ? COLORS.yellowMain : COLORS.black }}>{item.name}</Text>
            </TouchableOpacity>
        );
    };
    const renderProductItem = ({ item }: { item: Product }) => (

        <View>
            <TouchableOpacity
                style={styles.productItem}
                onPress={() => {
                    navigation.navigate('ProductDetail', { productId: item.id });
                }}>
                <Image
                    style={styles.productImage}
                    source={require('../../../assets/images/ProductShopHome.png')}
                />
                <View>
                    <View>
                        <Text style={{ color: COLORS.black, fontFamily: FONTS.inter_medium, }}>
                            {item.productName}
                        </Text>
                    </View>
                    <View style={styles.detailProductContainner}>
                        <View>
                            <Text style={{ color: COLORS.price, fontSize: 15 }}>
                                Giá: 123123
                            </Text>
                        </View>
                        <View style={{ marginLeft: 20 }}>
                            <Text style={{ color: COLORS.black, fontFamily: FONTS.inter_medium, fontSize: 12 }}>
                                Đá bán: 25
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <HeaderShop />
            </View>
            <View style={styles.navigateContainer}>
                <FlatList
                    contentContainerStyle={styles.navigate}
                    horizontal={true}
                    data={navigate}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
            <View style={styles.scrollViewContainer}>
                <ScrollView>
                    <Image
                        style={styles.avatar}
                        source={require('../../../assets/images/ShopImage.png')}
                    />
                    <View style={styles.descriptionContainner}>
                        <View style={styles.titleDescriptionContainner}>
                            <Text style={styles.descriptionTitle}>
                                Shop Notice
                            </Text>
                        </View>
                        <Text style={styles.descriptionText}>
                            Chào mừng bạn đến với EWaMall Shop
                        </Text>
                        <Text style={styles.descriptionText}>
                            Chúng tôi chuyên cung cấp các loại ghế massage
                        </Text>
                    </View>
                    <View style={{ paddingHorizontal: 10 }}>
                        <View style = {{marginVertical: 5}}>
                            <BodyTitle titleLeft='Sản phẩm bán chạy' titleRight='Xem tất cả' />
                        </View>
                        <FlatList
                            data={productList}
                            horizontal={true}
                            renderItem={renderProductItem}
                            keyExtractor={item => item.id.toString()}
                        />
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

export default ShopHome;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    headerContainer: {
        height: '25%',
    },
    navigateContainer: {
        height: '7%',
    },
    navigate: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textNavigateContainer: {
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderBottomColor: COLORS.gray_2,
        borderBottomWidth: 2,
    },
    selectedItem: {
        borderBottomColor: COLORS.yellowMain,
    },
    scrollViewContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingVertical: 10,
    },
    avatar: {
    },
    descriptionContainner: {
        height: 150,
        backgroundColor: '#BBAC87',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 20,
        // borderBottomEndRadius: 15
    },
    descriptionTitle: {
        color: COLORS.white,
        paddingVertical: 5,
        paddingHorizontal: 40,
        // borderBottomEndRadius: 15
    },
    titleDescriptionContainner: {
        backgroundColor: '#1E2942',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15
    },
    descriptionText: {
        color: COLORS.black,
    },

    //product iteam
    productItem: {
        backgroundColor: COLORS.white,
        flexDirection: 'column',
        alignItems: 'flex-start',
        margin: 5,
        borderWidth: 0.5,
        borderColor: COLORS.gray_1,
        padding: 3,
    },
    detailProductContainner: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    productImage: {
        height: 150,
    }
});
