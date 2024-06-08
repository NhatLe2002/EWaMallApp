import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CategoryCard from './CategoryCard';
import {SIZES} from '../../constant/theme';

interface Category {
  name: string;
  miniCates: CategoryMini[];
}

interface CategoryMini {
  id: number;
  name: string;
}

const CategoryGroup: React.FC<Category> = ({name, miniCates}: Category) => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          textAlign: 'center',
          textAlignVertical: 'center',
          fontSize: 18,
          height: SIZES.height / 24,
          backgroundColor: '#d2dd72bc',
          borderRadius: 4,
        }}>
        {name}
      </Text>
      <ScrollView
        horizontal
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>
        {miniCates.map((item, i) => (
          <View></View>
        ))}
      </ScrollView>
    </View>
  );
};

export default CategoryGroup;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    height: 'auto',
    marginLeft: 5,
  },
  cate: {
    width: SIZES.width / 6,
    backgroundColor: '#e0df9c6e',
    margin: 3,
  },
});
