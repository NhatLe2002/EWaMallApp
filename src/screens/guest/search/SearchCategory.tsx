import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { InterfaceProductState } from '../../../constant/interface';
import { Product } from '../../../constant/types';
import { setProductFilterList } from '../../../redux/slice/productSlices';

const SearchCategory: React.FC<{ data: { name: string, active: boolean }[] }> = (data) => {
    const page = Math.round(data.data.length / 2)
    const {productFilterList} = useSelector(
        (state: InterfaceProductState) => state.productReducer,
    );
    const dispatch = useDispatch<any>();
    const [borderActive, setBorderActive] = useState("") 
    function range(start: number, end: number) {
        var ans: number[] = [];
        for (let i = start; i <= end; i++) {
            ans.push(i);
        }
        return ans;
    }
    const HandleFilterClick = (item : string ) =>{
        if(item == "Cao Đến Thấp"){
            var sortArray = JSON.parse(JSON.stringify(productFilterList));;
            sortArray.sort(function(a : Product, b : Product) {
                return b.minPrice - a.minPrice;
            });
            var chose = data.data.findIndex(s=> s.name == "Cao Đến Thấp");
            dispatch(setProductFilterList(sortArray))
            setBorderActive(data.data[chose].name)
        }
        if(item == "Thấp Đến Cao"){
            var sortArray = JSON.parse(JSON.stringify(productFilterList));;
            sortArray.sort(function(a : Product, b : Product) {
                return a.minPrice - b.minPrice;
            });
            var chose = data.data.findIndex(s=> s.name == "Thấp Đến Cao");
            dispatch(setProductFilterList(sortArray))
            setBorderActive(data.data[chose].name)
        }
    }
    return (
        <View>
            {
                range(0, page - 1).map((item, index) => (
                    <>
                        <View style={{ flexDirection: "row", alignContent:"center" }}>
                            {data.data.slice(item * 2, item * 2 +2).map((i, d) => (
                                <>
                                <TouchableHighlight 
                                underlayColor={"grey"}
                                onPress={()=>{HandleFilterClick(i.name)}}
                                style={{width:"50%", alignSelf:"center", backgroundColor:"#dddddd", margin:2, padding:10, borderRadius:5}}>
                                    <>
                                {
                                    i.name == borderActive? <Text style={{alignSelf:"center", color: "red"}}>{i.name}</Text>:<Text style={{alignSelf:"center"}}>{i.name}</Text>
                                }
                                    
                                    </>
                                </TouchableHighlight>
                                </>
                            ))}
                        </View>
                    </>
                ))
            }
        </View>
    )
}

export default SearchCategory

const styles = StyleSheet.create({})