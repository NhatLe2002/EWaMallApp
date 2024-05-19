import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React, { LegacyRef, useEffect, useRef, useState } from 'react'
import { SIZES } from '../../constant/theme'
import { FlatList } from 'react-native-gesture-handler'
import { NativeScrollEvent } from 'react-native'
import { NativeSyntheticEvent } from 'react-native'

interface input{
  data : {
    id: number,
    imgUrl : string,
    title : string
  }[],
  width : number,
  height : number,
  scale: number,
}
const Carosell: React.FC<{inputData: input }> = ({inputData}) => {
  const flatListRef = useRef<FlatList>(null);
  
  const width = Dimensions.get('window').width;

  const HandleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) =>{
    const scrollPosition = event.nativeEvent.contentOffset.x;

    const index = scrollPosition / width;
    setActicveIndex(index);
  }
  const [activeIndex, setActicveIndex] = useState(0)
  useEffect(()=>{
    let interval = setInterval(()=>{
      if(Math.round(activeIndex) == data.length -1){
        flatListRef.current?.scrollToIndex({
          index: 0,
          animated: true
        })
      }
      else{
        flatListRef.current?.scrollToIndex({
          index: Math.round(activeIndex) + 1,
          animated: true
        })
      }
    }, 2000);
    return () => clearInterval(interval);
  })
  const getItemLayout = (data: ArrayLike<any> | null | undefined, index: number) =>({
    length: width ,
    offset: (width)*index,
    index : index,
  })
  const [data, setData] = useState(inputData.data);
  const styles = StyleSheet.create({
    image: {
      width: width/ inputData.width * inputData.scale,
      height: SIZES.height / inputData.height,
      borderRadius: 25,
    },
    container:{
      width: width/ inputData.width,
      height : SIZES.height / inputData.height,
      alignItems: "center"
    }
  });
  return (
    <>
      <View style={styles.container}>
            <FlatList
            data={data}
            ref={flatListRef}
            keyExtractor={(item)=> item.id.toString()}
            onScroll={HandleScroll}
            getItemLayout={getItemLayout}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <View style={styles.container}>
                <Image source={{ uri: item.imgUrl }} style={styles.image}/>
              </View>
            )}
            horizontal        
            /> 
            
        </View>
        </> 
        
  )
}

export default Carosell
