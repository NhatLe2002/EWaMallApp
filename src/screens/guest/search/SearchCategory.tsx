import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import React from 'react'

const SearchCategory: React.FC<{ data: { name: string }[] }> = (data) => {
    const page = Math.round(data.data.length / 2)
    function range(start: number, end: number) {
        var ans: number[] = [];
        for (let i = start; i <= end; i++) {
            ans.push(i);
        }
        return ans;
    }
    console.log(range(0, page - 1))
    return (
        <View>
            {
                range(0, page - 1).map((item, index) => (
                    <>
                        <View style={{ flexDirection: "row", alignContent:"center" }}>
                            {data.data.slice(item * 2, item * 2 +2).map((i, d) => (
                                <>
                                <TouchableHighlight 
                                onPress={()=>{}}
                                style={{width:"50%", alignSelf:"center", backgroundColor:"#dddddd", margin:2, padding:10, borderRadius:5}}>
                                    <Text style={{alignSelf:"center"}}>{i.name}</Text>
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