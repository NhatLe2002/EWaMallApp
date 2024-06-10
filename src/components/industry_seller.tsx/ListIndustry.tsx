import { ListRenderItem, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { InterfaceIndustryState } from '../../constant/interface/industryInterface';
import { fetchAllIndustry, getAllSubIndustryById, getIndustryById } from '../../redux/slice/seller/industrySellerSlice';
import { Industry } from '../../constant/types/industryType';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { InterfaceProductState } from '../../constant/interface/productInterface';
import { setProductCreateField } from '../../redux/slice/form/formCreateProductBySellerSlice';
import { IFormProductCreateState } from '../../constant/interface/formCreateProductInterface';
import { COLORS } from '../../constant/theme';



// Định nghĩa kiểu dữ liệu cho một mục trong danh sách
interface IndustryItem {
    id: number;
    name: string;
    seletedId: number;
}


const ListIndustry = () => {
    const navigation = useNavigation();
    const [industry, setIndustry] = useState([
        { id: 1, name: 'Vui lòng chọn', seletedId: 1 },
    ]);
    const dispatch = useDispatch<any>();
    const [listIndustryResult, setListIndustryResult] = useState<Industry[]>([]);
    const { industryListAll, subIndustryById, loading } = useSelector(
        (state: InterfaceIndustryState) => state.industrySellerReducer,
    );
    const { productCreate, productCreateError } = useSelector(
        (state: IFormProductCreateState) => state.formCreateProductReducer,
    );
    useEffect(() => {
        if (!loading) {
            setListIndustryResult(subIndustryById || []);
        }
    }, [loading]);
    useEffect(() => {
        dispatch(fetchAllIndustry());
    }, [dispatch]);
    useEffect(() => {
        if (industryListAll && industryListAll.length > 0) {
            const filteredIndustries = industryListAll.filter((industry: Industry) => industry.level === 1);
            setListIndustryResult(filteredIndustries);
        }
    }, [industryListAll]);

    const [selectedId, setSelectedId] = useState(1);
    const handleSelectIndustry = async (selectedIndustry: Industry) => {
        const updatedIndustry = [...industry];
        if (selectedIndustry.isLeaf === true) {
            dispatch(setProductCreateField({ industryId: selectedIndustry.id.toString() }));
            dispatch(getIndustryById(selectedIndustry.id));
            // console.log(productCreate);
            navigation.goBack();
        }
        if (selectedId === industry.length) {
            await dispatch(getAllSubIndustryById(selectedIndustry.id));
            updatedIndustry[updatedIndustry.length - 1].name = selectedIndustry.industryName;
            updatedIndustry[updatedIndustry.length - 1].seletedId = selectedIndustry.id;
            updatedIndustry.push({ id: updatedIndustry.length + 1, name: 'Vui lòng chọn', seletedId: 1 });
            setIndustry(updatedIndustry);
            setSelectedId(industry.length + 1);
        } else {
            updatedIndustry[selectedId - 1].name = selectedIndustry.industryName;
            updatedIndustry[selectedId - 1].seletedId = selectedIndustry.id;
            await dispatch(getAllSubIndustryById(selectedIndustry.id));
            updatedIndustry.splice(selectedId);
            updatedIndustry.push({ id: selectedId + 1, name: 'Vui lòng chọn', seletedId: 1 });
            setIndustry(updatedIndustry);
            setSelectedId(updatedIndustry.length);
        }


    }
    const handleSelectTitle = async (selectTitle: IndustryItem) => {
        console.log(selectTitle)
        await dispatch(getAllSubIndustryById(selectTitle.seletedId));
    }
    const renderItem: ListRenderItem<IndustryItem> = ({ item }) => (
        <TouchableOpacity
            key={item.id}
            style={[
                styles.touchable,
                selectedId === item.id && styles.selectedTouchable
            ]}
            onPress={() => { setSelectedId(item.id); handleSelectTitle(item) }}
        >
            <Text style={[
                styles.text,
                selectedId === item.id && styles.selectedText
            ]}>
                {item.name}
            </Text>
            {selectedId === item.id && <View style={styles.underline} />}
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerList}>
                <FlatList
                    horizontal
                    data={industry}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={styles.scrollViewContent}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
            <ScrollView style={styles.scrollViewList}>
                {listIndustryResult.map((industry: Industry) => (
                    <TouchableOpacity
                        style={styles.touchableDetail}
                        key={industry.id}
                        onPress={() => { handleSelectIndustry(industry); }}
                    >
                        <Text style={{ color: COLORS.black }}>
                            {industry.industryName}
                        </Text>
                        {industry.isLeaf === false ? (<MaterialIcons name='navigate-next' size={20} />) : ('')}
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    )
}

export default ListIndustry

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,

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
        minWidth: 100,
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
        paddingBottom: 10,
        paddingTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#cececeb5'
    },
})
