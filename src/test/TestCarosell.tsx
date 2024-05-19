import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { banner } from '../data/Banner'
import { SIZES } from '../constant/theme'
import { FlatList } from 'react-native-gesture-handler'
import Carousel from 'react-native-reanimated-carousel'
import { AutoScrollFlatList } from 'react-native-autoscroll-flatlist'
import  Ionicons  from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');
const TestCarosell: React.FC = () => {
  const renderItem = ({ item }: { item: { imgUrl: string } }) => (
    <View
      style={{
        flex: 1,
        borderWidth: 1,
        justifyContent: 'center',
      }}
    >
      <Image source={{ uri: item.imgUrl }} style={styles.image} />
    </View>
  );
  
  const width = Dimensions.get('window').width;

  

  return (
    <View style={{ flex: 1 }}>
            {/* <AutoScrollFlatList
            data={banner}
            threshold={20}
            renderItem={({item}) => (
              <View style={styles.container}>
                <Image source={{ uri: item.imgUrl }} style={styles.image}/>
              </View>
            )}
            horizontal
            
            />   */}
            <Icon name="rocket" size={30} color="#900" />
            <Ionicons name='hand-right' color={'coral'} size={22}/>
        </View>
  )
}

export default TestCarosell
const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: SIZES.height / 5,
    borderRadius: 25,
  },
  container:{
    width,
    height,
    alignItems: "center"
  }
});