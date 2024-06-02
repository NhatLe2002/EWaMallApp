import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import {Image} from 'react-native';
import ReusableText from '../../reusables/Text/ReusableText';
import {COLORS, FONTS, SIZES} from '../../constant/theme';
import {Industry} from '../../constant/types';

interface CategoryFSProps {
  industryList: Industry[];
}

const renderItemCategory = ({item}: {item: Industry}) => (
  <View style={styles.content}>
    {/* Uncomment if you have imgUrl in Industry */}
    {/* <Image source={{ uri: item.imgUrl }} style={styles.image} /> */}
    <View style={styles.imgContainer}></View>
    <ReusableText
      numberOfLines={2}
      text={item.industryName}
      size={12}
      color={COLORS.black}
      font={FONTS.roboto_regular}
      align="center"
    />
  </View>
);

const CategoryFS: React.FC<CategoryFSProps> = ({industryList}) => {
  const sortedList = industryList.sort((a, b) => a.id - b.id);
  return (
    <View style={styles.container}>
      <FlatList
        scrollEnabled={true}
        showsHorizontalScrollIndicator={false}
        data={sortedList}
        renderItem={renderItemCategory}
        horizontal={true}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default CategoryFS;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: '6%',
    marginVertical: '5%',
    backgroundColor: 'red',
    flexDirection: 'row',
  },
  content: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 10,
  
    // gap: 5,
  },
  // image: {
  //   width: 45,
  //   height: 45,
  //   borderRadius: 10,
  // },
  imgContainer: {
    width: SIZES.width/5,
    height: SIZES.width/5,
    backgroundColor: 'blue',
    marginBottom: 5,
  },
});
