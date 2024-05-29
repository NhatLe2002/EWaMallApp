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
          fontSize: 20,
          height: SIZES.height / 24,
          backgroundColor: '#d2dd72bc',
          borderRadius: 4,
        }}>
        {name}
      </Text>
      <ScrollView
        horizontal
        style={{
          maxWidth: '100%',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>
        {miniCates.map((item, i) => (
          <View style={styles.cate}>
            <CategoryCard
              fontsize={14}
              heightI={SIZES.height / 14}
              name={item.name}
              imgUrl=""
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default CategoryGroup;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    width: '97%',
    height: 'auto',
    marginLeft: 5,
  },
  cate: {
    width: '23%',
    height: 'auto',
    backgroundColor: '#e0df9c6e',
    margin: 3,
  },
});
